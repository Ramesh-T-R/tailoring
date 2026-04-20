import express from 'express';
import { 
  getDesignCategories, 
  createDesignCategory, 
  updateDesignCategory, 
  deleteDesignCategory 
} from '../controllers/designCategoryController';

const router = express.Router();

router.get('/', getDesignCategories);
router.post('/', createDesignCategory);
router.put('/:id', updateDesignCategory);
router.delete('/:id', deleteDesignCategory);

export default router;
