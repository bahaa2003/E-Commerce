import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment:{
        type:String,
        required : [true , "review comment is required"],
        trim : true,
    }
  },
  { timestamps: true }
);
reviewSchema.pre(['find' , 'findOne'], function(){
  this.populate('user' , 'name');
})

export const reviewModel = mongoose.model("review", reviewSchema);
