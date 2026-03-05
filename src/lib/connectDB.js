import mongoose from 'mongoose'

const MONGO_URI=process.env.MONGODB_URI

if(!MONGO_URI){
    throw new Error("Please provide mongoDB_url")
}

let cached = global.mongoose

if(!cached){
    cached  = global.mongoose={conn:null, promise:null}
}

async function dbConnect(){
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const object={
            bufferCommands:false
        }

        cached.promise = mongoose.connect(MONGO_URI,object).then((mongoose)=>{
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn
}

export default dbConnect