import {
    getCategories,
    createCategories,
    getCategoryById,
    updateCategories,
    deleteCategories
} from '../controllers/categoryController';

import express from "express";

const router = express.Router();
router.get('/', getCategories);
router.post('/', createCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategories);
router.delete('/:id', deleteCategories);

export default router;