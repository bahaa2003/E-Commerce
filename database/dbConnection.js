import  mongoose  from "mongoose";

export const dbConnection = () => {
    mongoose.connect("mongodb+srv://bahaamohammed:BahaaMo@cluster0.o5vuw.mongodb.net/E-Commerce_One").then( () => {
      console.log("Connected to MongoDB");
    }).catch((error)=>{
      console.log("Connection failed to connect to MongoDB  with error")
    })
  };