import express from 'express';
import { ProductController } from '../../controllers/product/product';
// import verifyAdmin from '../../middlewares/verifyAdmin';
const ProductRouter = express.Router();

ProductRouter.post(
    '/',
    ProductController.create
);

ProductRouter.get(
    '/:id',
    ProductController.getProduct
);

ProductRouter.put(
    '/',
    ProductController.update
)

export default ProductRouter;
