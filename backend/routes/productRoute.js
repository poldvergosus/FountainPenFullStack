import express from 'express';
import { addProduct, listProducts, removeProduct, updateProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import { updateStock, lowStockProducts } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.single('image1'), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);
productRouter.post('/update', adminAuth, upload.single('image1'), updateProduct); 
productRouter.post('/update-stock', adminAuth, updateStock);     
productRouter.get('/low-stock', adminAuth, lowStockProducts); 

export default productRouter;