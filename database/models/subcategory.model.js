import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema(
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
    category :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }
  },
  { timestamps: true }
);

export const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);
