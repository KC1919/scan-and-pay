import express from 'express';
import { ProductController } from '../../controllers/product/product';
// import verifyAdmin from '../../middlewares/verifyAdmin';
const ProductRouter = express.Router();

// admin
ProductRouter.post(
    '/',
    ProductController.create
);

// admin
ProductRouter.put(
    '/',
    ProductController.update
)

ProductRouter.get(
    '/all',
    ProductController.getAll
);

ProductRouter.get(
    '/category/:id',
    ProductController.getProduct
);

ProductRouter.get(
    '/category',
    ProductController.getAllCategories
);

ProductRouter.post(
    '/category',
    ProductController.createCategory
);

ProductRouter.get(
    '/:id/single',
    ProductController.getProduct
);
// admin
ProductRouter.put(
    '/:id/category',
    ProductController.putCategory
);

export default ProductRouter;
