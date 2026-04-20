import { Router } from 'express';
import { getDressTypes, createDressType } from '../controllers/dressTypeController';

const router = Router();

router.get('/', getDressTypes);
router.post('/', createDressType);

export default router;
