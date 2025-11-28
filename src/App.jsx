import { useState } from 'react'
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from "./components/Account";

import HomePage from './components/HomePage';
import AboutUs from './components/Aboutus';
import Settings from "./components/Settings";

// CATEGORY COMPONENTS
import FruitsProducts from './components/Computers';   // Fruits
import Vegetables from './components/Mobiles';        // Vegetables
import Crops from './components/Laptops';             // Crops
import Dairy from './components/Pendrives';           // Dairy
import Grains from './components/Grains';
import Herbs from './components/Herbs';
import PoultryProduct from './components/poultry';
import SpecialtyAndLocalProducts from './components/special';
import OrganicProducts from './components/organic';
import AgroProcessedProducts from './components/agro';

import Home from './components/Home';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Orders from './components/Orders';

// ADMIN PAGES
import AddProduct from './components/AddProduct';
import DeleteProduct from './components/Delete';
import Update from './components/Update';
import Analytics from './components/Analytics';

// OTHER PAGES
import Dashboard from './components/dashboard';
import Explore from './components/explore';


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <BrowserRouter basename="/">

        <Routes>
          <Route path="/" element={<HomePage />}>

            {/* Default route */}
            <Route index element={<AboutUs />} />

            {/* BASIC ROUTES */}
            <Route path="home" element={<Home />} />
            <Route path="about-us" element={<AboutUs />} />

            {/* CATEGORY ROUTES */}
            <Route path="fruits" element={<FruitsProducts />} />
            <Route path="vegetables" element={<Vegetables />} />
            <Route path="crops" element={<Crops />} />
            <Route path="grains" element={<Grains />} />
            <Route path="dairy" element={<Dairy />} />
            <Route path="herbs" element={<Herbs />} />
            <Route path="poultry-products" element={<PoultryProduct />} />
            <Route path="special-products" element={<SpecialtyAndLocalProducts />} />
            <Route path="organic-products" element={<OrganicProducts />} />
            <Route path="agro-processed-products" element={<AgroProcessedProducts />} />

            {/* AUTH */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* CART & ORDERS */}
            <Route path="cart" element={<Cart />} />
            <Route path="payment" element={<Payment />} />
            <Route path="orders" element={<Orders />} />

            {/* EXTRA */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="explore" element={<Explore />} />

            <Route path="add-product" element={<AddProduct />} />
<Route path="delete-product" element={<DeleteProduct />} />
<Route path="update-product" element={<Update />} />
<Route path="analytics" element={<Analytics />} />
<Route path="account" element={<Account />} />


<Route path="settings" element={<Settings />} />



          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
