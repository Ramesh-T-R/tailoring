import { Router } from 'express';
import { getDressTypes, createDressType, updateDressType, deleteDressType } from '../controllers/dressTypeController';

const router = Router();

router.get('/', getDressTypes);
router.post('/', createDressType);
router.put('/:id', updateDressType);
router.delete('/:id', deleteDressType);

export default router;
