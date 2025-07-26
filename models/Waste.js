import mongoose from 'mongoose';
const wasteSchema = new mongoose.Schema({
    Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fName: {
        type: String,
        // required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        // required: true,
        // minlength: 6
    },
    duration: {
        type: Number,
        // required: true,
        // trim: true
    },
    cropType: {
        type: String,
        trim: true,
    }, 
    contact: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        // required: true,
    },
    addDetails: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Waste = mongoose.model('Waste', wasteSchema);
export default Waste;