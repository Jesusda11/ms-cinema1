import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Screening from 'App/Models/Screening';

export default class ScreeningsController {
    //Todas las operaciones del crud.
    public async find({ request, params }: HttpContextContract) { //Sirve para buscar un elemento dado un identificador, 
        if (params.id) {
            let theScreening: Screening = await Screening.findOrFail(params.id) //Espere un momentico y despues le doy un identificador para que me lo busque
            await theScreening.load('movie')
            await theScreening.load('theater')
            return theScreening;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {  //Hace una paginacion, toma una seccion del libro
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Screening.query().paginate(page, perPage) //Traer los elementos en un rango
            } else {
                return await Screening.query()  //Devuelve todos los elementos de la consulta para traer todos.
            }

        }

    }

    public async create({ request }: HttpContextContract) { //Permite crear un nuevo teatro, por debajo node utiliza el procesador de forma completa, capaz de aceptar de forma simultanea varias peticiones.
        const body = request.body(); //Body tiene JSON 
        const theScreening: Screening = await Screening.create(body); //Crear una nueva instancia
        return theScreening;
    }

    public async update({ params, request }: HttpContextContract) {
        const theScreening: Screening = await Screening.findOrFail(params.id);
        const body = request.body(); //Leo lo que viene dentro de la carta.
        theScreening.date = body.date;
        theScreening.theater_id = body.theater_id;
        theScreening.movie_id = body.movie_id
        return await theScreening.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theScreening: Screening = await Screening.findOrFail(params.id);
            response.status(204);
            return await theScreening.delete();
    }
}
