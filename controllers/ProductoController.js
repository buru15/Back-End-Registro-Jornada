import models from '../models';

export default {
    createProductoSimple: async(req, res, next) => {
        try {
            const reg = await models.SimpleProducto.create(req.body);
            res.status(200).send({
                message: "Producto simple anadido"
            });
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Producto"
            });
            next(e);
        }
    },
    createProductoTallaColor: async(req, res, next) => {
        try {
            const reg = await models.TallaColorProducto.create(req.body);
            res.status(200).send({
                message: "Producto con talla y color anadido"
            });
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Producto"
            });
            next(e);
        }
    },
    createProductConsumible: async(req, res, next) => {
        try {
            const reg = await models.EnvaseSaborProducto.create(req.body);
            res.status(200).send({
                message: "Producto consumible anadido"
            });
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Producto"
            });
            next(e);
        }
    },
    listProducts: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.ProductoModel.find({$or:[{'referencia': new RegExp(valor,'i')},{'nombre': new RegExp(valor,'i')}]});
            res.status(200).json(reg);
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Producto"
            });
            next(e);
        }
    },
    searchProduct: async(req, res, next) => {
        try {
            const reg = await models.ProductoModel.findOne({_id: req.query._id});
            if (!reg) {
                res.status(404).send({
                    message: "No existe registro"
                });
            }
            else {
                res.status(200).json(reg);
            }
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Producto"
            });
            next(e);
        }
    },
    updateProduct: async(req, res, next) => {
        try {
            // const reg = await models.ProductoModel.findByIdAndUpdate({_id: req.body._id}, {
            //     referencia: req.body.referencia,
            //     nombre: req.body.nombre,
            //     slug: req.body.slug,
            //     categoria: req.body.categoria,
            //     descripcion: req.body.descripcion,
            //     imagenDestacada: req.body.imagenDestacada,
            //     stock: stock + req.body.valor
            // });
            // const actual = await models.ProductoModel.findById({_id: req.body._id, "articulo.color": req.body.color});
            const reg = await models.TallaColorProducto.findByIdAndUpdate({_id: req.body._id, "articulo.color": req.body.color},
                    {
                    $set: {"articulo.$[].stock": req.body.nuevo}
                    },
            );
            res.status(200).send({
                message: "Producto actualizado"
            });
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Producto"
            });
            next(e);
        }
    },
    activateProduct: async(req, res, next) => {
        try {
            const reg = await models.ProductoModel.findByIdAndUpdate({_id: req.body._id}, {estado: 1});
            res.status(200).json(reg);
        }
        catch(e) {
            res.status(500).send({
                message: "Ocurrio un error"
            });
            next(e);
        }
    },
    deactivateProduct: async(req, res, next) => {
        try {
            const reg = await models.ProductoModel.findByIdAndUpdate({_id: req.body._id}, {estado: 0});
            res.status(200).json(reg);
        }
        catch(e) {
            res.status(500).send({
                message: "Ocurrio un error"
            });
            next(e);
        }
    }
}