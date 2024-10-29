import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Theater from 'App/Models/Theater';

export default class TheatersController { //Todas las operaciones del crud.
    public async find({ request, params }: HttpContextContract) { //Sirve para buscar un elemento dado un identificador, 
        if (params.id) {
            let theTheater: Theater = await Theater.findOrFail(params.id) //Espere un momentico y despues le doy un identificador para que me lo busque
            await theTheater.load('screenings', query =>{
                query.preload('movie')
            })
            await theTheater.load('projector')
            return theTheater;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {  //Hace una paginacion, toma una seccion del libro
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Theater.query().paginate(page, perPage) //Traer los elementos en un rango
            } else {
                return await Theater.query()  //Devuelve todos los elementos de la consulta para traer todos.
            }

        }

    }

    public async create({ request }: HttpContextContract) { //Permite crear un nuevo teatro, por debajo node utiliza el procesador de forma completa, capaz de aceptar de forma simultanea varias peticiones.
        const body = request.body(); //Body tiene JSON 
        const theTheater: Theater = await Theater.create(body); //Crear una nueva instancia
        return theTheater;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTheater: Theater = await Theater.findOrFail(params.id);
        const body = request.body(); //Leo lo que viene dentro de la carta.
        theTheater.location = body.location;
        theTheater.capacity = body.capacity;
        return await theTheater.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTheater: Theater = await Theater.findOrFail(params.id);
            response.status(204);
            return await theTheater.delete();
    }
} 
