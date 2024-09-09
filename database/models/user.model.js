import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "name is shorter than"],
      maxLength: [20, "name is longer than"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "password is shorter than"],
    },
    passwordChangeAt: Date,
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verfied: {
      type: Boolean,
      default: false,
    },
    wishlist:[{type:mongoose.SchemaTypes.ObjectId , ref:"Product"}],
    addresses:[{
      city : String,
      street : String,
      phone: String,
    }],
    profilePic: String,
  },
  { timestamps: true }
);

userSchema.pre('save', function(){
  this.password = bcrypt.hashSync(this.password , 7);
})

userSchema.pre('findOneAndUpdate', function(){
  if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password , 7);
})

export const userModel = mongoose.model("User", userSchema);
