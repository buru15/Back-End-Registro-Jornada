import routerx from 'express-promise-router';
import ProductoController from '../controllers/ProductoController';

const router = routerx();

router.post('/createProductoSimple', ProductoController.createProductoSimple);
router.post('/createProductoTallaColor', ProductoController.createProductoTallaColor);
router.post('/createProductConsumible', ProductoController.createProductConsumible);
router.get('/listProducts', ProductoController.listProducts);
router.get('/searchProduct', ProductoController.searchProduct);
router.put('/updateProduct', ProductoController.updateProduct);
router.put('/activateProduct', ProductoController.activateProduct);
router.put('/deactivateProduct', ProductoController.deactivateProduct);


export default router;
