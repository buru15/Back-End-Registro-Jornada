import mongoose, {mongo, Schema} from 'mongoose';

// Generamos las opciones que debe tener, discriminadorr para buscar por tipo y colleccion para guardarlos en una misma coleccion
// permitiendonos de buscar dentro de esa coleccion.
const productoOptions = {
    discriminatorKey: 'kind',
    collection: 'productos',
};

const productoSchema = new Schema({
    nombre: {
        type: String,
        maxlength: 50,
        required: true
    },
    descripcion: {
        type: String,
    },
    referencia: {
        type: String,
        unique: true,
    },
    imagenDestacada: {
        type: String,
        default: "Sin imagen"
    },
    categoria: {
        type: Schema.ObjectId,
        ref:'CategoriaModel'
    },
    marca: {
        type: String,
        maxlength: 50
    },
    modelo: {
        type: String,
    },
    numSerie: {
        type: String,
    },
    // localizacion: {},
    genero: {
        type: String,
    },
    estado: {
        type: Number,
        default: 1
    },
}, productoOptions);    // Pasamos las options que tendra la base.

const ProductoModel = mongoose.model('productoModel', productoSchema);

export default ProductoModel;
