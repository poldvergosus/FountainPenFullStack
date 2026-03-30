import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";

const placeOrder = async (req, res) => {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();

        const { userId, items, address, amount } = req.body;

        if (!items || items.length === 0) {
            await session.abortTransaction();
            session.endSession();
            return res.json({ success: false, message: "Корзина пуста" });
        }

        if (!address || !address.name || !address.email || !address.phone) {
            await session.abortTransaction();
            session.endSession();
            return res.json({ success: false, message: "Заполните все обязательные поля" });
        }

        const stockErrors = [];

        for (const item of items) {
            const result = await productModel.findOneAndUpdate(
                { 
                    _id: item._id, 
                    stock: { $gte: item.quantity }
                },
                { 
                    $inc: { stock: -item.quantity }
                },
                { 
                    new: true, 
                    session 
                }
            );

            if (!result) {
                const product = await productModel.findById(item._id).session(session);
                
                if (!product) {
                    stockErrors.push(`"${item.title}" — товар не найден`);
                } else if (product.stock === 0) {
                    stockErrors.push(`"${item.title}" — закончился`);
                } else {
                    stockErrors.push(`"${item.title}" — доступно только ${product.stock} шт.`);
                }
            }
        }

        if (stockErrors.length > 0) {
            await session.abortTransaction();
            session.endSession();
            return res.json({ 
                success: false, 
                message: "Некоторые товары недоступны",
                stockErrors 
            });
        }

        const subtotal = items.reduce((sum, it) => {
            const qty = Number(it.quantity || 0);
            const price = Number(it.price || 0);
            if (isNaN(qty) || isNaN(price)) return sum;
            return sum + (price * qty);
        }, 0);

        let finalAmount = Number(amount);
        if (isNaN(finalAmount) || finalAmount <= 0) {
            finalAmount = subtotal;
        }

        if (finalAmount <= 0) {
            await session.abortTransaction();
            session.endSession();
            return res.json({ success: false, message: "Неверная сумма заказа" });
        }

        const orderData = {
            userId: userId || null,
            items,
            address,
            amount: finalAmount,
            paymentMethod: "COD",
            payment: false,
            date: new Date(),
            comment: address.comment || ''
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save({ session });

        if (userId) {
            await userModel.findByIdAndUpdate(userId, { cartData: {} }, { session });
        }

        await session.commitTransaction();
        session.endSession();

        res.json({ 
            success: true, 
            message: "Заказ успешно оформлен",
            orderId: newOrder._id,
            isGuest: !userId
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('ОШИБКА:', error);
        res.json({ success: false, message: "Ошибка при оформлении заказа. Попробуйте снова." });
    }
}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.json({ success: false, message: "Необходима авторизация" });
        }
        const orders = await orderModel.find({ userId }).sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const updateStatus = async (req, res) => {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();

        const { orderId, status } = req.body;

        if (!orderId || !status) {
            await session.abortTransaction();
            session.endSession();
            return res.json({ success: false, message: "Не указан ID или статус" });
        }

        if (status === "Отменён") {
            const order = await orderModel.findById(orderId).session(session);
            if (order && order.status !== "Отменён") {
                for (const item of order.items) {
                    await productModel.findByIdAndUpdate(
                        item._id,
                        { $inc: { stock: item.quantity } },
                        { session }
                    );
                }
            }
        }

        await orderModel.findByIdAndUpdate(orderId, { status }, { session });

        await session.commitTransaction();
        session.endSession();

        res.json({ success: true, message: 'Статус обновлен' });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const cancelOrder = async (req, res) => {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();

        const { orderId } = req.body;
        const order = await orderModel.findById(orderId).session(session);

        if (!order) {
            await session.abortTransaction();
            session.endSession();
            return res.json({ success: false, message: "Заказ не найден" });
        }

        if (order.status === "Отменён") {
            await session.abortTransaction();
            session.endSession();
            return res.json({ success: false, message: "Заказ уже отменён" });
        }

        for (const item of order.items) {
            await productModel.findByIdAndUpdate(
                item._id,
                { $inc: { stock: item.quantity } },
                { session }
            );
        }

        order.status = "Отменён";
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.json({ success: true, message: "Заказ отменён, товары возвращены" });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, allOrders, userOrders, updateStatus, cancelOrder };