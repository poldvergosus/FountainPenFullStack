import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing orders using COD method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, address, amount } = req.body;

        if (!items || items.length === 0) {
            return res.json({ success: false, message: "Корзина пуста" });
        }

        if (!address || !address.name || !address.email || !address.phone) {
            return res.json({ success: false, message: "Заполните все обязательные поля" });
        }

        const subtotal = items.reduce((sum, it) => {
            const qty = Number(it.quantity || 0);
            const price = Number(it.price || 0);
            return sum + (price * qty);
        }, 0);

        const finalAmount = amount || subtotal;

        const orderData = {
            userId: userId || null,
            items,
            address,
            amount: finalAmount,
            paymentMethod: "COD",
            payment: false,
            date: new Date()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        if (userId) {
            try {
                await userModel.findByIdAndUpdate(userId, { cartData: {} });
            } catch (error) {
                console.log('Error clearing cart:', error);
            }
        }

        res.json({ 
            success: true, 
            message: "Заказ успешно оформлен",
            orderId: newOrder._id,
            isGuest: !userId 
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
            .sort({ date: -1 }); 
        
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//User Order Data for Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.json({ success: false, message: "Необходима авторизация" });
        }
        
        const orders = await orderModel.find({ userId })
            .sort({ date: -1 });
        
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// update order status from Admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        if (!orderId || !status) {
            return res.json({ success: false, message: "Не указан ID заказа или статус" });
        }
        
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Статус обновлен' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, allOrders, userOrders, updateStatus };