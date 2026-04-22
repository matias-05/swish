import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, selectedSize, selectedColor) => {
    const currentTotal = cartItems.reduce(
      (total, item) =>
        item.id === product.id && item.selectedSize === selectedSize
          ? total + item.quantity
          : total,
      0,
    );

    const stockDisponible =
      product.stockPorTalle && product.stockPorTalle[selectedSize] !== undefined
        ? Number(product.stockPorTalle[selectedSize])
        : Number(product.stock || 0);

    if (currentTotal >= stockDisponible) {
      toast.error(
        `¡Agotado! Solo quedan ${stockDisponible} en talle ${selectedSize}.`,
        {
          className:
            "border border-white/20 bg-white/10 shadow-lg backdrop-filter backdrop-blur-md",
          style: {
            borderRadius: "10px",
            background: "transparent",
            color: "#fff",
            border: "1px solid #ef4444",
          },
        },
      );
      return;
    }

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor,
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
        };
        return newItems;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            selectedSize,
            selectedColor,
            quantity: 1,
          },
        ];
      }
    });

    toast.success(`Agregado: ${product.nombre} (${selectedSize})`, {
      className:
        "border border-white/20 bg-white/10 shadow-lg backdrop-filter backdrop-blur-md",
      style: {
        borderRadius: "10px",
        background: "transparent",
        color: "#fff",
        border: "1px solid #CAFC00",
      },
    });
  };

  const removeFromCart = (productId, selectedSize, selectedColor) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          ),
      ),
    );
  };

  const updateQuantity = (productId, selectedSize, selectedColor, change) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) =>
          item.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor,
      );

      if (itemIndex === -1) return prevItems;
      const itemToUpdate = prevItems[itemIndex];

      if (change > 0) {
        const currentTotal = prevItems.reduce(
          (total, item) =>
            item.id === productId && item.selectedSize === selectedSize
              ? total + item.quantity
              : total,
          0,
        );

        const stockDisponible =
          itemToUpdate.stockPorTalle &&
          itemToUpdate.stockPorTalle[selectedSize] !== undefined
            ? Number(itemToUpdate.stockPorTalle[selectedSize])
            : Number(itemToUpdate.stock || 0);

        if (currentTotal >= stockDisponible) {
          toast.error(
            `Stock máximo del talle ${selectedSize} alcanzado (${stockDisponible})`,
            {
              className:
                "border border-white/20 bg-white/10 shadow-lg backdrop-filter backdrop-blur-md",
              style: {
                borderRadius: "10px",
                background: "transparent",
                color: "#fff",
                border: "1px solid #ef4444",
              },
            },
          );
          return prevItems;
        }
      }

      const newItems = [...prevItems];
      const newQuantity = Math.max(1, itemToUpdate.quantity + change);
      newItems[itemIndex] = { ...itemToUpdate, quantity: newQuantity };

      return newItems;
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
