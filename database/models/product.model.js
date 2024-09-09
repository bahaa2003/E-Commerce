import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
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
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be greater than or equal to 0"],
    },
    priceAfterDiscount: {
      type: Number,
      min: [0, "Discounted price must be greater than or equal to 0"],
    },
    ratingAvg: {
      type: Number,
      min: [0, "Rating must be greater than or equal to 0"],
      max: [5, "Rating must be less than or equal to 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: [0, "Number of ratings must be greater than or equal to 0"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [5, "Too short description"],
      maxlength: [500, "Too long description"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Quantity must be greater than or equal to 0"],
    },
    sold: {
      type: Number,
      default: 0,
      min: [0, "Sold quantity must be greater than or equal to 0"],
    },
    images: [String],
    imgCover: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category is required"],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: [true, "sub category is required"],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "brand is required"],
    },
  },
  { timestamps: true  , toJSON: { virtuals: true } , toObject: { virtuals: true }}
);

productSchema.post("init", (doc) => {
  doc.imgCover = process.env.BASE_URL + "product/" + doc.imgCover;
  doc.images = doc.images.map((path => process.env.BASE_URL + "product/" + path));
});

productSchema.virtual('myReviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'product',
});

productSchema.pre(['find' , 'findOne'], function(){
  this.populate('myReviews');
})

export const productModel = mongoose.model("Product", productSchema);
