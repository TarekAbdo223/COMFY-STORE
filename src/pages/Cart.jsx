import React from "react";
import { useSelector } from "react-redux";
import { CartTotals, SectionsTitle } from "../components";
import CartItemsList from "../components/CartItemsList";
import { Link } from "react-router-dom";

const Cart = () => {
  const user = null;
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return <SectionsTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionsTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg col-span-8">
          <CartItemsList />
        </div>
        <div className="lg col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
