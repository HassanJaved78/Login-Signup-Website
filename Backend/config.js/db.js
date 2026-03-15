import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// dotenv.config();

let db;

export const connectDB = async () => {
    const client = new MongoClient(process.env.MONGO_URI);
    try{
        await client.connect();

        // Test connection
        await client.db('chat_application').command({ ping: 1 });

        db = client.db();

        console.log("Connected to database succesfully. Database runnig.");
    }
    catch(err){
        console.log(`Error! Cannot connect to database. \n${err}`)
    }
}

export const getDB = () => db;