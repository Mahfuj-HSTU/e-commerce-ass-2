import { model, Schema } from 'mongoose';
import { TOrder, OrderModel } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: { type: 'string', required: true },
  productId: { type: 'string', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
