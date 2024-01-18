import express from 'express';
import TableController from '../../controllers/admin/table';
import verifyAdmin from '../../middlewares/verifyAdmin';

const UserTableRouter = express.Router();

UserTableRouter.post('/create', verifyAdmin, TableController.create)
    .get('/all', verifyAdmin, TableController.getAll)
    .get('/:table_number', verifyAdmin, TableController.getTableByNumber)
    .put('/reset/:table_number', verifyAdmin, TableController.resetTable);

export default UserTableRouter;
