import React from "react";
import { customFetch, formatPrice } from "../utils";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  // console.log(params);
  const { id } = params;
  const response = await customFetch(`/products/${id}`);
  // console.log(response);
  const product = response.data.data;
  return { product };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatPrice(price);

  return <div>SingleProduct</div>;
};

export default SingleProduct;
