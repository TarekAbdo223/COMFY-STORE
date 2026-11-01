import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { OrdersList, PaginationContainer, SectionsTitle } from "../components";
import { customFetch } from "../utils";

export const loader =
  (store) =>
  async ({ request }) => {
    console.log(store);

    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("You must be logged in to view orders");
      return redirect("/login");
    }
    // to get the params
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return { orders: response.data.data, meta: response.data.meta };
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
  };

const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionsTitle text="please make an order" />;
  }
  return (
    <>
      <SectionsTitle text="Your Orders" />
      <OrdersList />
      <PaginationContainer />
    </>
  );
};

export default Orders;
