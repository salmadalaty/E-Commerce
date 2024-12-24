import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import add from '../../Assets/Admin_Assets/Product_Cart.svg';
import list_product from '../../Assets/Admin_Assets/Product_list_icon.svg';
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to={'/addproduct'} style={{ textDecoration: 'none' }}>
                <div className="sidebaritem">
                    <img src={add} alt="" />
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to={'/allproducts'} style={{ textDecoration: 'none' }}>
                <div className="sidebaritem">
                    <img src={list_product} alt="" />
                    <p> Product List</p>
                </div>
            </Link>
        </div>
    );
}

export default Sidebar;
