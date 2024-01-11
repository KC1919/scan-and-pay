import express from 'express';
import { TableService } from '../../services/admin/table';
class TableController {
    static create = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { table_number } = request.body;
        const result = await TableService.create(table_number);
        return response.json({
            status: true,
            content: {
                data: result,
            },
        });
    };

    static getAll = async (
        request: express.Request,
        response: express.Response
    ) => {
        const result = await TableService.getAll();
        return response.json({
            status: true,
            content: {
                data: result,
            },
        });
    };

    static updateOtp = async (
        request: express.Request,
        response: express.Response
    ) => {
        const {otp, table_number} = request.body;
        const result = await TableService.updateOtp(otp, table_number);
        return response.status(200).json({
            status: true,
            content: {
                data: result,
            },
        });
    };
}

export default TableController;
