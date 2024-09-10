import { TOrder } from './order.interface';
import { Order } from './order.model';

const addOrderIntoDb = async (orderData: TOrder) => {
  const order = new Order(orderData);

  const result = await order.save();
  return result;
};

export const OrderService = {
  addOrderIntoDb,
};
