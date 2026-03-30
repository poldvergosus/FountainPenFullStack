import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Blog from './pages/Blog'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import NotFound from './pages/NotFound'
import OrderSuccess from './pages/OrderSuccess'
import BlogPost from './pages/BlogPost'
import ScrollToTop from './components/ScrollToTop'
import Profile from './pages/Profile'

const App = () => {
    return (
        <div className=''>
            <ScrollToTop />
            <Navbar />
            <SearchBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/collection' element={<Collection />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/product/:productId' element={<Product />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<Login />} />
                <Route path='/place-order' element={<PlaceOrder />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/blog' element={<Blog />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/collection/:brandName' element={<Collection />} />
                <Route path='/order-success' element={<OrderSuccess />} />
                <Route path='/blog/:slug' element={<BlogPost />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App