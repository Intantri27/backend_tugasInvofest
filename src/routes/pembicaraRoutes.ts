import {
    getPembicara, createPembicara, getPembicaraById, updatePembicara, deletePembicara
} from "../controllers/pembicaraController";

import express from "express";

const router = express.Router();
router.get('/', getPembicara);
router.post('/', createPembicara);
router.get('/:id', getPembicaraById);
router.put('/:id', updatePembicara);
router.delete('/:id', deletePembicara);

export default router;