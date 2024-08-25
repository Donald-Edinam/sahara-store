import orderService from "../services/orderService.js";
import PaymentService from "../services/paymentService.js";

class PaymentController {
    static async payWithCard(req, res) {
        try {
            const { paymentDetails, orderDetails } = req.body;
            if (!paymentDetails) {
                return res.status(400).json({
                    message: 'Payment details are required'
                });
            }

            if (!orderDetails) {
                return res.status(400).json({
                    message: 'Order details are required'
                });
            }

            const {status, response } = await PaymentService.processPayment(req.user.userId, paymentDetails, orderDetails, PaymentService.cardPayment);
            
            if (status !== 201) {
                return res.status(status).json({
                    message: 'Payment failed',
                    response
                });
            }

            if (response.status === 'success') {
                return res.status(201).json({
                    message: 'Payment successful',
                    response
                });
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'An error occurred',
                error
            });
        }
    }

    static async webHook(req, res) {
        try {
            const { status, tx_ref, amount, currency, email } = req.body;

            // processing logic example
            if (status === 'successful') {
                orderService.updateOrder(tx_ref, { paymentStatus: 'Completed' });
                // send personalized email to customer
            } else {
                orderService.updateOrder(tx_ref, { paymentStatus: 'Failed' });
                // send personalized email to customer
            }

            res.status(200).send('Webhook received');
        } catch (error) {
            console.error('Error handling webhook:', error);
            res.status(500).send('Error handling webhook');
        }
    }
}

export default PaymentController;