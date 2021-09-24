import models from '../models';
import { format, differenceInHours, differenceInMinutes } from 'date-fns';
import { id } from 'date-fns/locale';


async function diferenciaHoras(idEmp, fichado, leaving) {
    let diff = await models.EmpleadoModel.find(
        {
            _id: idEmp
        }, { registroHoras: {$elemMatch: {mes: fichado}}, joined: 1}
    );
    console.log(diff)
    let horasTot = differenceInMinutes(leaving, new Date(diff[0].registroHoras[0].entrada));
    console.log(horasTot);
    return horasTot;
}


export default {
    newEmpleado: async(req, res, next) => {
        try {
            const reg = await models.EmpleadoModel.create(req.body);
            res.status(200).send({
                message: "Empleado anadido"
            });
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Empleado"
            });
            next(e);
        }
    },
    listEmpleados: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.EmpleadoModel.find({$or:[{'dni': new RegExp(valor,'i')},{'nombre': new RegExp(valor,'i')}]});
            console.log(reg[0].registroHoras)
            res.status(200).json(reg);
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Empleado"
            });
            next(e);
        }
    },
    fichar: async(req, res, next) => {
        try {
            var defecto = {
                "entrada": new Date,
            }
            const reg = await models.EmpleadoModel.findByIdAndUpdate({_id: req.body._id, defecto},
                {estadoTurno: "Fichado",
                "$push":{registroHoras: defecto },
                },
            );
            console.log(defecto)
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
                message: "Error en Controler Empleado"
            });
            next(e);
        }
    },
    fichar2: async(req, res, next) => {
        try {
            let reg = await models.EmpleadoModel.findOne({_id: req.body._id});
            if (reg.registroHoras.length == 0) {
                var defecto = {
                    "entrada": new Date,
                }
                const reg = await models.EmpleadoModel.findByIdAndUpdate({_id: req.body._id, defecto},
                    {
                    "$push":{registroHoras: defecto },
                    },
                    // {"$currentDate": {fecha: true}}
                );
                res.status(200).send({
                    message: "Array vacio"
                });
            }
            else {
                const reg = await models.EmpleadoModel.findByIdAndUpdate({_id: req.body._id, "registroHoras.entrada": req.body.fecha1, defecto},
                    {
                    // "$push":{registroHoras: defecto },
                    $set: {"registroHoras.$[].fecha": "Dia siguiente"}
                    },
                    // { arrayFilters: [ {fecha}]}
                    // {"$currentDate": {fecha: true}}
                );
                console.log(req.body.fecha1),
                res.status(200).send({
                    message: "Estoy fichando por segunda vez"
                });
            }
            // reg = await models.EmpleadoModel.findByIdAndUpdate({_id: req.body._id, defecto},
            //     {estadoTurno: "Fichado",
            //     "$push":{registroHoras: defecto },
            //     },
            //     // {"$currentDate": {fecha: true}}
            // );
            // if (!reg) {
            //     res.status(404).send({
            //         message: "No existe registro"
            //     });
            // }
            // else {
            //     res.status(200).json(reg);
            // }
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Empleado"
            });
            next(e);
        }
    },
    fichar3: async(req, res, next) => {
        try {
            let presente = new Date;
            var defecto = {
                "entrada": presente,
                "dia": format(presente, 'd'),
                "mes": format(presente, 'MMM'),
                "ano": format(presente, 'uuuu'),
                "tipoDeJornada": "Laboral",
            }
            const reg = await models.EmpleadoModel.findByIdAndUpdate({_id: req.body._id, defecto},
                {estadoTurno: "Fichado",
                "$push":{registroHoras: defecto },
                },
            );
            console.log(defecto)
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
                message: "Error en Controler Empleado"
            });
            next(e);
        }
    },
    salida: async(req, res, next) => {
        try {
            let presente = new Date;
            console.log(presente)
            let minutos = diferenciaHoras(req.body._id, req.body.fecha1, presente)
            console.log(minutos);
            const reg = await models.EmpleadoModel.updateOne({_id: req.body._id, "registroHoras.entrada": req.body.fecha2},
                    {
                        $set: {"registroHoras.$.salida": presente,"registroHoras.$.horas": parseInt(minutos)}
                    },
                );
                console.log(req.body.fecha1),
                res.status(200).send({
                    message: "Estoy fichando por segunda vez"
                });
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Empleado"
            });
            next(e);
        }
    },
    searchCategory: async(req, res, next) => {
        try {
            const reg = await models.EmpleadoModel.findOne({_id: req.query._id});
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
                message: "Error en Controler Empleado"
            });
            next(e);
        }
    },
    updateCategory: async(req, res, next) => {
        try {
            const reg = await models.EmpleadoModel.findByIdAndUpdate({_id: req.body._id}, {
                referencia: req.body.referencia,
                nombre: req.body.nombre,
                slug: req.body.slug,
                categoriaPadre: req.body.categoriaPadre,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen,
            });
            res.status(200).send({
                message: "Empleado actualizado"
            });
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Empleado"
            });
            next(e);
        }
    },
    activateCategory: async(req, res, next) => {
        try {
            const reg = await models.EmpleadoModel.findByIdAndUpdate({_id: req.body._id}, {estado: 1});
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
            const reg = await models.EmpleadoModel.findByIdAndUpdate({_id: req.body._id}, {estado: 0});
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