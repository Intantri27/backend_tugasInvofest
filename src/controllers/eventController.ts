import { Request, Response } from 'express';
import { prisma } from '../lib/db';

export const getEvents = async (req: Request, res: Response) => {
    try {
        const allEvent = await prisma.event.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                category: true,
                pembicara: true,
            }
        });
        res.json(allEvent);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, categoryId, pembicaraId, tanggal, description } = req.body;
        if (!name || !categoryId || !pembicaraId || !tanggal) {
            return res.status(400).json({ message: 'data harus diisi' });
        }
        const tanggalDate = new Date(tanggal);
        if (isNaN(tanggalDate.getTime())) {
            return res.status(400).json({ message: 'Format tanggal tidak valid' });
        }
        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId: Number(categoryId),
                pembicaraId: Number(pembicaraId),
                tanggal: tanggalDate,
                description,
            }
        });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                category: true,
                pembicara: true,
            }
        });
        if (!event) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const { name, categoryId, pembicaraId, tanggal, description } = req.body;
        if (!name || !categoryId || !pembicaraId || !tanggal) {
            return res.status(400).json({ message: 'data harus diisi' });
        }
        const tanggalDate = new Date(tanggal);
        if (isNaN(tanggalDate.getTime())) {
            return res.status(400).json({ message: 'Format tanggal tidak valid' });
        }
        const existing = await prisma.event.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }
        const updated = await prisma.event.update({
            where: { id },
            data: {
                name,
                categoryId: Number(categoryId),
                pembicaraId: Number(pembicaraId),
                tanggal: tanggalDate,
                description,
            }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const existing = await prisma.event.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }
        await prisma.event.delete({ where: { id } });
        res.json({ message: "Event berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};