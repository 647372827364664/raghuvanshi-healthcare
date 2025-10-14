import dynamic from 'next/dynamic';

const CheckoutPageContent = dynamic(
  () => import('./page-client'),
  { ssr: false }
);

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
