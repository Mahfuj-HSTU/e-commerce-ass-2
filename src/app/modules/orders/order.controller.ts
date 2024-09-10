import { NextFunction, Request, Response } from 'express';
import { OrderService } from './order.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const result = await OrderService.addOrderIntotDb(order);

    sendResponse(res, {
      success: true,
      message: 'Order created successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const OrderController = {
  addOrder,
};
