import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(productId) {
    const existing = cartItems.find((items) => items.id === productId);
    if (existing) {
      const currentQuantity = existing.quantity;
      const updatedCartItems = cartItems.map((items) =>
        items.id === productId
          ? { id: productId, quantity: currentQuantity + 1 }
          : items
      );

      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

  function getCartItemsWithProducts() {
    return cartItems
      .map((items) => ({
        ...items,
        product: getProductById(items.id),
      }))
      .filter((items) => items.product);
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter((items) => items.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(
      cartItems.map((items) =>
        items.id === productId ? { ...items, quantity: quantity } : items
      )
    );
  }

  function getCartTotal() {
    const total = cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);

    return total;
  }

  function clearCart() {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};
