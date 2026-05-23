import { Request, Response } from 'express';
import { prisma } from '../lib/db';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const allCategory = await prisma.category.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.json(allCategory);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const createCategories = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'data harus diisi' });
        }
        const newCategory = await prisma.category.create({
            data: { name }
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const category = await prisma.category.findUnique({ where: { id } });
        if (!category) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const updateCategories = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'data harus diisi' });
        }
        const existing = await prisma.category.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }
        const updated = await prisma.category.update({
            where: { id },
            data: { name }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const deleteCategories = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const existing = await prisma.category.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }
        // gaya teman kamu — findFirst
        const eventTerkait = await prisma.event.findFirst({
            where: { categoryId: id }
        });
        if (eventTerkait) {
            return res.status(400).json({ message: "Category tidak bisa dihapus karena masih dipakai oleh event" });
        }
        await prisma.category.delete({ where: { id } });
        res.json({ message: "Category berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};