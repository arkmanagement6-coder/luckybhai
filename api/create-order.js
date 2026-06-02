/**
 * Cashfree Create Order Serverless API Endpoint (Vercel Node.js Function)
 * Securely creates orders on Cashfree without exposing Secret Keys on the frontend.
 */

module.exports = async function handler(req, res) {
  // CORS Headers for API accessibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { amount, customerName, customerPhone, customerEmail, returnUrl } = req.body;

    if (!amount || !customerPhone) {
      return res.status(400).json({ error: 'Amount and Customer Phone are required' });
    }

    const clientId = process.env.CASHFREE_CLIENT_ID || '129729039da08c618b86226cf120927921';
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET;

    if (!clientSecret) {
      return res.status(500).json({ 
        error: 'Cashfree Secret Key is not configured in the server environment variables. Please set CASHFREE_CLIENT_SECRET.' 
      });
    }

    // Generate unique identifiers for this order transaction
    const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const customerId = `cust_${Date.now()}`;

    // Payload configuration matching Cashfree version 2023-08-01 schema
    const cashfreePayload = {
      order_id: orderId,
      order_amount: parseFloat(amount),
      order_currency: 'INR',
      customer_details: {
        customer_id: customerId,
        customer_phone: customerPhone.toString(),
        customer_email: customerEmail || 'info@luckydigitalmedia.in',
        customer_name: customerName || 'Valued Client'
      },
      order_meta: {
        return_url: returnUrl || 'https://luckydigitalmedia.in/'
      }
    };

    // Execute server-to-server POST request to Cashfree Production Orders Endpoint
    const cashfreeResponse = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': clientId,
        'x-client-secret': clientSecret,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(cashfreePayload)
    });

    const responseData = await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      return res.status(cashfreeResponse.status).json({
        error: responseData.message || 'Error creating Cashfree order',
        details: responseData
      });
    }

    // Success response containing the payment_session_id required by the JS SDK
    return res.status(200).json({
      payment_session_id: responseData.payment_session_id,
      order_id: responseData.order_id
    });

  } catch (error) {
    console.error('Error in Cashfree Order API handler:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message 
    });
  }
};
