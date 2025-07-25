import mongoose from 'mongoose';
const fieldSchema = new mongoose.Schema({
    Id: {
        type: String,
        // required: true,
        trim: true
    },
    Area: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    soil: {
        type: Number,
        // required: true,
        // minlength: 6
    },
    temperature: {
        type: Number,
        // required: true,
        // trim: true
    },
    cropName: {
        type: String,
        trim: true,
    },
    cropHealth: {
        type: String,
        trim: true,
    },
    energy: {
        type: Number,
        // required: true,
    },
    isIrrigationAdded: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Field = mongoose.model('Field', fieldSchema);
export default Field;