import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "name is required"],
      trim: true,
      minlength: [2, "Too short category name"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    logo: String,
  },
  { timestamps: true }
);

brandSchema.post('init',(doc)=>{
  doc.logo = process.env.IMG_URL + 'brand/' + doc.logo;
})

export const BrandModel = mongoose.model("Brand", brandSchema);
