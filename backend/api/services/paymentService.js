import Flutterwave from 'flutterwave-node-v3';
import dotenv from 'dotenv';

dotenv.config();

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

class PaymentService {
    static async cardPayment(paymentData) {
        const { email, amount, currency, card_number, cvv, expiry_month, expiry_year } = paymentData;
        const payload = {
            email,
            amount,
            currency,
            card_number,
            cvv,
            expiry_month,
            expiry_year,
            enckey: process.env.FLW_ENCRYPTION_KEY,
            tx_ref: 'MC-' + Date.now(), // Unique transaction reference
        };
        try {
            const response = await flw.Charge.card(payload);
            return(response);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default PaymentService;