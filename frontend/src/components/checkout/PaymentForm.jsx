import React, { useState } from 'react';
import Header from '../layout/Header';
import { useLocation } from 'react-router-dom';

const PaymentForm = () => {

    const location = useLocation();
    const { total } = location.state || {}; // Safely access the state



    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the payment processing
        console.log('Payment submitted:', formData);
        // Add your payment processing logic here
    };

    return (
        <div className="container mx-auto p-4">
            <Header />
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-3xl mb-6">Payment Information</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Credit Card Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control w-full">
                                    <label className="label" htmlFor="cardName">
                                        <span className="label-text">Name on Card</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="cardName"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label" htmlFor="cardNumber">
                                        <span className="label-text">Card Number</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label" htmlFor="expiryDate">
                                        <span className="label-text">Expiry Date</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        placeholder="MM/YY"
                                        required
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label" htmlFor="cvv">
                                        <span className="label-text">CVV</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control w-full md:col-span-2">
                                    <label className="label" htmlFor="address">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label" htmlFor="city">
                                        <span className="label-text">City</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label" htmlFor="state">
                                        <span className="label-text">State</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control w-full md:col-span-2">
                                    <label className="label" htmlFor="zipCode">
                                        <span className="label-text">Zip Code</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            {/* Add your order summary here */}
                            <div className="alert alert-info">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <label className='text-2xl'>Total: 
                                        <span className='text-2xl mx-2 font-bold font-serif'>
                                            ${total?.toFixed(2)}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-secondary w-full">
                            Pay Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;