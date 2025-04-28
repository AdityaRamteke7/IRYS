import { Request, Response } from 'express';
import { getProducts, updateProduct, toggleProductVisibility } from '../services/product.service';

export const getAllProducts = async (req: any, res: any) => {
    try {
        const result = await getProducts(req.query);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProductById = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const updatedProduct = await updateProduct(id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const toggleVisibility = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const product = await toggleProductVisibility(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};