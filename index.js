import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';

// Conexion a la base de datos
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbBackWelnesia';
mongoose.connect(dbUrl, {
    useCreateIndex: true,
    userNewUrlParser: true
})
.then()
.catch( err => console(err));

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Indicamos que cuando se entre por /api se dirija al router
app.use('/api', router);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});