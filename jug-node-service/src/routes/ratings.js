import express from 'express';
import { getAllRatings, createRating, getRatingById } from '../controllers/ratingController.js';

const router = express.Router();

router.get('/', getAllRatings);
router.post('/', createRating);
router.get('/:id', getRatingById);

export default router;
