import express from 'express';
import { TableService } from '../../services/admin/table';
import generateQRCode from '../../utils/generateQR';
class TableController {
    static create = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { table_number } = request.body;
        const qrcode = (await generateQRCode(table_number)) as string;
        const result = await TableService.create(Number(table_number), qrcode);
        return response.status(201).json({
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

    static getTableByNumber = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { table_number } = request.params;
        const result = await TableService.getTableByNumber(
            Number(table_number)
        );

        // console.log(result);

        return response.send(result);
    };

    static updateOtp = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { otp, table_number } = request.body;
        const result = await TableService.updateOtp(otp, table_number);
        return response.status(200).json({
            status: true,
            content: {
                data: result,
            },
        });
    };

    static resetTable = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { table_number } = request.params;

        const result = await TableService.resetTable(Number(table_number));
        // console.log(result);

        return response.status(204).json({
            message: 'Table reset successfull',
            status: true,
        });
    };
}

export default TableController;
