import mongoose from 'mongoose'

async function dbConnection(){
    try {
        await mongoose.connect('mongodb://localhost:27017/employee')
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection failed", error)
    }
}

export default dbConnection
