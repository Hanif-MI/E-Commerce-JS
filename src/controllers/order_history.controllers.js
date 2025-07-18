import {
  addOrderService,
  getOrderListByUserService,
  updateOrderStatusService,
} from "../services/order_history.service.js";

const addOrder = async (req, res, next) => {
  try {
    const createdOrder = await addOrderService(req.user.id,req.user.wallet_balance);
    res.send(createdOrder);
  } catch (error) {
    next(error);
  }
};

const getOrderList = async (req, res, next) => {
  try {
    const response = await getOrderListByUserService(req.user.id);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id, status } = req.body;
      const response = await updateOrderStatusService(id, status);
      res.send(response);
  } catch (error) {
    next(error);
  }
};

export { addOrder, getOrderList, updateOrderStatus };
