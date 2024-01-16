import express from 'express';
import TableController from '../../controllers/admin/table';
import verifyUser from '../../middlewares/verifyUser';

const TableRouter = express.Router();

TableRouter.post('/create', verifyUser, TableController.create)
    .get('/all', verifyUser, TableController.getAll)
    .get(
        '/:table_number',
        verifyUser,
        TableController.getTableByNumber
    );

export default TableRouter;
