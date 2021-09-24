import routerx from 'express-promise-router';
import empleadoController from '../controllers/EmpleadoController';

const router = routerx();

router.post('/newEmpleado', empleadoController.newEmpleado);
router.get('/listEmpleados', empleadoController.listEmpleados);
router.put('/fichar', empleadoController.fichar);
router.put('/fichar2', empleadoController.fichar2);
router.put('/fichar3', empleadoController.fichar3);
router.put('/salida', empleadoController.salida);

export default router;
