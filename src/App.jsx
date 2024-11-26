import React from 'react';
import { Toaster } from 'react-hot-toast';
import MenuPage from "./assets/components/MenuPage";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#2ecc71',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#e74c3c',
            },
          },
        }}
      />
      <Header />
      <main className="main-content">
        <MenuPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;
