import Flutterwave from 'flutterwave-node-v3';
import dotenv from 'dotenv';
import orderService from './orderService.js';

dotenv.config();

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

class PaymentService {
    static async processPayment(userId, orderData, paymentData, paymentProcessor) {
        // create order
        let response;
        try{
            console.log('order', orderData);
            const result = await orderService.createOrder(userId, orderData);
            const status = result.status;
            response = result.response;
            if (status !== 201) {
                return { status, response };
            }
        } catch (error) {
            console.log(error);
            throw new Error(`Error creating order: ${error.message}`);
        }
        
        // process payment
        try {
            const paymentResult = await paymentProcessor(response, paymentData);
            return paymentResult;
        } catch (error) {
            console.log(error);
            throw new Error(`Error processing payment: ${error.message}`);
        }
    }

    static async cardPayment(order, paymentData) {
        console.log('Processing card payment');
        const { email, amount, currency, card_number, cvv, expiry_month, expiry_year } = paymentData;
        if (!email || !amount || !currency || !card_number || !cvv || !expiry_month || !expiry_year) {
            return { status: 400, response: 'All field must be provided' };
        }
        const payload = {
            email,
            amount,
            currency,
            card_number,
            cvv,
            expiry_month,
            expiry_year,
            enckey: process.env.FLW_ENCRYPTION_KEY,
            tx_ref: order._id, // Unique transaction reference
        };
        try {
            const response = await flw.Charge.card(payload);
            
            // Handle PIN authorization
            if (response.meta.authorization.mode === 'pin') {
                let payload2 = { ...payload, authorization: { mode: "pin", pin: 3310 }};
                const reCallCharge = await flw.Charge.card(payload2);
    
                // Add the OTP to authorize the transaction
                const callValidate = await flw.Charge.validate({
                    otp: "12345",
                    flw_ref: reCallCharge.data.flw_ref
                });
                console.log(callValidate);
                return { status: 201, response: callValidate };
            }
            
            // Handle Redirect authorization
            if (response.meta.authorization.mode === 'redirect') {
                const url = response.meta.authorization.redirect;
                console.log(`Redirect to URL: ${url}`);
                return { message: "Redirect to complete payment", redirect_url: url };
            }
            
            // Handle AVS NoAuth (Address Verification)
            if (response.meta.authorization.mode === 'avs_noauth') {
                const payload2 = {
                    ...payload,
                    authorization: {
                        mode: 'avs_noauth',
                        city: "Ota",
                        address: "10, Olubunmi Owa street",
                        state: 'Ogun',
                        country: "NG",
                        zipcode: "110001"
                    }
                };
                const reCallCharge = await flw.Charge.card(payload2);
                console.log(reCallCharge);
                return { status: 201, response: reCallCharge };
            }
            
            console.log(response);
            return { status: 201, response };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default PaymentService;