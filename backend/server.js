import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import connectDB from "./config/db.js";
import dotenv from "dotenv";


const app = express();
app.use(cors());
app.use(bodyParser.json());
const months = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];

// Configure env
dotenv.config();


// Connect to MongoDB database
connectDB();


// Define User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 18, max: 65 },
    email: { type: String, required: true, },
    phone: { type: String, required: true },
    batch: { type: String, enum: ['06:00-07:00', '07:00-08:00', '08:00-09:00', '17:00-18:00'], required: true },
    month: { type: Number, default: new Date().getMonth() },
});

const User = mongoose.model('User', userSchema);


// API endpoint for enrollment
app.post('/api/enroll', async (req, res) => {
    const { name, age, email, phone, batch } = req.body;
    console.log(req.body);

    if (!name || !age || !email || !phone || !batch) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    if (age < 18 || age > 65) {
        return res.status(400).json({ message: 'Age must be between 18 and 65.' });
    }


    const foundUser = await User.find({ email: `${email.toLowerCase()}` }).exec();
    
    if (foundUser.length !== 0) {
        const {name, month, email } = foundUser[0];
        if (month < new Date().getMonth()) {
            //take the payment for curr month and update the DB curr month
            const paymentSuccess = await mockPayment(req.body);
            if (!paymentSuccess) {
                return res.status(500).json({ message: 'Payment failed.' });
            }

            await User.updateOne(
                { email: `${email}` },
                {
                    month: new Date().getMonth(),
                    age: `${age}`,
                    phone: `${phone}`,
                    batch: `${batch}`
                });
            return res.json({
                success: true,
                message: 'Payment received for ' + `${months[new Date().getMonth()]}` + ' month successfully! Details:' +
                    `\nName: ${name}` +
                    `\nAge: ${age}` +
                    `\nBatch: ${batch}`,
            });

        }
        else if (month == new Date().getMonth()) {
            //already paid for the curr month
            return res.json({
                success: true,
                message: 'You have already paid for ' + `${months[new Date().getMonth()]}` + ' month! Details:' +
                    `\nName: ${name}` +
                    `\nAge: ${age}` +
                    `\nBatch: ${batch}`,
            });
        }
    }



    // Mock payment function for new user
    const paymentSuccess = await mockPayment(req.body);
    if (!paymentSuccess) {
        return res.status(500).json({ message: 'Payment failed.' });
    }

    // Save new user data to database
    const newUser = new User({ name, age, email: `${email.toLowerCase()}`, phone, batch });
    await newUser.save();
    return res.json({
        success: true,
        message: 'Enrolled successfully! Details:' +
            `\nName: ${name}` +
            `\nAge: ${age}` +
            `\nBatch: ${batch}`,
    });
});



// Mock payment function
const mockPayment = async (data) => {
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true; // Replace with actual payment gateway response
};


app.listen( 8000 || process.env.PORT, () => console.log('Server listening on port 8000'));
