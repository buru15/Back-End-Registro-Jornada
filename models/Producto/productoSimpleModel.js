import mongoose, {mongo, Schema} from 'mongoose';
import ProductoModel from "./productoModel";


const SimpleProducto = ProductoModel.discriminator('SimpleProducto', new Schema ({
    precio:{
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    precioOferta: {
        type: Number
    }
}));

module.exports = mongoose.model('SimpleProducto');
