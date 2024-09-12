import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { ordertValidations } from './order.zod.validatin';
import { OrderController } from './order.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ordertValidations.createOrderValidationSchema),
  OrderController.addOrder
);
router.get('/', OrderController.getAllOrder);
// router.get('/:email', OrderController.getOrderByEmail);

export const OrderRoutes = router;
