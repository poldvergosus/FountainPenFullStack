import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing orders using COD method
const placeOrder = async (req, res) => {
    console.log('ПОЛУЧЕН ЗАПРОС НА СОЗДАНИЕ ЗАКАЗА');
    console.log('Request body:', req.body);
    
    try {
        const { userId, items, address, amount } = req.body;

        if (!items || items.length === 0) {
            console.log(' Корзина пуста');
            return res.json({ success: false, message: "Корзина пуста" });
        }

        if (!address || !address.name || !address.email || !address.phone) {
            console.log(' Не заполнены обязательные поля');
            return res.json({ success: false, message: "Заполните все обязательные поля" });
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

        console.log('Subtotal:', subtotal);
        console.log('Final amount:', finalAmount);

        if (finalAmount <= 0) {
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

        console.log('Order data to save:', orderData);

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        console.log('Заказ сохранен:', newOrder._id);

        if (userId) {
            try {
                await userModel.findByIdAndUpdate(userId, { cartData: {} });
                console.log('Корзина очищена');
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