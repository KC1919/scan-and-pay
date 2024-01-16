import express from 'express';
import { OrderService } from '../../services/order/order';
import { IOrderCreatePrisma } from '../../types/order/orderType';
import { IRequestQuery } from '../../types/fe/query';

export class OrderController {
    static create = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { tableNumber } = request.body as IOrderCreatePrisma;

        const result = await OrderService.create(
            tableNumber
        );
        return response.status(200).json({
            status: true,
            content: {
                data: result
            }
        });
    }

    static add = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { productId, table_number, item_list } = request.body;

        const result = await OrderService.addItems(
            productId,
            table_number,
            item_list
        );
        return response.status(200).json({
            status: true,
            content: {
                data: result
            }

        });
    }

    // to get all completed orders
    static getAll = async (
        request: express.Request<IRequestQuery>,
        response: express.Response
    ) => {
        const { filter, page, limit, orderBy, search, startDate, endDate }: IRequestQuery = request.query as unknown as IRequestQuery;

        const result = await OrderService.getAll(
            filter,
            page,
            limit,
            orderBy,
            search,
            startDate,
            endDate
        );
        return response.status(200).json({
            status: true,
            content: {
                data: result
            }
        });
    }
}