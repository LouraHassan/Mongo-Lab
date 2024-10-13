import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
},
    {timestamps: true}
)

const User = mongoose.model("User", userSchema)

export default User