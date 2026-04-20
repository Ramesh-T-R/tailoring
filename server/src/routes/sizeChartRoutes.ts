import { Router } from 'express';
import { getSizeTypes } from '../controllers/sizeTypeController';
import { getSizeCharts, createSizeChart, updateSizeChart, deleteSizeChart, getSizeChartById } from '../controllers/sizeChartController';

const router = Router();

router.get('/types', getSizeTypes);
router.get('/charts', getSizeCharts);
router.get('/charts/:id', getSizeChartById);
router.post('/charts', createSizeChart);
router.put('/charts/:id', updateSizeChart);
router.delete('/charts/:id', deleteSizeChart);

export default router;
