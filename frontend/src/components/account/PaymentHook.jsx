import React, { useContext, useEffect, useState } from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { AuthContext } from '../../context/AuthProvider';

export default function PaymentHook({ amount }) {
  const { userState } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userState) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      console.log(storedUser);
    }
  }, [userState]);

  const config = {
    public_key: 'FLWPUBK_TEST-9dcaa851126fd9f1bc6b359e45db5676-X',
    tx_ref: Date.now().toString(),
    amount: amount,
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user?.email,
      phone_number: '070********',
      name: user?.name,
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => { },
  };

  return (
    <div className="App">
      <div className="btn btn-secondary">
        <p>{amount}</p>
        <FlutterWaveButton {...fwConfig} />
      </div>
    </div>
  );
}