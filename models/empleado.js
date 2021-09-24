import mongoose, {Schema} from 'mongoose';

const EmpleadoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    dni: {
        type: String,
        required: true,
        unique: true,
    },
    // Campo control tipo jornada (manana, tarde, completo, vacaciones, baja etc)
    tipoJornada: {
        type: String,
    },
    // Campo para controlar si ha fichado, pausa o ido
    estadoTurno: {
        type: String,
        default: "Fuera"
    },
    departamento: {
        type: String,
    },
    registroHoras:[{
        fecha: {
            type: String,
            default: null
        },
        dia: {
            type: String,
        },
        mes: {
            type: String,
        },
        ano: {
            type: String,
        },
        entrada: {
            type: Date,
            default: null
        },
        salida: {
            type: Date,
            default: null
        },
        pausa: {
            type: String,
            default: null
        },
        vueltaPausa: {
            type: String,
            default: null
        },
        comida: {
            type: String,
            default: null
        },
        vueltaComida: {
            type: String,
            default: null
        },
        horas: {
            type: Number,
            default: null
        },
        tipoDeJornada: {
            type: Number,
            default: null
        }
    }]
    
    
});

const EmpleadoModel = mongoose.model('empleadoModel', EmpleadoSchema);
export default EmpleadoModel;