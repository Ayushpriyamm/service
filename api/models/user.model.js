import mongoose from 'mongoose';
const { Schema } = mongoose;
const phoneRegex = /^[+]*[0-9]{1,4}[.\s-]?([0-9]{1,4}[.\s-]?){2,4}$/;
const userSchema = new Schema({
  username: {
    type: String,
    required: true, 
    unique: true,
  },
  email: {
    type: String,
    required: true, 
    unique: true,
  },
  password: {
    type: String,
    required: true, 
  },
  img: {
    type: String, // Store URL
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: [phoneRegex, 'Please enter a valid phone number'],
  },
  desc: {
    type: String,
    required: false,
  },
  isSeller: {
    type: Boolean,
    default: false,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model("User", userSchema);
