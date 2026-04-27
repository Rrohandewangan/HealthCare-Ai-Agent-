import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
})

import connectDB from "./db/dbconnect.js";
import app from "./app.js"

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB connection is failed !!!", err.message);
})