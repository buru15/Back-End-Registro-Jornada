import mongoose, {mongo, Schema} from 'mongoose';
import ProductoModel from "./productoModel";


const EnvaseSaborProducto = ProductoModel.discriminator('EnvaseSaborProducto', new Schema ({
    articulo:[{
        sabor: {
            type: String,
            default: 'Unico'
        },
        envase: {
            type: String,
            default: 'Unico'
        },
        stock: {
            type: Number,
            required: true,
        },
        precio: {
            type: Number,
        }
    }]
}));

module.exports = mongoose.model('EnvaseSaborProducto');