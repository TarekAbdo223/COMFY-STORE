import React from "react";
import { Form } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";

export const action = (store) => async () => {
  console.log(store);

  return null;
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
