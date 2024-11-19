import React, { useState } from "react";
import AllRoutes from "./allroutes/AllRoutes";
import FlashDealsData from "./components/FlashDeals/flashDealsData";
import ShopData from "./components/Shop/shopData";
import AllProductsData from "./components/Allproducts/allProductsData";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./utils/AuthContext"; // Import the AuthProvider
import "./App.css";

// Custom Modal Component
function ConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to order all of these products?</h2>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

function App() {
  const { productItems } = FlashDealsData;
  const { shopItems } = ShopData;
  const { allProductsData } = AllProductsData;
  const { isLoggedIn } = useAuth(); // Access login state
  console.log("App component rendered. isLoggedIn:", isLoggedIn);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = (product) => {
    const productExists = cartItems.find((item) => item.id === product.id);
    if (productExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...productExists, qty: productExists.qty + 1 } : item
        )
      );
      toast.success("Item quantity increased");
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
      toast.success("Item added to cart");
    }
  };

  const deleteFromCart = (product) => {
    const productExists = cartItems.find((item) => item.id === product.id);
    if (productExists.qty === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
      toast.success("Item removed from cart");
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...productExists, qty: productExists.qty - 1 } : item
        )
      );
      toast.success("Item quantity decreased");
    }
  };

  const checkOut = async () => {
    if (cartItems.length <= 0) {
      toast.error("Add an item in the cart to checkout");
      return;
    }
    setIsModalOpen(true);
  };

  const confirmCheckout = async () => {
    if (!isLoggedIn) {
      console.log("You must be logged in to place an order.");
      toast.error("You must be logged in to place an order.");
      return;
    }

    console.log("Cart contents:");
    const purchase = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      qty: item.qty,
      price: item.price,
    }));

    console.log(purchase);
    await exponea.track('purchase', { purchase });
    setCartItems([]);
    toast.success("Order placed, Thanks!!");
    setIsModalOpen(false);
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
    toast.success("Item removed from cart");
  };

  return (
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <>
        <AllRoutes
          productItems={productItems}
          shopItems={shopItems}
          allProductsData={allProductsData}
          addToCart={addToCart}
          deleteFromCart={deleteFromCart}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          checkOut={checkOut}
        />
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={confirmCheckout}
          onCancel={() => setIsModalOpen(false)}
        />
        <Toaster />
      </>
    </AuthProvider>
  );
}

export default App;