import blogModel from "../models/blogModel.js";
import { v2 as cloudinary } from "cloudinary";

// Добавить статью
const addBlog = async (req, res) => {
    try {
        const { title, excerpt, content, author, slug } = req.body;

        const image1 = req.file;

        if (!image1) {
            return res.json({ success: false, message: "Изображение обязательно" });
        }

        // Проверка уникальности slug
        const existingBlog = await blogModel.findOne({ slug });
        if (existingBlog) {
            return res.json({ success: false, message: "Такой URL уже существует" });
        }

        const imageUpload = await cloudinary.uploader.upload(image1.path, {
            resource_type: 'image'
        });

        const blogData = {
            title,
            excerpt,
            content,
            author: author || "Администратор",
            slug,
            image: imageUpload.secure_url,
            date: Date.now()
        };

        const blog = new blogModel(blogData);
        await blog.save();

        res.json({ success: true, message: "Статья добавлена" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Получить список всех статей
const listBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).sort({ date: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Получить одну статью по slug
const getBlog = async (req, res) => {
    try {
        const { slug } = req.body;
        const blog = await blogModel.findOne({ slug });

        if (!blog) {
            return res.json({ success: false, message: "Статья не найдена" });
        }

        res.json({ success: true, blog });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Удалить статью
const removeBlog = async (req, res) => {
    try {
        await blogModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Статья удалена" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Обновить статью
const updateBlog = async (req, res) => {
    try {
        const { id, title, excerpt, content, author, slug } = req.body;

        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.json({ success: false, message: "Статья не найдена" });
        }

        blog.title = title;
        blog.excerpt = excerpt;
        blog.content = content;
        blog.author = author || "Администратор";
        blog.slug = slug;

        if (req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image'
            });
            blog.image = imageUpload.secure_url;
        }

        await blog.save();

        res.json({ success: true, message: "Статья обновлена" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addBlog, listBlogs, getBlog, removeBlog, updateBlog };