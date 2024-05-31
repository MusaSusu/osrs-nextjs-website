import mongoose, { Schema, model, models, Document } from "mongoose";
import Email from "next-auth/providers/email";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        match: [/^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 1-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
})

export interface UserType extends Document{
    _id: string;
    email: string;
    username: string;
    image : StaticImport; // Optional field
}

const User = models.User || model("User", UserSchema);

export default User;