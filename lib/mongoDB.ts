import mongoose from 'mongoose'

let isConnected: boolean = false;

export const connectDB = async (): Promise<void> =>{
    mongoose.set('strictQuery', true);
    
    if(isConnected){
        console.log("MongoDB is connected!")
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI || "", {
            dbName: "BShop_Admin"
        })
        isConnected = true;
        console.log("MongoDb is Connected Successfully!")
    }catch(err){
        console.log(err)
    }
}