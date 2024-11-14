import React, { useState } from "react";
import AllRoutes from "./allroutes/AllRoutes";
import FlashDealsData from "./components/FlashDeals/flashDealsData";
import ShopData from "./components/Shop/shopData";
import AllProductsData from "./components/Allproducts/allProductsData";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  // pulling data from data files & storing it in variables here
  const { productItems } = FlashDealsData;
  const { shopItems } = ShopData;
  const { allProductsData } = AllProductsData;
  // using useState hooks to change and store items in the cart here
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This is a function to add items in the cart it takes the product and checks within the cart to see if there's already added in cart
  // if it already has it it increases the quantity by 1 with each click, if it doesn't exist in cart it adds it to the cart
  const addToCart = (product) => {
    const productExists = cartItems.find((item) => item.id === product.id);
    if (productExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productExists, qty: productExists.qty + 1 }
            : item
        )
      );
      toast.success("Item quantity increased");
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
      toast.success("Item added to cart");
    }
  };

  // This is a function to delete items from the cart, it takes the product and checks within the cart to see if it is already in cart
  // if it has the item it decreases the quantity by 1 with each click, if it has less than 1 number of item it removes entirely from the cart
  const deleteFromCart = (product) => {
    const productExists = cartItems.find((item) => item.id === product.id);
    if (productExists.qty === 1) {
      const shouldRemove = window.confirm(
        "Are you sure you want to remove this item from the cart?"
      );

      if (shouldRemove) {
        setCartItems(cartItems.filter((item) => item.id !== product.id));
        toast.success("Item removed from cart");
      }
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productExists, qty: productExists.qty - 1 }
            : item
        )
      );
      toast.success("Item quantity decreased");
    }
  };

  // This function is used for the checkout button it takes cartItems as input and if the length of items in it is 0 it alerts add something to cart first
  const checkOut = async (cartItems) => {
    if (cartItems.length <= 0) {
      toast.error("Add an item in the cart to checkout");
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const purchase = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      qty: item.qty,
      price: item.price,
    }));

    // Async tracking call
    exponea.track('purchase', { purchase });

    // Clear the cart immediately after initiating the tracking call
    setCartItems([]);
    toast.success("Order placed, Thanks!!");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Modal HTML */}
      <div id="confirmModal" className={`modal ${isModalOpen ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close-button" onClick={handleCancel}>&times;</span>
          <h2>Confirm Order</h2>
          <p>Are you sure you want to order all of these items?</p>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleCancel}>No</button>
        </div>
      </div>

      {/* Other component code */}
      <AllRoutes
        productItems={productItems}
        shopItems={shopItems}
        allProductsData={allProductsData}
        addToCart={addToCart}
        deleteFromCart={deleteFromCart}
        checkOut={checkOut}
        removeFromCart={removeFromCart}
      />
      <Toaster />
    </>
  );
}

export default App;