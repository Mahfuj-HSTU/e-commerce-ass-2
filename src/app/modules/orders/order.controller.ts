import { NextFunction, Request, Response } from 'express';
import { OrderService } from './order.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProductServices } from '../products/product.service';
import { UpdateQuery } from 'mongoose';
import { TProduct } from '../products/product.interface';

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

      const updateData: UpdateQuery<Partial<TProduct>> = {
        $set: {
          'inventory.quantity': newQuantity,
          'inventory.inStock': inStockStatus,
        },
      };

      await ProductServices.updateProductIntoDb(productId, updateData);
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

const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.query;
    if (email) {
      const userOrder = await OrderService.getOrderByEmailFromDb(
        email as string
      );

      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: userOrder,
      });
    }
    const result = await OrderService.getAllOrderFromDb();

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    sendResponse(res, {
      success: true,
      message: 'Orders fetched successfully!',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const OrderController = {
  addOrder,
  getAllOrder,
};
