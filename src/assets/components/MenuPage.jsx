import React, { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import CartIcon from "./CartIcon";
import "./MenuPage.css";

const initialMenuItems = [
  { id: 1, name: "Daal Bhat", price: 350, img: "/images/Dal_Bhat.jpg", description: "Traditional Nepali meal with lentils, rice, and vegetables", category: "Main Dish" },
  { id: 2, name: "Mo:Mo", price: 200, img: "/images/momo.jpg", description: "Nepali dumplings filled with spiced meat or vegetables", category: "Appetizer" },
  { id: 3, name: "Thukpa", price: 200, img: "/images/Thuppa.jpg", description: "Tibetan noodle soup with vegetables and meat", category: "Soup" },
  { id: 4, name: "Bara", price: 150, img: "/images/bara.jpg", description: "A savory deep-fried lentil patty, often enjoyed as a snack.", category: "Snacks" },
  { id: 5, name: "Dhindo", price: 300, img: "/images/dhido.jpg", description: "A traditional Nepali dish made from buckwheat or millet flour.", category: "Main Dish" },
  { id: 6, name: "Samosa", price: 100, img: "/images/Samosa.jpg", description: "A crispy pastry filled with spiced potatoes and peas.", category: "Snacks" },
  { id: 7, name: "Sel Roti", price: 100, img: "/images/Sel_Roti.jpg", description: "A sweet, ring-shaped rice donut.", category: "Snacks" },
  { id: 8, name: "Yomari", price: 150, img: "/images/Yomari.jpg", description: "A steamed dumpling made from rice flour, filled with sweet jaggery.", category: "Dessert" }
];

const MenuPage = () => {
  const [menuItems] = useState(initialMenuItems);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(menuItems.map(item => item.category))];
    return cats.sort();
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast.success(`Added ${item.name} to cart`);
  };

  const updateQuantity = (itemId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="menu-page">
      <CartIcon itemCount={cartItemsCount} onClick={() => setIsCartOpen(true)} />

      <div className="menu-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.img} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p className="price">Rs {item.price}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {isCartOpen && (
        <div className="cart-sidebar open">
          <div className="sidebar-header">
            <h2>Your Cart ({cartItemsCount} items)</h2>
            <button className="close-sidebar" onClick={() => setIsCartOpen(false)}>
              ×
            </button>
          </div>
          <div className="sidebar-content">
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.img} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>Rs {item.price}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => updateQuantity(item.id, -item.quantity)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="cart-total">
                  <h3>Total: Rs {cartTotal}</h3>
                  <button className="checkout-btn">Proceed to Checkout</button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <p>Your cart is empty</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
