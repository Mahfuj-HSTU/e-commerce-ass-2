import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProductServices } from './product.service';

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body;
    // console.log(product);
    const result = await ProductServices.addProductIntotDb(product);

    sendResponse(res, {
      success: true,
      message: 'Product created successfully',
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
