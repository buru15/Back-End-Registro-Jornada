import routerx from 'express-promise-router';
import categoriaController from '../controllers/CategoriaController';

const router = routerx();

router.post('/newCategory', categoriaController.newCategory);
router.get('/listCategories', categoriaController.listCategories);
router.get('/searchCategory', categoriaController.searchCategory);
router.put('/updateCategory', categoriaController.updateCategory);
router.put('/activateCategory', categoriaController.activateCategory);
router.put('/deactivateCategory', categoriaController.deactivateCategory);


export default router;
