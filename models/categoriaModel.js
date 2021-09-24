import mongoose, {mongo, Schema} from 'mongoose';

const categoriaSchema = new Schema({
    referencia: {
        type: String,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        maxlength: 50,
        required: true
    },
    slug: {
        type: String,
        maxlength: 50
    },
    categoriaPadre: {
        // Tipo al que hace referencia. En este caso hace referencia al Object ID de categoria
        // type: mongoose.Schema.Types.ObjectId,
        type: mongoose.Schema.Types.ObjectId,
        ref:'CategoriaModel'
    },
    descripcion: {
        type: String,
        maxlength: 250,
        required: true
    },
    imagen: {
        type: String,
        default: 'Sin Imagen'
    },
    estado: {
        type: Number,
        default: 1
    },
});

categoriaSchema.virtual('children', {
    ref: 'CategoriaModel',
    localField: '_id', // Campo que busca para coger datos y ponerlo
    foreignField: 'categoriaPadre'
});

const CategoriaModel = mongoose.model('categoriaModel', categoriaSchema);

export default CategoriaModel;