import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
    stock: number;
    category: string;
    isVisible: boolean;
    isEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    isEnabled: { type: Boolean, default: true },
}, { timestamps: true });

export const Product = model<IProduct>('Product', productSchema);