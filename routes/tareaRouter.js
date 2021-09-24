import routerx from 'express-promise-router';
import TareaController from '../controllers/TareaController';

const router = routerx();

router.post('/createTask', TareaController.createTask);
router.get('/listTasks', TareaController.listTasks);
router.get('/searchTask', TareaController.searchTask);
router.put('/updateTask', TareaController.updateTask);
router.put('/activateTask', TareaController.activateTask);
router.put('/deactivateTask', TareaController.deactivateTask);

export default router;
