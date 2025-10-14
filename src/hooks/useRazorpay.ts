'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
}

export const useRazorpay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initiatePayment = async (options: PaymentOptions) => {
    if (!isLoaded) {
      throw new Error('Razorpay SDK not loaded');
    }

    setIsLoading(true);
    try {
      // In production, you would create an order on your server
      const demoOrderId = 'order_' + Math.random().toString(36).substring(7);
      
      return new Promise((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your_test_key',
          ...options,
          handler: function(response: any) {
            resolve(response);
          },
          modal: {
            ondismiss: function() {
              reject(new Error('Payment cancelled'));
            }
          }
        });

        rzp.open();
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoaded,
    isLoading,
    initiatePayment
  };
};

export default useRazorpay;