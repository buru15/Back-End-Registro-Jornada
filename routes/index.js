import routerx from 'express-promise-router';
import categoriaRouter from './categoriaRouter';
import productoRouter from './productoRouter';
import tareaRouter from "./tareaRouter";
import empleadoRouter from "./empleadoRouter";
import registroRouter from "./registroRouter";


const router = routerx();

router.use('/category', categoriaRouter);
router.use('/product', productoRouter);
router.use('/task', tareaRouter);
router.use('/empleado', empleadoRouter);
router.use('/registroJ', registroRouter);

export default router;