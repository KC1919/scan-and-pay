import express from 'express';
import { ProductController } from '../../controllers/product/product';
// import verifyAdmin from '../../middlewares/verifyAdmin';
const ProductRouter = express.Router();

// admin
ProductRouter.post(
    '/',
    ProductController.create
);

// to get products with pagination, filtering, and sorting
ProductRouter.get(
    '/',
    ProductController.getProductsQuery
);

// admin
ProductRouter.put(
    '/',
    ProductController.update
)

// for admin to get all
ProductRouter.get(
    '/all',
    ProductController.getAll
);

ProductRouter.get(
    '/category/all',
    ProductController.getAllCategories
);

ProductRouter.get(
    '/category/:id',
    ProductController.getProduct
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
