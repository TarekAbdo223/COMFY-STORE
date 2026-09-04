import ProductsGrid from "./ProductsGrid";
import SectionsTitle from "./SectionsTitle";

const FeaturedProducts = () => {
  return (
    <div className="pt-24">
      <SectionsTitle text="featured products" />
      <ProductsGrid />
    </div>
  );
};

export default FeaturedProducts;
