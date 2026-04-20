import express from 'express';
import { 
  getDesigns, 
  createDesign, 
  updateDesign, 
  deleteDesign 
} from '../controllers/designController';

const router = express.Router();

router.get('/', getDesigns);
router.post('/', createDesign);
router.put('/:id', updateDesign);
router.delete('/:id', deleteDesign);

export default router;
