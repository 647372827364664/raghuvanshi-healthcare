import { NextRequest, NextResponse } from 'next/server';
import { getRazorpayClient } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Order Creation API Called ===');
    
    const body = await request.json();
    const { amount, currency = 'INR', receipt, notes } = body;
    
    console.log('Request body:', { amount, currency, receipt, notes });

    // Validate required fields
    if (!amount || amount <= 0) {
      console.error('Invalid amount:', amount);
      return NextResponse.json(
        { error: 'Amount is required and must be greater than 0' },
        { status: 400 }
      );
    }

    // Attempt to create a Razorpay client at runtime
    const client = getRazorpayClient();
    if (client) {
      try {
        const options = {
          amount: Math.round(amount * 100), // Convert to paise
          currency,
          receipt: receipt || `receipt_${Date.now()}`,
          notes: notes || {},
        };

        console.log('Creating Razorpay order with options:', options);
        const order = await client.orders.create(options);
        console.log('Razorpay order created successfully:', order);
        
        return NextResponse.json(order, { status: 200 });
        
      } catch (razorpayError: any) {
        console.error('Razorpay order creation failed:', razorpayError);
        
        // Fall back to mock order if Razorpay fails
        console.log('Falling back to mock order creation');
      }
    } else {
      console.log('Razorpay client not available; using mock order');
    }

    // Create mock order (fallback when Razorpay is not available or fails)
    const mockOrder = {
      id: `order_mock_${Date.now()}${Math.floor(Math.random() * 1000)}`,
      entity: 'order',
      amount: Math.round(amount * 100), // Convert to paise
      amount_paid: 0,
      amount_due: Math.round(amount * 100),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      status: 'created',
      created_at: Math.floor(Date.now() / 1000),
      notes: notes || {},
      mock: true, // Flag to indicate this is a mock order
    };

    console.log('Mock order created successfully:', mockOrder);
    
    return NextResponse.json(mockOrder, { status: 200 });

  } catch (error: any) {
    console.error('=== Order Creation Error ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to create order', 
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
