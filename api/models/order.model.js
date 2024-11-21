import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true, // The consumer who placed the order
    },
    gigs:[{
      type:Schema.Types.ObjectId,
       ref:"Gig",
       default:[]
    },]
    ,
    totalAmount: {
        type: Number,
      
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending', // Status of the order
    },
}, {
    timestamps: true,
});

export default mongoose.model("order", orderSchema);
