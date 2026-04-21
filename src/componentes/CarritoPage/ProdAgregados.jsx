import React from "react";
import Card from "./Card";

const ProdAgregados = ({ products, onQuantityChange, onRemoveProduct }) => {
  return (
    <div className="flex flex-col gap-8">
      {products.length === 0 ? (
        <p className="text-xl text-center text-gray-300 py-10">
          El carrito está vacío.
        </p>
      ) : (
        products.map((product) => (
          <Card
            key={product.id}
            product={product}
            onQuantityChange={onQuantityChange}
            onRemoveProduct={onRemoveProduct}
          />
        ))
      )}
    </div>
  );
};

export default ProdAgregados;
