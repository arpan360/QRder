import React, { useState } from "react";
import "./MenuPage.css"; 

const initialMenuItems = [
  { id: 1, name: "Daal Bhat", price: 200, img: "/images/Dal_Bhat.jpg"  },
  { id: 2, name: "Mo:MO", price: 120, img: "/images/momo.jpg" },
  { id: 3, name: "Thukpa", price: 200, img: "/images/Thuppa.jpg" },
  { id: 4, name: "Dhindo", price: 220, img: "/images/dhido.jpg" },
  { id: 5, name: "Samosa", price: 80, img: "/images/Samosa.jpg" },
  { id: 6, name: "Selroti", price: 100, img: "/images/Sel_Roti.jpg" },
  { id: 7, name: "Bara", price: 150, img: "/images/bara.jpg" },
  { id: 8, name: "Yomari", price: 200, img: "/images/Yomari.jpg" },
];

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  return (
    <div className="menu-page">
      <h1 className="menu-title">Restaurant Menu</h1>
      <div className="menu-container">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.img} alt={item.name} className="menu-item-image" />
            <h3>{item.name}</h3>
            <p>Price: ₹{item.price}</p>
            <button className="add-btn">Add to Cart</button>
            <button className="details-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
