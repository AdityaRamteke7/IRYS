import { Router } from 'express';
import { getAllProducts, updateProductById, toggleVisibility } from '../controllers/productcontroller';
import { upload, uploadProducts } from '../controllers/uploadcontroller';

const router = Router();

// Product routes
router.get('/', getAllProducts);
router.put('/:id', updateProductById);
router.put('/:id/toggle-visibility', toggleVisibility);

// Upload route
router.post('/upload', upload.single('file'), uploadProducts);

export default router;