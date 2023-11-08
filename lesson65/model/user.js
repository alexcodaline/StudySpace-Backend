import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: String,
    status: String,
    age: Number,
    link: String,
})

const User = mongoose.model('user', userSchema);

export {User};
