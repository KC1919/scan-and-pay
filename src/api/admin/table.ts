import express from 'express';
import TableController from '../../controllers/admin/table';
import verifyUser from '../../middlewares/verifyUser';

const TableRouter = express.Router();

TableRouter.post('/create', verifyUser, TableController.create);

TableRouter.get('/all', verifyUser, TableController.getAll);

TableRouter.patch('/update', verifyUser, TableController.updateOtp);

export default TableRouter;
