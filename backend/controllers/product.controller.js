import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createProduct = async (req, res) => {
    const productPayload = req.body;

    if (!productPayload?.name || !productPayload?.price || !productPayload?.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(productPayload);

    try {
        await newProduct.save();
        return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error('Error creating product', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatePayload = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Product ID' });
    }

    try {
        const updated = await Product.findByIdAndUpdate(id, updatePayload, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        console.error('Error updating product', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        return res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};