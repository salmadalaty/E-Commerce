import React, { useEffect, useState } from 'react'
import icon from '../../Assets/Admin_Assets/cross_icon.png'
import './list.css'
const Listproduct = () => {
    const [allp, setallp] = useState([]);

    const fetchInfo = async () => {
        try {
            const res = await fetch('http://localhost:5000/allproducts');
            const data = await res.json();
            setallp(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchInfo();
    }, [])
    const removeP = async (id) => {
        const response = await fetch('http://localhost:5000/removeproduct', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        const result = await response.json();

        if (result.success) {
            alert("Product deleted successfully.");
            await fetchInfo(); // Refresh the product list after deletion
        } else {
            alert("Failed to delete the product.");
        }
    }
    return (
        <div className='list'>
            <h1>All Product List</h1>
            <div className="list1">
                <p>Product</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Gategory</p>
                <p>Remove</p>
            </div>
            <div className="allproduct">
                <hr />
                {allp.map((product, i) => {
                    return <><div key={i} className="main list1">
                        <img src={product.image} className='icon' alt="" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={() => { removeP(product.id) }} src={icon} className='remove' alt="" />
                    </div>
                        <hr />
                    </>
                })}
            </div>
        </div>
    )
}

export default Listproduct
