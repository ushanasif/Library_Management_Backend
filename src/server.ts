import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

let server: Server;

const MONGODB_URI = process.env.MONGODB_URI as string;

async function main() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to Database");

        server = app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    } catch (error) {
        console.error("Error during initialization:", error);
    }
}
main();