import React, { useState } from "react";
import { toast } from "react-hot-toast";
import CartIcon from "./CartIcon";
import "./MenuPage.css";

const initialMenuItems = [
  {
    id: 1,
    name: "Daal Bhat",
    price: 350,
    img: "/images/Dal_Bhat.jpg",
    description: "Traditional Nepali meal with lentils, rice, and vegetables",
    category: "Main Dish"
  },
  {
    id: 2,
    name: "Mo:MO",
    price: 200,
    img: "/images/momo.jpg",
    description: "Nepali dumplings filled with spiced meat or vegetables",
    category: "Appetizer"
  },
  {
    id: 3,
    name: "Thukpa",
    price: 200,
    img: "/images/Thuppa.jpg",
    description: "Tibetan noodle soup with vegetables and meat",
    category: "Soup"
  },
  {
    id: 4,
    name: "Bara",
    price: 150,
    img: "/images/bara.jpg",
    description: "A savory deep-fried lentil patty, often enjoyed as a snack or breakfast, typically served with achar or chutney.",
    category: "Snacks"
  },
  {
    id: 5,
    name: "Dhindo",
    price: 300,
    img: "/images/dhido.jpg",
    description: "A traditional Nepali dish made from buckwheat or millet flour, cooked into a thick, smooth porridge, often served with vegetables, gundruk or meat.",
    category: "Main Dish"
  },
  {
    id: 6,
    name: "Samosa",
    price: 100,
    img: "/images/Samosa.jpg",
    description: "A crispy, golden pastry filled with spiced potatoes, peas, and sometimes meat, perfect for a flavorful snack or appetizer.",
    category: "Snacks"
  },
  {
    id: 7,
    name: "Sel Roti",
    price: 100,
    img: "/images/Sel_Roti.jpg",
    description: "A deep-fried, sweet, ring-shaped rice donut, crispy on the outside and soft on the inside, often enjoyed during festivals and celebrations.",
    category: "Snacks"
  },
  {
    id: 8,
    name: "Yomari",
    price: 150,
    img: "/images/Yomari.jpg",
    description: "A steamed dumpling made from rice flour, filled with a sweet mixture of jaggery and sesame seeds, often enjoyed during festive occasions.",
    category: "Dessert"
  }
];

const MenuPage = () => {
  const [menuItems] = useState(initialMenuItems);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    // Trigger cart animation
    setIsCartAnimating(true);
    setTimeout(() => setIsCartAnimating(false), 500);
    
    toast.success(`Added ${item.name} to cart`);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItemsCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="menu-page">
      {/* Cart Icon */}
      <CartIcon 
        itemCount={cartItemsCount}
        onClick={() => setIsCartOpen(true)}
        isAnimating={isCartAnimating}
      />

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Your Cart ({cartItemsCount} items)</h2>
          <button 
            className="close-sidebar"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
          >
            ×
          </button>
        </div>
        <div className="sidebar-content">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Rs {item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>
                    +
                  </button>
                </div>
              </div>
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                ×
              </button>
            </div>
          ))}
          
          {cart.length > 0 ? (
            <div className="cart-total">
              <h3>Total: Rs {cartTotal}</h3>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          ) : (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Rest of your menu content */}
      <h1 className="menu-title">Menu</h1>
      <div className="menu-container">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.img} alt={item.name} className="menu-item-image" />
            <h3>{item.name}</h3>
            <p>Price: Rs {item.price}</p>
            <button 
              className="add-btn"
              onClick={() => addToCart(item)}
              aria-label={`Add ${item.name} to cart`}
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;