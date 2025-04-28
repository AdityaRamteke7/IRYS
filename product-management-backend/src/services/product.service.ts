import { Product } from '../models/product.model';
import { IProduct } from '../models/product.model';

export const getProducts = async (filters: any) => {
    const {
        page = 1,
        limit = 20,
        minPrice,
        maxPrice,
        minStock,
        maxStock,
        lowStock,
        outOfStock,
        categories
    } = filters;

    const query: any = { isEnabled: true };

    if (minPrice) query.price = { $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (minStock) query.stock = { $gte: Number(minStock) };
    if (maxStock) query.stock = { ...query.stock, $lte: Number(maxStock) };
    if (lowStock === 'true') query.stock = { $lt: 10 };
    if (outOfStock === 'true') query.stock = 0;
    if (categories) {
        const categoriesArray = (categories as string).split(',');
        query.category = { $in: categoriesArray };
    }

    const products = await Product.find(query)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

    const total = await Product.countDocuments(query);

    return {
        products,
        totalPages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
    };
};

export const updateProduct = async (id: string, productData: Partial<IProduct>) => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
};

export const toggleProductVisibility = async (id: string) => {
    const product = await Product.findById(id);
    if (!product) return null;

    product.isVisible = !product.isVisible;
    await product.save();
    return product;
};

export const disableAllProducts = async () => {
    return await Product.updateMany({}, { isEnabled: false });
};

export const createProducts = async (products: Partial<IProduct>[]) => {
    return await Product.insertMany(products);
};