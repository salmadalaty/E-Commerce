const express = require('express');
const port = 5000;
const app = express();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const multer = require("multer");//for upload folder
const path = require("path");
const cors = require("cors");
const { userInfo } = require('os');
const { error, log } = require('console');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://lalo:lalo@cluster0.mgppk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connection Success"))
    .catch((err) => console.error("Connection Error:", err));



//Api Creation

app.get("/", (req, res) => {
    res.send("Expree App Is Runing")
})

// image storage multer client

const storage = multer.diskStorage({
    destination: './upload.images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })

//creating upload end point for images server
app.use('/images', express.static('upload.images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating product

const product = mongoose.model("product", {
    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    new_price: {
        type: Number,
        require: true
    },
    old_price: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

//create API for add a product
app.post('/addproduct', async (req, res) => {
    let Products = await product.find({});
    let id;
    if (Products.length > 0) {
        let last_product_array = Products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const products = new product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    console.log(products);
    await products.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })

})


//Creating Api for deleting Product
app.delete('/removeproduct', async (req, res) => {
    await product.findOneAndDelete({ id: req.body.id });
    console.log("Remove");
    res.json({
        success: true
    })
})

//creating API for get all produts
app.get('/allproducts', async (req, res) => {
    let Products = await product.find({});
    console.log("all product fetched");
    res.send(Products);
})

//schema creating for user modeel

const users = mongoose.model('User', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})


//API for register
app.post('/signup', async (req, res) => {
    let check = await users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "user already exist" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
    console.log(req.body);

})

//API for Login
app.post('/login', async (req, res) => {
    let user = await users.findOne({ email: req.body.email });
    if (user) {
        const pass = req.body.password === user.password;
        if (pass) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, errors: "Wrong Password" })
        }

    }
    else {
        res.json({ success: false, errors: "Please SignUp" })
    }
})

//Create API fro new collection data
app.get('/new', async (req, res) => {
    let products = await product.find({});
    let newc = products.slice(1).slice(-8);
    console.log("newc");
    res.send(newc);

})

//Create API fro new popular
app.get('/popular', async (req, res) => {
    let products = await product.find({});
    let newc = products.slice(0, 4);
    console.log("newc");
    res.send(newc);

})

//creating middlle way to fetch user

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate with valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }
        catch (error) {
            res.status(401).send({ errors: "Please authenticate with valid token" })
        }
    }
}

//create end point for adding product in cart data

app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("added")
    let userdata = await users.findOne({ _id: req.user.id });
    userdata.cartData[req.body.itemId] += 1;
    await users.findByIdAndUpdate({ _id: req.user.id }, { cartData: userdata.cartData });
    res.send("addded")
})

//API FOR REOVE PRODUCT FROM CART

app.post('/removecart', fetchUser, async (req, res) => {
    console.log("removed")
    let userdata = await users.findOne({ _id: req.user.id });
    userdata.cartData[req.body.itemId] -= 1;
    await users.findByIdAndUpdate({ _id: req.user.id }, { cartData: userdata.cartData });
    res.send("remove")
})

//API for login yrjae klshi
app.post('/getcart',fetchUser, async (req, res)=>{
    console.log("get cart")
    let userdata= await users.findOne({_id:req.user.id});
    res.json(userdata.cartData);
})

app.listen(port, () => {
    console.log("Port Connect Success");
})
