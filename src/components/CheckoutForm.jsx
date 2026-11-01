import React from "react";
import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      console.log(response);
      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMessage);
      if (error.response.status === 401 || error.response.status === 403) {
        return redirect("/login");
      }
      return null;
    }
    // console.log(error);

    // return null;
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">shipping information</h4>
      <div className="form-control flex flex-col">
        <label className="label">
          <span className="label-text capitalize">First Name</span>
        </label>
        <input
          type="text"
          name="name"
          className={`input input-bordered w-full`}
        />
      </div>
      <div className="form-control flex flex-col">
        <label className="label">
          <span className="label-text capitalize">Address</span>
        </label>
        <input
          type="text"
          name="address"
          className={`input input-bordered w-full`}
        />
      </div>
      <div className="mt-4">
        <SubmitBtn text="place your order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
