import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";

export const deleteOne = (model)=>{
    return catchError(async (req, res , next) => {
    const { id } = req.params;
    let result = await model.findByIdAndDelete(id);
    !result && next(new AppError("document not found",404));
    result && res.json({ message: "success", result });
  });}