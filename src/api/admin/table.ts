import express from 'express';
import TableController from '../../controllers/admin/table';

const TableRouter = express.Router();

TableRouter.post(
    '/create',
    TableController.create
);

TableRouter.get(
    '/all',
    TableController.getAll
);

export default TableRouter;