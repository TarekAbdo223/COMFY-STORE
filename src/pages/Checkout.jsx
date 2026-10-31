import { useSelector } from "react-redux";
import { CheckoutForm, SectionsTitle, CartTotals } from "../components";

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  if (cartTotal.length === 0) {
    return <SectionsTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionsTitle text="Place your order" />
      <div className="mt-8 grid gap-8  md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};
export default Checkout;
