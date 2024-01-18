import express from 'express';
import { OrderController } from '../../controllers/order/order';
const OrderRouter = express.Router();

OrderRouter.post(
    '/add',
    OrderController.add
);

OrderRouter.get(
    '/all',
    OrderController.getAll
);

export default OrderRouter;
