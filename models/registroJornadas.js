import mongoose, {mongo, Schema} from 'mongoose';

const registroJornadaSchema = new Schema({
    empleado: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'EmpleadoModel'
    },
    departamento: {
        type: String,
    },
    dni: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'EmpleadoModel'
    },
    estado:{
        type: String
    },
    fecha: {
        type: String,
    },
    entrada: {
        type: Date,
    },
    salida: {
        type: Date,
    },
    pausa: {
        type: Date,
    },
    comida: {
        type: Date,
    },
    vueltaPausa: {
        type: Date,
    },
    vueltaComida: {
        type: Date,
    },
    horas: {
        type: Number,
    },
    tipoJornada: {
        type: String,
    },
    duracionPausa: {
        type: Number,
    },
    duracionComida: {
        type: Number,
    }
});

registroJornadaSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const RegistroJornada = mongoose.model('RegistroJornada', registroJornadaSchema);

export default RegistroJornada;