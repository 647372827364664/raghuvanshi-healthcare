import { NextRequest, NextResponse } from 'next/server';
import { getRazorpayClient } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    // Log environment variables for debugging (remove in production)
    console.log('Razorpay Key ID:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
    console.log('Razorpay Key Secret exists:', !!process.env.RAZORPAY_KEY_SECRET);

    const body = await request.json();
    const { amount, currency = 'INR', receipt, notes } = body;

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Amount is required and must be greater than 0' },
        { status: 400 }
      );
    }

    // Attempt to construct Razorpay client at runtime
    const client = getRazorpayClient();

    if (!client) {
      console.error('Razorpay client could not be created – missing credentials');
      return NextResponse.json(
        { error: 'Payment gateway configuration error: missing API keys' },
        { status: 500 }
      );
    }

    // Create order options
    const options = {
      amount: Math.round(amount * 100), // Convert to paise (Razorpay requires amount in smallest currency unit)
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    };

    // Create order using Razorpay API
    const order = await client.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });

  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create order',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
