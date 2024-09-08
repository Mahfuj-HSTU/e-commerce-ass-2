import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProductServices } from './product.service';

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: productData } = req.body;

    const result = await ProductServices.addProductIntotDb(
      password,
      productData
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const ProductController = {
  addProduct,
};
