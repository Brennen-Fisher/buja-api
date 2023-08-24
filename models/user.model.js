import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
        unique: true,
    },
    phone: {
        type: Number, 
        required: false,
        unique: true,
    },
    name: {
        type: String, 
        required: false,        
    },
    saved: {
        type: [String], 
        required: false,
    },
    made: {
        type: [String], 
        required: false,
    },
},{
    timestamps: true
});

export default mongoose.model("User", userSchema);