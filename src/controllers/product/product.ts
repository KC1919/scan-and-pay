import express from 'express';
import { ProductService } from "../../services/product/product";
import { IProductPrisma } from "../../types/product/productTypes";
import { IRequestQuery } from '../../types/fe/query';

export class ProductController {
    static create = async (
        request: express.Request,
        response: express.Response
    ) => {
        const data = request.body as IProductPrisma;

        const result = await ProductService.create(data);
        return response.status(200).json({
            status: true,
            content: {
                data: result
            }
        });
    }

    static getProduct = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { id } = request.params;
        const result = await ProductService.getProductById(id as string);
        return response.status(200).json({
            status: true,
            content: {
                data: result
            }
        });
    }

    static getAllProducts = async (
        request: express.Request,
        response: express.Response
    ) => {
        const {
            filter,
            filterColumn,
            page,
            limit,
            orderBy,
            search,
            startDate,
            endDate
        }: IRequestQuery = request.query as unknown as IRequestQuery;

        const result = await ProductService.getAll(
            filter,
            filterColumn,
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

    // FE: atleast send one field
    static update = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { id, name,
            costPrice,
            sellingPrice,
            categoryId,
            quantity } = request.body;

        const data = {
            name,
            costPrice,
            sellingPrice,
            categoryId,
            quantity
        };
        // add validation here
        const result = await ProductService.update(id, data);
        return response.status(200).json({
            status: true,
            content: {
                data: result
            }
        });
    }
}