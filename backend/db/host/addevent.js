const mongoose=require('mongoose')

const addevent = new mongoose.Schema({
    hostId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    hostName: { type: String, ref: "user" },
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    eventImage: { type: String, required: true },
    guests: [
      {
        guestName: { type: String },
        guestDescription: { type: String },
        guestImage: { type: String },
 
      },
    ],
  });
  
  module.exports=mongoose.model('events',addevent)