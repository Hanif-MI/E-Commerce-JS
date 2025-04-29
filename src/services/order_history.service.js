import Models from "../models/index.js";
import { ApiError } from "../utility/api_error.js";
import { RESPONSE_CODE } from "../utility/constant.js";

/**
 * This function is validate the id.
 */
const validateId = (id) => {
  if (!id || isNaN(id)) {
    throw new ApiError(400, "Invalid user ID");
  }
  return true;
};

/**
 * Step to add Order in Database.
 * 1. check cart table for selected product.
 * 2. validate all filed and convert that to orderModel.
 * 3. insert into database.
 * 4. send response
 * 5. Handle error.
 * 6, Test endpoint.
 */
const addOrderService = async (user_id, wallet_balance) => {
  validateId(user_id);
  const cartModel = Models.Cart;
  const orderItemsModel = Models.order_items;
  const orderHistoryModel = Models.order_history;
  const userModel = Models.User;
  const transaction = await Models.sequelize.transaction();

  const cart = await cartModel.findAll({
    where: { user_id },
    include: [{ model: Models.Product, as: "product" }],
  });

  if (!cart || cart.length === 0) {
    throw new ApiError(404, "Empty Cart!");
  }

  try {
    const orderHistory = await orderHistoryModel.create(
      { user_id },
      { transaction }
    );

    let totalAmount = 0;
    const orderItems = cart.map((item) => {
      totalAmount += Number(item.product.price);
      return {
        order_id: orderHistory.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_price: item.product.price,
      };
    });
    
    if (totalAmount > wallet_balance) {
      throw new ApiError(
        RESPONSE_CODE.FORBIDDEN,
        `you don't have enough balance!. your balance is ${wallet_balance} and your cart total is ${totalAmount}`
      );
    }

    await userModel.update(
      { wallet_balance: wallet_balance - totalAmount },
      {
        where: {
          id: user_id,
        },
        transaction,
      }
    );  

    await orderItemsModel.bulkCreate(orderItems, { transaction });
    await cartModel.destroy({ where: { user_id }, transaction });

    const order = await orderHistoryModel.findOne({
      where: { id: orderHistory.id },
      attributes: ["id", "user_id", "status", "created_at"],
      include: [
        {
          model: orderItemsModel,
          as: "order",
          attributes: ["product_id", "product_name", "product_price"],
        },
      ],
      transaction,
    });

    await transaction.commit();

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return order;
  } catch (error) {
    await transaction.rollback();
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Failed to create order : " + error.message);
  }
};

/**
 * Steps to get order list of user.
 * 1. Validate the request params.
 * 2. Check the order's in the database.
 * 3. return response.
 * 4. handle errors.
 * 5. Test endpoint.
 */
const getOrderListByUserService = async (user_id) => {
  validateId(user_id);
  const orderHistoryModel = Models.order_history;
  try {
    const orderHistory = await orderHistoryModel.findAll({
      where: { user_id },
      attributes: ["id", "user_id", "status", "created_at"],
      include: [
        {
          model: Models.order_items,
          as: "order",
          attributes: ["product_id", "product_name", "product_price"],
        },
      ],
    });

    if (orderHistory.length === 0) {
      throw new ApiError(404, "Order history not found!");
    }

    return orderHistory;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Failed to get order's list : " + error.message);
  }
};

/**
 * Steps to get order by id.
 * 1. Validate the request params.
 * 2. Check the order in the database using ID.
 * 3. return response.
 * 4. handle errors.
 * 5. Test endpoint.
 */
const getOrderbyIdService = async (order_id) => {
  validateId(order_id);
  const orderHistoryModel = Models.order_history;
  try {
    const orderHistory = await orderHistoryModel.findOne({
      where: { order_id },
      attributes: ["id", "user_id", "status", "created_at"],
      include: [
        {
          model: Models.order_items,
          as: "order",
          attributes: ["product_id", "product_name", "product_price"],
        },
      ],
    });

    if (!orderHistory) {
      throw new ApiError(404, "Order history not found!");
    }

    return orderHistory;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Failed to get order : " + error.message);
  }
};

/**
 * Steps for update the status of cart product.
 * 1. validate the request body.
 * 2. Check for the product exists
 * 3. Update the status in database
 * 4. send response
 * 5. handle error
 * 6. test endpoint
 */
const updateOrderStatusService = async (id, status) => {
  try {
    const model = Models.order_history;

    const product = await model.findOne({ where: { id } });
    if (!product)
      throw new ApiError(
        RESPONSE_CODE.BAD_REQUEST,
        "Card product is not found!"
      );

    if (status === product.status) {
      throw new ApiError(
        RESPONSE_CODE.BAD_REQUEST,
        "Already have the updated status"
      );
    }
    await model.update({ status }, { where: { id } });
    return { message: "update status successful" };
  } catch (error) {
    throw new ApiError(
      RESPONSE_CODE.INTERNAL_SERVER,
      "Error while update the status : " + error
    );
  }
};

export {
  addOrderService,
  getOrderListByUserService,
  getOrderbyIdService,
  updateOrderStatusService,
};
