
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")( process.env.STRIPE_KEY);



const app = express();
app.use(cors({origin: "true"}));

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello from FirebaseIt is working !",});

    });

app.post("/payments/create", async (req, res) => {
    const total =  req.query.total; // req.query.total;
    if (total > 0) {
        // console.log("Payment Request Recieved for this amount >>> ", total);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd"
        })
 
    res.status(201).json({
        clientSecret: paymentIntent.client_secret,
    });

    } else {
        res.status(403).json({error: "Payment Failed"});

}
    });

    app.listen(5000, (err) => {
        if (err) throw err
        
        console.log("Server is running on PORT :5000, http://localhost:5000")          
    })
