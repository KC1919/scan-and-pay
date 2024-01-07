import express from 'express';
import { TableService } from '../../services/admin/table';
class TableController {
    static create = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { table_number } = request.body;
        const result = TableService.create(table_number);
        return response.json({
            status: true,
            content: {
                data: result
            }
        });
    }

    static getAll = async (
        request: express.Request,
        response: express.Response
    ) => {
        const result = TableService.getAll();
        return response.json({
            status: true,
            content: {
                data: result
            }
        });
    }
}

export default TableController;