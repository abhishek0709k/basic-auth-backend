import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    isAgency: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps: true });

const User = model("User", UserSchema);

export default User;