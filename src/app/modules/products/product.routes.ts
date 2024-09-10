import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middlwares/validateRequest';
import { productValidations } from './product.zod.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(productValidations.createProductValidationSchema),
  ProductController.addProduct
);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getSingleProduct);
router.put(
  '/:productId',
  validateRequest(productValidations.createProductValidationSchema),
  ProductController.updateProduct
);
router.delete('/:productId', ProductController.deleteProduct);

export const ProductRoutes = router;
