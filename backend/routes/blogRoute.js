import express from 'express';
import { addBlog, listBlogs, getBlog, removeBlog, updateBlog } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const blogRouter = express.Router();

blogRouter.post('/add', adminAuth, upload.single('image1'), addBlog);
blogRouter.get('/list', listBlogs);
blogRouter.post('/single', getBlog);
blogRouter.post('/remove', adminAuth, removeBlog);
blogRouter.post('/update', adminAuth, upload.single('image1'), updateBlog);

export default blogRouter;