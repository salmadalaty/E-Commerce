import React from 'react'
import './admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Addproduct from '../../Components/AddProduct/Addproduct'
import Listproduct from '../../Components/ListProduct/Listproduct'


const Admin = () => {
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path='/addproduct' element={<Addproduct />}></Route>
                <Route path="/allproducts" element={<Listproduct />} />

            </Routes>
        </div>
    )
}

export default Admin
