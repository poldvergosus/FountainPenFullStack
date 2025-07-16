import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
    try {
        const {
            title,
            desc,
            price,
            popular,
            category,
            brand,
            nibmaterial,
            size,
            colors,
            details
        } = req.body;

        const image = req.file;

        if (!image) {
            return res.status(400).json({
                success: false,
                message: 'Изображение не загружено'
            });
        }

        //загружаем в Cloudinary
        const result = await cloudinary.uploader.upload(image.path, {
            resource_type: 'image'
        });

        const imageUrl = result.secure_url;

        const productData = {
            title,
            desc,
            price: Number(price),
            popular: popular === "true",
            category,
            brand,
            nibmaterial: nibmaterial === "true",
            size,
            colors: colors ? JSON.parse(colors) : [],
            details,
            image: imageUrl
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({
            success: true,
            message: 'Продукт добавлен',
            imageUrl
        });

    } catch (error) {
        console.error('Ошибка добавления продукта:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// function for list product

const listProducts = async (req, res) => {
    try {

        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.error('Ошибка добавления продукта:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// function for remove product

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Продукт удален"})
    } catch (error) {
 console.error('Ошибка добавления продукта:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// function for single product info

const singleProduct = async (req, res) => {

}

export { listProducts, addProduct, removeProduct, singleProduct }