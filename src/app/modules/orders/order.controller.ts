import { NextFunction, Request, Response } from 'express';
import { OrderService } from './order.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProductServices } from '../products/product.service';

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const productId = order.productId;

    //* Fetch product details from the database
    const product = await ProductServices.getSingleProductsFromDb(productId);

    if (product) {
      if (order.quantity > product.inventory.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      }

      const newQuantity = product.inventory.quantity - order.quantity;
      // console.log(newQuantity);
      const inStockStatus = newQuantity > 0;
      // const updatedOrderedProduct = {
      //   ...product,
      //   inventory: {
      //     quantity: newQuantity,
      //     inStock: inStockStatus,
      //   },
      // };
      // console.log('updated product =>', updatedOrderedProduct);

      await ProductServices.updateProductIntoDb(productId, {
        $set: {
          'inventory.quantity': newQuantity,
          'inventory.inStock': inStockStatus,
        },
      });

      const result = await OrderService.addOrderIntoDb(order);

      sendResponse(res, {
        success: true,
        message: 'Order created successfully',
        statusCode: httpStatus.OK,
        data: result,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const OrderController = {
  addOrder,
};
