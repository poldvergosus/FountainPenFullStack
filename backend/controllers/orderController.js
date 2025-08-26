import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing orders using COD method
const placeOrder = async (req, res) => {

    try {
        const { userId, items, address } = req.body;

        const subtotal = items.reduce((sum, it) => {
            const qty = Number(it.quantity || 0);
            const price = Number(it.price || 0);
            return sum + (price * qty);
        }, 0);
        //const deliveryFee = Number(process.env.DELIVERY_FEE || 0);
        const amount = subtotal;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Заказ сформирован" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Orders data for Admin Panel
const allOrders = async (req, res) => {

}

//User Order Data for Frontend
const userOrders = async (req, res) => {

}

// update order status from Admin panel
const updateStatus = async (req, res) => {

}

export { placeOrder, allOrders, userOrders, updateStatus }