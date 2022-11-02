import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})

export default mongoose.model("Order",OrderSchema);