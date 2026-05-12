import { Request, Response } from 'express';
import { Category } from '../types/category';

let categories: Category[] = [];

export const getCategories = (req: Request, res: Response) => {
    res.json(categories);
};
export const createCategories = (req: Request, res: Response) => {
    const { name } = req.body;
    
        if (!name) {
            return res.status(500).json({ message: 'data harus diisi' });
        }
        const newCategory: Category = {
            id: Date.now(),
            name: name,
        };
        categories.push(newCategory);
        res.status(201).json(newCategory);
};
export const getCategoryById = (req: Request, res: Response) => {
    const { id } = req.params;
    const category = categories.find(c => c.id === Number(id));
    if (!category) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }
    res.json(category);
};
export const updateCategories = (req: Request, res: Response) => {
    const { id } = req.params;
    const category = categories.find(c => c.id === Number(id));
    if (!category) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }
    const { name } = req.body;
    if (!name) {
        return res.status(500).json({ message: 'data harus diisi' });
    }
    category.name = name;
    res.json(category);
};
export const deleteCategories = (req: Request, res: Response) => {
    const { id } = req.params;
    const categoryIndex = categories.findIndex(c => c.id === Number(id));
    if (categoryIndex === -1) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }
    categories.splice(categoryIndex, 1);
    res.json({ message: "Category berhasil dihapus" });
};