import Razorpay from 'razorpay';

// Export configuration values but do NOT instantiate the Razorpay client
// at module load time — creating the client during build can fail when
// environment variables are unavailable on remote builders.
export const razorpayConfig = {
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
};

export function getRazorpayClient() {
  const { key_id, key_secret } = razorpayConfig;
  if (!key_id && !process.env.RAZORPAY_OAUTH_TOKEN) {
    // Caller should handle missing credentials; return null so we don't
    // throw during module initialization.
    return null as null | Razorpay;
  }

  // Construct and return a Razorpay client at runtime when called from
  // server-side request handlers where environment variables are available.
  return new Razorpay({
    key_id,
    key_secret,
  });
}