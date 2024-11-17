import React from 'react';
import { Toaster } from 'react-hot-toast';
import MenuPage from "./assets/components/MenuPage";

const App = () => {
  return (
    <div>
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
      <MenuPage />
    </div>
  );
};

export default App;