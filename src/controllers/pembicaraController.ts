import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara";

let pembicara: Pembicara[] = [];

export const getPembicara = (req: Request, res: Response) => {
    res.json(pembicara);
};
export const createPembicara = (req: Request, res: Response) => {
    const { name, topic } = req.body;

    if (!name || !topic) {
        return res.status(500).json({ message: 'data harus diisi' });
    }
    const newPembicara: Pembicara = {
        id: Date.now(),
        name: name,
        topic: topic,
    };
    pembicara.push(newPembicara);
    res.status(201).json(newPembicara);
};
export const getPembicaraById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pembicaraById = pembicara.find(p => p.id === id);

    if (!pembicaraById) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }
    res.json(pembicaraById);
};
export const updatePembicara = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pembicaraById = pembicara.find(p => p.id === Number(id));
    if (!pembicaraById) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }
    const { name, topic } = req.body;
    if (!name || !topic) {
        return res.status(500).json({ message: 'data harus diisi' });
    }
    pembicaraById.name = name;
    pembicaraById.topic = topic;
    res.json(pembicaraById);
};
export const deletePembicara = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pembicaraIndex = pembicara.findIndex(p => p.id === id);

    if (pembicaraIndex === -1) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }
    pembicara.splice(pembicaraIndex, 1);
    res.json({ message: "Pembicara berhasil dihapus" });
};