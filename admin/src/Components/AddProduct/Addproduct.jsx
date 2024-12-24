import React, { useState, useEffect } from 'react';
import './add.css';
import upload from '../../Assets/Admin_Assets/upload_area.svg';

const Addproduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails, [e.target.name]: e.target.value
        });
    }

    const add = async () => {
        let res;
        let form = new FormData();
        form.append('name', productDetails.name);
        form.append('old_price', productDetails.old_price);
        form.append('new_price', productDetails.new_price);
        form.append('category', productDetails.category);

        if (image) {
            form.append('product', image);
        }

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: form,
            });

            res = await response.json();
            console.log("Response from server:", res);

            if (res && res.success) {
                console.log("Product added successfully", res.image_url);
                // Update the product details with the image URL
                setProductDetails(prevDetails => ({
                    ...prevDetails,
                    image: res.image_url // Set the image URL here
                }));

                // Make sure to send the updated product details
                await fetch('http://localhost:5000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: productDetails.name,
                        old_price: productDetails.old_price,
                        new_price: productDetails.new_price,
                        category: productDetails.category,
                        image: res.image_url // Include the new image URL
                    }),
                }).then((res) => res.json()).then((data) => {
                    data.success ? alert("Product added") : alert("Failed");
                });
            } else {
                console.error("Failed to add product", res);
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    useEffect(() => {
        console.log("Product details updated:", productDetails);
    }, [productDetails]);





    return (
        <div className='addp'>
            <div className="feild">
                <p>Product Title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    name='name'
                    placeholder='Type Here'
                />
            </div>
            <div className="price">
                <div className="item">
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="text"
                        name='old_price'
                        placeholder='Type here'
                    />
                </div>
                <div className="item">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="text"
                        name='new_price'
                        placeholder='Type here'
                    />
                </div>
            </div>
            <div className="feild">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className='select'
                >
                    <option value='women'>Women</option>
                    <option value='men'>Men</option>
                    <option value='kid'>Kid</option>
                </select>
            </div>
            <div className="feild">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload} alt="" className='upload' />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={add} className='btn'>Add Product</button>
        </div>
    );
}

export default Addproduct;
