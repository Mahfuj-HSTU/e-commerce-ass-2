import { Router } from 'express';
import { ProductRoutes } from '../modules/products/product.routes';
import { OrderRoutes } from '../modules/orders/order.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/api/products',
    route: ProductRoutes,
  },
  {
    path: '/api/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
