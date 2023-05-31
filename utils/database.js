import mongoose from "mongoose";


let isConnected = false;

export const connectToDB= async () =>{
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log("MongoDB already conected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName:"store_items",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected=true;

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}