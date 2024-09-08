import express, { NextFunction, Request, Response } from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middlwares/validateRequest';

const router = express.Router();

// will call controller function
// router.post(
//   '/create-student',
//   validateRequest(studentValidations.createStudentValidationSchema),
//   UserController.createStudent
// );
router.post('/', ProductController.addProduct);

export const ProductRoutes = router;
