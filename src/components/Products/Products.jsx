import { SimpleGrid } from "@chakra-ui/react";
import Product from "./Product/Product";

const Products = ({products, onAddToCart }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} gap={4} py={14}>
      {products.map((product) => (
          <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </SimpleGrid>
  );
};

export default Products;
