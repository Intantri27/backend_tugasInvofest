import { Request, Response } from 'express';
import { Event } from '../types/event';

let events: Event[] = [];

export const getEvents = (req: Request, res: Response) => {
    res.json(events);
};
export const createEvent = (req: Request, res: Response) => {
    const { name, categoryId, tanggal, description } = req.body;

    if (!name || !categoryId || !tanggal) {
        return res.status(500).json({ message: 'data harus diisi' });
    }
    const newEvent: Event = {
        id: Date.now(),
        name: name,
        categoryId: categoryId,
        tanggal: new Date(tanggal),
        description: description,
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
};
export const getEventById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const event = events.find(e => e.id === id);
    //jika data tdk ada
    if (!event) {
        return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    //jika data ada
    res.json(event);
};
export const updateEvent = (req: Request, res: Response) => {
};
export const deleteEvent = (req: Request, res: Response) => {
};