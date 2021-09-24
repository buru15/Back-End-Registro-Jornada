import mongoose, {Schema} from 'mongoose';
import nodemon from 'nodemon';

const TareaSchema = new Schema({
    nombreTarea: {
        type: String,
        required: true,
    },
    // frecuencia: {
    //     type: Schema.ObjectId,
    //     ref:'frecuenciaModel'
    // },
    // Parametro para pasar a la libreria Moments y decirle que tipo vamos a sumarle ej days weeks etc
    frecuenciaTipo: {
        type: String,
        default: null,
    },
    // Cantidad del parametro arriba que queremos sumar
    frecuenciaCantidad: {
        type: Number,
        default: null
    },
    equipoResponsable:{
        type: String,
    },
    realizado:{
        type: Boolean,
        default: false
    },
    resultadoTarea:{
        type: String,
    },
    parametros: {
        type: String,
        default: "Sin parametros"
    },
    tareaSolucion: {
        type: String,
        default: "No necesita tarea extra"
    },
    maquina: { 
        type: String
    }, 
    zona: {
        type: String
    },
    tipoTarea: {
        type: String,
    },
    estado: {
        type: Number,
        default: 1
    },
    fechaTarea: {
        type: Date,
        required: true,
    },
    fechaInicio: {
        type: Date,
        default: null,
    },
    fechaFin: {
        type: Date,
        default: null,
    }
});

const TareaModel = mongoose.model('tareaModel', TareaSchema);
export default TareaModel;