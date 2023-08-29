import mongoose from 'mongoose';
const { Schema } = mongoose;

const listSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: false,
    },
    verified: {
        type: Boolean,
        required: false,
        default: false,
    },
    price: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    sale: {
        type: String,
        required: true,
    },
    bath: {
        type: Number,
        required: false,
    },
    room: {
        type: Number,
        required: false,
    },
    m2: {
        type: Number,
        required: false,
    },
    yor: {
        type: Number,
        required: false,
    },
    make: {
        type: String,
        required: false,
    },
    model: {
        type: String,
        required: false,
    },
    mileage: {
        type: Number,
        required: false,
    },
    mpg: {
        type: Number,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    engine: {
        type: String,
        required: false,
    },
    style: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: false,
    },
    feat: {
        type: [String],
        required: false,
    },
    fact: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    commune: {
        type: String,
        required: true,
    },
    zone: {
        type: String,
        required: true,
    },
    addy: {
        type: String,
        required: true,
    },
    what: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model("Listing", listSchema);