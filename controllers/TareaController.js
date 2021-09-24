import models from '../models';
import { addHours, compareAsc,addWeeks, addMonths, addDays, addYears } from 'date-fns';

export default {
    createTask: async(req, res, next) => {
        try {
            var dateInit = (req.body.fechaInicio ? new Date(req.body.fechaInicio) : null);
            var dateEnd = (req.body.fechaFin ? new Date(req.body.fechaFin) : null);
            // Cuanto se quiere sumar 
            let frecQt = req.body.frecuenciaCantidad;
            // Parametro para indicar por que tipo se quiere sumar
            let frecTp = req.body.frecuenciaTipo;
            // Si no existe ni fecha inicio ni final entonces directamente no instanciara nada.
            if (dateInit && dateEnd) {
                req.body.fechaTarea = dateInit; // Defino para igualar en la primera instancia
                // Bucle compara fecha inicio y fecha fin. Mientras dateInit menor seguira instanciando
                while (compareAsc(dateInit, dateEnd) == -1) {
                    const reg = await models.TareaModel.create(req.body);
                    // Switch con parametro tipo y usar metodo adecuado
                    switch (frecTp) {
                        case "hora":
                            dateInit = addHours(dateInit, frecQt);
                        case "dia":
                            dateInit = addDays(dateInit, frecQt);
                            break;
                        case "semana":
                            dateInit = addWeeks(dateInit, frecQt);
                            break;
                        case "mes":
                            dateInit = addMonths(dateInit, frecQt);
                            break;
                        case "ano":
                            dateInit = addYears(dateInit, frecQt);
                            break;
                    }
                    req.body.fechaTarea = dateInit;
                };
                res.status(200).send({
                    message: "Tareas anadidas"
                });
            }
            else {
                const reg = await models.TareaModel.create(req.body);
                res.status(200).send({
                    message: "Tarea anadida"
                });
            }
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controler Mantenimiento"
            });
            next(e);
        }
    },
    listTasks: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.TareaModel.find({'nombreTarea': new RegExp(valor,'i')});
            res.status(200).json(reg);
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controller Mantenimiento"
            });
            next(e);
        }
    },
    searchTask: async(req, res, next) => {
        try {
            const reg = await models.TareaModel.findOne({_id: req.query._id});
            if (!reg) {
                res.status(404).send({
                    message: "No existe registro"
                });
            }
            else {
                res.status(200).json(reg);
            }
        }
        catch(e) {            // let frecTp = req.body.frecuenciaTipo;
            // // let m = moment();
            // // let myDate = req.body.fechaInicio;
            // let day = moment("2021-09-03");
            next(e);
        }
    },
    updateTask: async(req, res, next) => {
        try {
            const reg = await models.TareaModel.findByIdAndUpdate({_id: req.body._id}, {
                nombreTarea: req.body.nombreTarea,
                // frecuencia: req.body.frecuencia,
                equipoResponsable: req.body.equipoResponsable,
                tareaSolucion: req.body.tareaSolucion,
                realizado: req.body.realizado,
                resultadoTarea: req.body.resultadoTarea,
                maquina: req.body.maquina,
                zona: req.body.zona,
                tipoTarea: req.body.tipoTarea,

            });
            res.status(200).send({
                message: "Tarea actualizada"
            });
        }
        catch(e) {
            res.status(500).send({
                message: "Error en Controller Mantenimiento"
            });
            next(e);
        }
    },
    activateTask: async(req, res, next) => {
        try {
            const reg = await models.TareaModel.findByIdAndUpdate({_id: req.body._id}, {estado: 1});
            res.status(200).json(reg);
        }
        catch(e) {
            res.status(500).send({
                message: "Ocurrio un error"
            });
            next(e);
        }
    },
    deactivateTask: async(req, res, next) => {
        try {
            const reg = await models.TareaModel.findByIdAndUpdate({_id: req.body._id}, {estado: 0});
            res.status(200).json(reg);
        }
        catch(e) {
            res.status(500).send({
                message: "Ocurrio un error"
            });
            next(e);
        }
    },
    /* 
        Metodos de Modelos frecuencia    
    */
}