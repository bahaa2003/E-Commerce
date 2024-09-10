import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
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
    image: String,
  },
  { timestamps: true }
);

categorySchema.post('init',(doc)=>{
  doc.image = process.env.IMG_URL + 'category/' + doc.image;
})

export const CategoryModel = mongoose.model("Category", categorySchema);
