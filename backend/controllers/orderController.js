import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// placing orders using COD method
const placeOrder = async (req, res) => {
    
    try {
        const { userId, items, address, amount } = req.body;

        if (!items || items.length === 0) {
            console.log('Корзина пуста');
            return res.json({ success: false, message: "Корзина пуста" });
        }

        if (!address || !address.name || !address.email || !address.phone) {
            console.log('Не заполнены обязательные поля');
            return res.json({ success: false, message: "Заполните все обязательные поля" });
        }

        const stockErrors = [];
        
        for (const item of items) {
            const product = await productModel.findById(item._id);
            
            if (!product) {
                stockErrors.push(`Товар "${item.title}" не найден`);
                continue;
            }

            if (product.stock < item.quantity) {
                if (product.stock === 0) {
                    stockErrors.push(`"${item.title}" — нет в наличии`);
                } else {
                    stockErrors.push(`"${item.title}" — доступно только ${product.stock} шт.`);
                }
            }
        }

        if (stockErrors.length > 0) {
            return res.json({ 
                success: false, 
                message: stockErrors.join('; '),
                stockErrors 
            });
        }

        for (const item of items) {
            await productModel.findByIdAndUpdate(item._id, {
                $inc: { stock: -item.quantity }
            });
        }

        const subtotal = items.reduce((sum, it) => {
            const qty = Number(it.quantity || 0);
            const price = Number(it.price || 0);
            
            if (isNaN(qty) || isNaN(price)) {
                console.warn('Invalid item:', it);
                return sum;
            }
            
            return sum + (price * qty);
        }, 0);

        let finalAmount = Number(amount);
        if (isNaN(finalAmount) || finalAmount <= 0) {
            finalAmount = subtotal;
        }

        if (finalAmount <= 0) {
            for (const item of items) {
                await productModel.findByIdAndUpdate(item._id, {
                    $inc: { stock: item.quantity }
                });
            }
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
        await newOrder.save();

        console.log('Заказ сохранен:', newOrder._id);

        if (userId) {
            try {
                await userModel.findByIdAndUpdate(userId, { cartData: {} });
            } catch (error) {
                console.log('Ошибка очистки корзины:', error);
            }
        }

        res.json({ 
            success: true, 
            message: "Заказ успешно оформлен",
            orderId: newOrder._id,
            isGuest: !userId
        });

    } catch (error) {
        console.error('ОШИБКА ПРИ СОЗДАНИИ ЗАКАЗА:', error);
        res.json({ success: false, message: error.message });
    }
}

// Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 }); 
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// User Order Data for Frontend
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

// Update order status from Admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        if (!orderId || !status) {
            return res.json({ success: false, message: "Не указан ID заказа или статус" });
        }
        
        if (status === "Отменён") {
            const order = await orderModel.findById(orderId);
            if (order && order.status !== "Отменён") {
                for (const item of order.items) {
                    await productModel.findByIdAndUpdate(item._id, {
                        $inc: { stock: item.quantity }
                    });
                }
                console.log('Товары возвращены на склад для заказа:', orderId);
            }
        }
        
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Статус обновлен' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.json({ success: false, message: "Заказ не найден" });
        }

        if (order.status === "Отменён") {
            return res.json({ success: false, message: "Заказ уже отменён" });
        }

        for (const item of order.items) {
            await productModel.findByIdAndUpdate(item._id, {
                $inc: { stock: item.quantity }
            });
        }

        order.status = "Отменён";
        await order.save();

        res.json({ success: true, message: "Заказ отменён, товары возвращены на склад" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, allOrders, userOrders, updateStatus, cancelOrder };