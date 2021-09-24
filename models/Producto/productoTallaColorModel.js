import mongoose, {mongo, Schema} from 'mongoose';
import ProductoModel from "./productoModel";


const TallaColorProducto = ProductoModel.discriminator('TallaColorProducto', new Schema ({
    articulo:[{
        color: {
            type: String,
            default: 'Unico'
        },
        talla: {
            type: String,
            default: 'Unica'
        },
        stock: {
            type: Number,
            required: true,
        },
        precio: {
            type: Number,
        },
        precioOferta: {
            type: Number,
        }
    }]
}));

module.exports = mongoose.model('TallaColorProducto');