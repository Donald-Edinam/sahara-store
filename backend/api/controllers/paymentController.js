import PaymentService from "../services/paymentService.js";

class PaymentController {
    static async payWithCard(req, res) {
        try {
            const response = await PaymentService.cardPayment(req.body);
            if (response.status === 'success') {
                return res.status(200).json({
                    message: 'Payment successful',
                    response
                });
            }
            return res.status(400).json({
                message: 'Payment failed',
                response
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'An error occurred',
                error
            });
        }
    }

    static async webhook(req, res) {
        try {
            const { status, tx_ref, amount, currency, email } = req.body;

            // processing logic example
            if (status === 'successful') {
                console.log(`Payment successful for transaction reference: ${tx_ref}`);
                // perform actions based on the successful payment
                // For example: await PaymentService.updatePaymentStatus(tx_ref, 'successful');
            } else {
                console.log(`Payment status: ${status} for transaction reference: ${tx_ref}`);
                // Handle other statuses (e.g., failed, pending)
                // For example: await PaymentService.updatePaymentStatus(tx_ref, 'failed');
            }

            res.status(200).send('Webhook received');
        } catch (error) {
            console.error('Error handling webhook:', error);
            res.status(500).send('Error handling webhook');
        }
    }
}

export default PaymentController;