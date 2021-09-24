import models from '../models';

export default {
    newCategory: async(req, res, next) => {
        try {
            const reg = await models.CategoriaModel.create(req.body);
            res.status(200).send({
                message: "Categoria anadida"
            });
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Categoria"
            });
            next(e);
        }
    },
    listCategories: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.CategoriaModel.find({$or:[{'referencia': new RegExp(valor,'i')},{'nombre': new RegExp(valor,'i')}]});
            res.status(200).json(reg);
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Categoria"
            });
            next(e);
        }
    },
    searchCategory: async(req, res, next) => {
        try {
            const reg = await models.CategoriaModel.findOne({_id: req.query._id});
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
                message: "Error en Controler Categoria"
            });
            next(e);
        }
    },
    updateCategory: async(req, res, next) => {
        try {
            const reg = await models.CategoriaModel.findByIdAndUpdate({_id: req.body._id}, {
                referencia: req.body.referencia,
                nombre: req.body.nombre,
                slug: req.body.slug,
                categoriaPadre: req.body.categoriaPadre,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen,
            });
            res.status(200).send({
                message: "Categoria actualizada"
            });
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Categoria"
            });
            next(e);
        }
    },
    activateCategory: async(req, res, next) => {
        try {
            const reg = await models.CategoriaModel.findByIdAndUpdate({_id: req.body._id}, {estado: 1});
            res.status(200).json(reg);
        }
        catch(e) {
            res.status(500).send({
                message: "Ocurrio un error"
            });
            next(e);
        }
    },
    deactivateCategory: async(req, res, next) => {
        try {
            const reg = await models.CategoriaModel.findByIdAndUpdate({_id: req.body._id}, {estado: 0});
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