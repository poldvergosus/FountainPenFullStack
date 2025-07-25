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

const App = () => {
    return (
        <div className=''>
            <Navbar/>
            <SearchBar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/collection' element={<Collection/>}/>
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/product/:productId' element={<Product/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/place-order' element={<PlaceOrder/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/blog' element={<Blog/>}/>
                <Route path='*' element={<NotFound />} />
                <Route path='/collection/:brandName' element={<Collection/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}

export default App