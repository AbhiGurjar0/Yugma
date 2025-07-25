import mongoose from 'mongoose';
const farmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true 
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        // unique: true,
        trim: true
    },
    address: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model('User', farmerSchema);
export default User;