import express from 'express';
import { ProductService } from "../../services/product/product";
import { IProductPrisma } from "../../types/product/productTypes";
import { IRequestQuery } from '../../types/fe/query';
import { CategoryService } from '../../services/product/category';
// import { ICategoryCreatePrisma } from '../../types/product/categoryTypes';

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

    static createCategory = async (
        request: express.Request,
        response: express.Response
    ) => {
        const data = request.body;
        const result = await CategoryService.create(data);
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

    static getProductByCategory = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { id } = request.params;
        const result = await CategoryService.getProductsByCategoryIdOrName(id as string);
        return response.status(200).json({
            status: true,
            content: {
                data: result
            }
        });
    }

    static getAllCategories = async (
        request: express.Request,
        response: express.Response
    ) => {
        const result = await CategoryService.getAll();
        return response.status(200).json({
            status: true,
            content: {
                data: result
            }
        });
    };

    static getAll = async (
        request: express.Request,
        response: express.Response
    ) => {
        // const {
        //     page,
        //     limit
        // } = request.query as unknown as IRequestQuery;

        const result = await ProductService.getAll();

        return response.status(200).json({
            status: true,
            content: {
                data: result
            }
        });
    };

    static getProductsQuery = async (
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

        const result = await ProductService.getProductsQuery(
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

    // FE: send category_id
    static putCategory = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { id } = request.params;
        const { category_id } = request.body;

        if (id === undefined || category_id === undefined) {
            return response.status(400).json({
                status: true,
                message: 'Provide required values'
            });
        }

        // add validation here
        const result = await ProductService.updateCategory(id, category_id);
        return response.status(200).json({
            status: true,
            content: {
                data: result
            }
        });
    }
}