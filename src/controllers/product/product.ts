import express from 'express';
import { ProductService } from "../../services/product/product";
import { IProductPrisma } from "../../types/product/productTypes";

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

    static get = async (
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

    static update = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { id, data } = request.body;
        const result = await ProductService.update(id, data);
        return response.status(200).json({
            status: true,
            content: {
                data: result
            }
        });
    }
}