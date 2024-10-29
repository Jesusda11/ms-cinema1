import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seat from 'App/Models/Seat';

export default class SeatsController {
    //Todas las operaciones del crud.
    public async find({ request, params }: HttpContextContract) { //Sirve para buscar un elemento dado un identificador, 
        if (params.id) {
            let theSeat: Seat = await Seat.findOrFail(params.id) //Espere un momentico y despues le doy un identificador para que me lo busque
            return theSeat;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {  //Hace una paginacion, toma una seccion del libro
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Seat.query().paginate(page, perPage) //Traer los elementos en un rango
            } else {
                return await Seat.query()  //Devuelve todos los elementos de la consulta para traer todos.
            }

        }

    }

    public async create({ request }: HttpContextContract) { //Permite crear un nuevo teatro, por debajo node utiliza el procesador de forma completa, capaz de aceptar de forma simultanea varias peticiones.
        const body = request.body(); //Body tiene JSON 
        const theSeat: Seat = await Seat.create(body); //Crear una nueva instancia
        return theSeat;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSeat: Seat = await Seat.findOrFail(params.id);
        const body = request.body(); //Leo lo que viene dentro de la carta.
        theSeat.location = body.location;
        theSeat.reclining = body.reclining;
        theSeat.theater_id = body.theater_id;
        return await theSeat.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSeat: Seat = await Seat.findOrFail(params.id);
            response.status(204);
            return await theSeat.delete();
    }
}
