import { Router } from 'express';
import {
  listDolls,
  createDoll,
  updateDoll,
  deleteDoll,
  getDollById,
} from './dollsController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';

import { createDollSchema, updateDollSchema } from '../../db/dollsSchema.js';
import { verifySeller, verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

router.get('/', listDolls);
router.get('/:id', getDollById);
router.post(
  '/',
  verifyToken,
  verifySeller,
  validateData(createDollSchema),
  createDoll
);
router.put(
  '/:id',
  verifyToken,
  verifySeller,
  validateData(updateDollSchema),
  updateDoll
);
router.delete('/:id', verifyToken, verifySeller, deleteDoll);

export default router;
