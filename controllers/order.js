import Order from "../models/Order.js";


export const createOrder = async (req, res, next) => {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      next(err);
    }
  };

export const editOrder = async (req,res,next)=>{
    try{
        const updateOrder = await Order.findByIdAndUpdate
        (req.params.id, {$set:req.body},{new:true})
        res.status(200).json(updateOrder);
    }catch(err){
        next(err);
    }
}

export const deleteOrder = async(req,res,next)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    }catch(err){
        next(err);
    }
}

export const viewOrder = async(req,res,next)=>{
    try{
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    }catch(err){
        next(err);
    }
}

export const orderList = async(req,res,next)=>{
    try{
        const orders = await Order.find(req.query);
        res.status(200).json(orders);
    }catch(err){
        next(err);
    }
}