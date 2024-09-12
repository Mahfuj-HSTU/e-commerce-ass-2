import { TOrder } from './order.interface';
import { Order } from './order.model';

const addOrderIntoDb = async (orderData: TOrder) => {
  const order = new Order(orderData);

  const result = await order.save();
  return result;
};

const getAllOrderFromDb = async () => {
  const result = await Order.find();
  return result;
};

const getOrderByEmailFromDb = async (email: string) => {
  const result = await Order.find({ email: email });
  // console.log(result);
  return result;
};

export const OrderService = {
  addOrderIntoDb,
  getAllOrderFromDb,
  getOrderByEmailFromDb,
};
