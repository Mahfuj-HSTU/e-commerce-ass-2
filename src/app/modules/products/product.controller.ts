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
      message: 'Product created successfully!',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      const result = await ProductServices.searchProductFromDb(
        searchTerm as string
      );
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } else {
      const result = await ProductServices.getAllProductsFromDb();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (err) {
    next(err);
  }
};

const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductsFromDb(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;
    const result = await ProductServices.updateProductIntoDb(
      productId,
      updatedProduct
    );
    res.status(200).json({
      success: true,
      message: 'Products updated successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    await ProductServices.deleteProductFromDb(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

// const searchProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // console.log(req.params);
//     // console.log(req);
//     const { searchTerm } = req.params;
//     const result = await ProductServices.searchProductFromDb(
//       searchTerm as string
//     );
//     res.status(200).json({
//       success: true,
//       message: `Products matching search term ${searchTerm} fetched successfully!`,
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const ProductController = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
