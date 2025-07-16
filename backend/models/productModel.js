import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    popular: { type: Boolean, default: false },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    nibmaterial: { type: Boolean, required: true },
    size: { type: String, required: true },
    colors: [
        {
            name: { type: String, required: true },
            hex: { type: String, required: true },
            isTransparent: { type: Boolean, default: false }
        }
    ],
    details: { type: String }
});

const productModel =mongoose.models.product ||  mongoose.model("product",productSchema);

export default productModel