import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => console.log("connected"))
    .catch((err) => console.log(err.message))

// module.exports = mongoose.connection;
export default mongoose.connection;