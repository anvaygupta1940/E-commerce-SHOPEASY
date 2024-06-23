const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')



/* importing routes */
const authRoutes = require("./Routes/auth");
const productRoutes = require("./Routes/product");
const cartRoutes = require("./Routes/cart");
const paymentRoutes = require("./Routes/payment");
const webhookRoutes = require("./Routes/webhook");
const orderRoutes = require("./Routes/order");



/* middlewares */
dotenv.config();
// app.use(express.json());
app.use(bodyParser.json({ limit: '35mb' }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '35mb',
        parameterLimit: 50000,
    }),
);
app.use(cors({
    origin: process.env.FRONTEND_URL,  // front end url
    credentials: true
}));
app.use(cookieParser());


/* Routes */
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", paymentRoutes);
app.use("/api", webhookRoutes);
app.use("/api", orderRoutes);



/* connecting database and listening server */
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL).then(app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    console.log("Server is connected with database");
})).catch((err) => {
    console.log(`Error in connection of database and server ${err}`);
});



