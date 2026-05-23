import { Request, Response } from "express";
import { prisma } from "../lib/db";

export const getPembicara = async (req: Request, res: Response) => {
    try {
        const allPembicara = await prisma.pembicara.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.json(allPembicara);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const createPembicara = async (req: Request, res: Response) => {
    try {
        const { name, role } = req.body;
        if (!name || !role) {
            return res.status(400).json({ message: 'data harus diisi' });
        }
        const newPembicara = await prisma.pembicara.create({
            data: { name, role }
        });
        res.status(201).json(newPembicara);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const getPembicaraById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const pembicara = await prisma.pembicara.findUnique({ where: { id } });
        if (!pembicara) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }
        res.json(pembicara);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const updatePembicara = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const { name, role } = req.body;
        if (!name || !role) {
            return res.status(400).json({ message: 'data harus diisi' });
        }
        const existing = await prisma.pembicara.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }
        const updated = await prisma.pembicara.update({
            where: { id },
            data: { name, role }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const deletePembicara = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const existing = await prisma.pembicara.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }
        // gaya teman kamu — findFirst
        const eventTerkait = await prisma.event.findFirst({
            where: { pembicaraId: id }
        });
        if (eventTerkait) {
            return res.status(400).json({ message: "Pembicara tidak bisa dihapus karena masih dipakai oleh event" });
        }
        await prisma.pembicara.delete({ where: { id } });
        res.json({ message: "Pembicara berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};