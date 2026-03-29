import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true }, 
    content: { type: String, required: true }, 
    image: { type: String, required: true },
    author: { type: String, default: "Администратор" },
    date: { type: Date, default: Date.now },
    slug: { type: String, required: true, unique: true }, 
    published: { type: Boolean, default: true }
});

const blogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default blogModel;