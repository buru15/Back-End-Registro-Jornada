import routerx from 'express-promise-router';
import RegistroJornadaController from '../controllers/RegistroJornadaController';

const router = routerx();

router.post('/fichar', RegistroJornadaController.fichar);
router.get('/listar', RegistroJornadaController.listar);
router.put('/salida', RegistroJornadaController.salida);
router.post('/asignarVacaciones', RegistroJornadaController.asignarVacaciones);
router.put('/pausa', RegistroJornadaController.pausa);
router.put('/vuelta', RegistroJornadaController.vuelta);
router.get('/histEmpleado', RegistroJornadaController.histEmpleado);
router.get('/buscarDia', RegistroJornadaController.buscarDia);
router.get('/buscarVacacionesEmpleado', RegistroJornadaController.buscarVacacionesEmpleado);

export default router;