import Joi from "joi";

export const createProductSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required(),
    category: Joi.string().required().hex().length(24),
    subCategory: Joi.string().required().hex().length(24),
    brand: Joi.string().required().hex().length(24),
    sold : Joi.number(),
    ratingAvg : Joi.number(),
    ratingCount : Joi.number(),
});

export const updateProductSchema = Joi.object({
    id: Joi.string().required().hex().length(24),
    title: Joi.string().min(3),
    description: Joi.string().min(10),
    price: Joi.number().min(1),
    quantity: Joi.number().min(1),
    category: Joi.string().hex().length(24),
    subCategory: Joi.string().hex().length(24),
    brand: Joi.string().hex().length(24),
    sold : Joi.number(),
    ratingAvg : Joi.number(),
    ratingCount : Joi.number(),
});

export const deleteProductSchema = Joi.object({
    id: Joi.string().required().hex().length(24),
});

export const getProductSchema = Joi.object({
    id: Joi.string().required().hex().length(24),
});