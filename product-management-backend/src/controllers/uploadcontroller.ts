import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { processCSV, formatCSVData } from '../utils/csvProcessor';
import { disableAllProducts, createProducts } from '../services/product.service';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOAD_DIR || 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

export const upload = multer({ storage });

export const uploadProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        // Disable all current products
        await disableAllProducts();

        // Process CSV file
        const results = await processCSV(req.file.path);
        const productsToInsert = formatCSVData(results);

        // Insert new products
        await createProducts(productsToInsert);

        res.json({ message: 'Products uploaded successfully' });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ message: 'Error processing file' });
    }
};