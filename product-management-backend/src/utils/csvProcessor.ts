import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { Product } from '../models/product.model';

export const processCSV = (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                fs.unlinkSync(filePath); // Remove temp file
                resolve(results);
            })
            .on('error', (err) => reject(err));
    });
};

export const formatCSVData = (data: any[]) => {
    return data.map(item => ({
        name: item.name,
        price: parseFloat(item.price),
        stock: parseInt(item.stock),
        category: item.category,
        isEnabled: true,
        isVisible: true
    }));
};