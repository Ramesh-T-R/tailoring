import { Router } from 'express';
import { 
  getMeasurementTypes, 
  createMeasurementType, 
  updateMeasurementType, 
  deleteMeasurementType 
} from '../controllers/measurementTypeController';

const router = Router();

router.get('/', getMeasurementTypes);
router.post('/', createMeasurementType);
router.put('/:id', updateMeasurementType);
router.delete('/:id', deleteMeasurementType);

export default router;
