import { request, response } from 'express';
import models from '../models';
import RegistroJornada from '../models/registroJornadas';
import { format, es, differenceInMinutes, startOfDay, endOfDay} from "date-fns"; // Tengo  que revisar para que funcione

export default {
    fichar: async(request, response) => {
        let presente = new Date;
        let presenteFormat = format(presente, 'P');
        let id = request.body.empleado;
        const registro = await RegistroJornada.findOne({
            $and: [
                {empleado: id},
                {fecha: presenteFormat}
            ]
        });
        if (!registro) {
            const regis = new RegistroJornada({
                entrada :presente,
                fecha: format(presente, 'P', {locale: es}),
                tipoJornada: "Laboral",
                empleado: request.body.empleado,
                departamento: request.body.departamento,
                dni: request.body.dni,
                estado: "trabajando"
            });

            regis.save().then(savedRegistro => {
                response.json(savedRegistro)
            })
        } else {
            
            response.status(404).send("Ya ha fichado");
        }
        
    },
    listar: (request, response) => {
        RegistroJornada.find().then( registro => {
            if(registro) {
                return response.json(registro)
            } else {
                response.status(404).end()
            }
        })
    },
    salida: async(request, response) => {
        let fecha = request.body.entrada;
        let id = request.body.empleado;
        let presente = new Date;
        let presenteFormat = format(presente, 'P');
        const registro = await RegistroJornada.findOne({
            $and: [
                {empleado: id},
                {fecha: presenteFormat}
            ]
        });
        if (registro) {
            if (registro.salida) {
                response.status(404).send('Ya has salido')
            } else if ((registro.pausa && !registro.vueltaPausa) || (registro.comida && !registro.vueltaComida)) {
                response.status(404).send('Sigues en la pausa')
            } 
            else {
                registro.salida = presente;
                let totalHoras = differenceInMinutes(registro.salida, registro.entrada) / 60;
                registro.horas = totalHoras;
                if (registro.duracionPausa != 0) {
                    registro.horas -= registro.duracionPausa
                };
                if (registro.duracionComida != 0) {
                    registro.horas -= registro.duracionComida
                }
                registro.estado = "fuera"
                registro.save();
                response.json(registro)
            }
        } else {
            response.status(404).send('Empleado no ha fichado')
        }
    },
    asignarVacaciones: async(request, response) => {

        let diasVac = request.body.dias;
        let instancias = [];

        

        diasVac.forEach(element => {
            let fechaBusqueda = format(new Date(element), 'P')

            const {busqueda} = RegistroJornada.findOne({
                $and: [
                    {empleado: request.body.empleado},
                    {fecha: fechaBusqueda}
                ]
            });
            console.log(busqueda)
            if (busqueda != fechaBusqueda ) {
                const registro = new RegistroJornada({
                    fecha: format(new Date(element), 'P', {locale: es}),
                    tipoJornada: "Vacaciones",
                    empleado: request.body.empleado,
                    departamento: request.body.departamento,
                    dni: request.body.dni,
                    horas: "0",
                    estado: "Vacaciones"
                });
                instancias.push(registro);
                console.log('no anato nada')
            }

            
        });
        console.log(instancias)
        if (instancias.length != 0) {
            const regis = await RegistroJornada.create(instancias);
            response.json(regis);
        } else {
            response.status(404).send('Ya existia')
        }

        // registro.save().then(savedRegistro => {
        //     response.json(savedRegistro)
        // })
    },
    pausa: async(request, response) => {
        let id = request.body.empleado;
        let tipoDescanso = request.body.tipoDescanso;
        let presente = new Date;
        let presenteFormat = format(presente, 'P');
        const registro = await RegistroJornada.findOne({
            $and: [
                {empleado: id},
                {fecha: presenteFormat}
            ]
        });
        if (registro) {
            if (tipoDescanso == "pausa") {
                if (registro.pausa) {
                    response.status(404).send('Ya estas en pausa')
                } else {
                    registro.pausa = presente;
                    registro.estado = "pausa"
                    registro.save();
                    response.json(registro);
                }
            } else if (tipoDescanso == "comida") {
                if (registro.comida) {
                    response.status(404).send('Ya estas en comida')
                } else {
                    registro.comida = presente;
                    registro.estado = "comida"
                    registro.save();
                    response.json(registro)
                }
            } else if (registro.pausa && registro.comida) {
                response.status(404).send('Ya has tomado todos los descansos posibles')
            }
        } else {
            response.status(404).send('Empleado no ha fichado')
        }
    },
    vuelta: async(request, response) => {
        let id = request.body.empleado;
        let presente = new Date;
        let presenteFormat = format(presente, 'P');
        const registro = await RegistroJornada.findOne({
            $and: [
                {empleado: id},
                {fecha: presenteFormat}
            ]
        });
        if (registro) {
            if (!registro.vueltaPausa && registro.pausa) {
                registro.vueltaPausa = presente;
                let totalHoras = differenceInMinutes(presente, registro.pausa) / 60;
                registro.duracionPausa = totalHoras;
                registro.estado = "trabajando";
                registro.save();
                response.status(200).send('Vuelta de la pausa');
            } else if (registro.comida && !registro.vueltaComida) {
                registro.vueltaComida = presente;
                let totalHoras = differenceInMinutes(presente, registro.comida) / 60;
                registro.duracionComida = totalHoras;
                registro.estado = "Trabajando";
                registro.save();
                response.status(200);
            }
        } else {
            response.status(404).send('Empleado no ha fichado')
        }
    },
    histEmpleado: async(request, response) => {
        let id = request.body.empleado;
        const registro = await RegistroJornada.find({
            empleado: id,
        });

        response.json(registro)

    },
    buscarDia: (request, response) => {
        let fecha = request.body.fecha;
        let presente = format(new Date, 'P');

        if (request.body.fecha) {
            RegistroJornada.find({
                fecha: fecha,
            }).then( registro =>  {response.json(registro)} );
        } else {
            RegistroJornada.find({
                fecha: presente,
            }).then( registro =>  {response.json(registro)} );
        }
    },
    filtrar: (request, response) => {
        let fechaInit = new Date(request.body.fecha1);
        let fechaEnd = new Date(request.body.fecha2);
        if(request.body.jornada) {
            let tipoBusqueda = "tipoJornada"
        }
        if(request.body.estado) {
            let tipoBusqueda = "estad"
        }
        if(request.body.empleado) {
            let tipoBusqueda = "empleado"
        }

        switch (tipoBusqueda) {
            case "tipoJornada":
                RegistroJornada.find({
                    $and: [{
                        entrada: {
                            $gte: startOfDay(fechaInit),
                            $lte: endOfDay(fechaEnd)
                        }
                    },
                    {tipoJornada: request.body.jornada}
                    ]
                }).then( registro =>  {response.json(registro)} );
                break;
            case "estado":
                RegistroJornada.find({
                    $and: [{
                        entrada: {
                            $gte: startOfDay(fechaInit),
                            $lte: endOfDay(fechaEnd)
                        }
                    },
                    {tipoJornada: request.body.estado}
                    ]
                }).then( registro =>  {response.json(registro)} );
                break;
            case "empleado":
                RegistroJornada.find({
                    $and: [{
                        entrada: {
                            $gte: startOfDay(fechaInit),
                            $lte: endOfDay(fechaEnd)
                        }
                    },
                    {tipoJornada: request.body.empleado}
                    ]
                }).then( registro =>  {response.json(registro)} );
                break;
        }
        
    },


    // Metodos de estadisticas
    // Funciona, solo hay que quitar el And y empleado
    // vacacionesEmpleado: (request, response) => {
    //     let fechaInit = request.body.fechaInit;
    //     let fechaEnd = request.body.fechaEnd;
        
    //     RegistroJornada.aggregate([{
    //         $match: {
                // $and: [{
                //     entrada: {
                //         $gte: startOfDay(new Date('2021-09-13')),
                //         $lte: endOfDay(new Date('2021-09-15'))
                //     }
                // },
                // empleado
                // ]
    //         }},
    //         {$group: {
    //             _id: '$entrada',
    //             count: {$sum: 1}
    //         }
    //     }]).then( registro =>  {response.json(registro)} );
    // },

    buscarVacacionesEmpleado: (request, response) => {
        
        // RegistroJornada.aggregate([{
        //     $match: {
        //         $and: [
        //             {empleado: request.body.empleado},
        //             {tipoJornada: 'Vacaciones'}
        //         ]
        //     }},
        //     {$group: {
        //         _id: '$_id',
        //         count: {$sum: 1}
        //     }
        // }]).then( registro =>  {response.json(registro)} );

        

        RegistroJornada.find({
            $and: [
                // {empleado: request.body.empleado},
                {tipoJornada: 'Vacaciones'}
            ]
        }).count().then( registro =>  {response.json(registro)} );

    },


}