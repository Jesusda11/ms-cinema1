import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Projector from 'App/Models/Projector';

export default class ProjectorsController { //Todas las operaciones del crud.
    public async find({ request, params }: HttpContextContract) { //Sirve para buscar un elemento dado un identificador, 
        if (params.id) {
            let theProjector: Projector = await Projector.findOrFail(params.id) //Espere un momentico y despues le doy un identificador para que me lo busque
            await theProjector.load('theater')
            return theProjector;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {  //Hace una paginacion, toma una seccion del libro
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Projector.query().paginate(page, perPage) //Traer los elementos en un rango
            } else {
                return await Projector.query()  //Devuelve todos los elementos de la consulta para traer todos.
            }

        }

    }

    public async create({ request }: HttpContextContract) { //Permite crear un nuevo teatro, por debajo node utiliza el procesador de forma completa, capaz de aceptar de forma simultanea varias peticiones.
        const body = request.body(); //Body tiene JSON 
        const theProjector: Projector = await Projector.create(body); //Crear una nueva instancia
        await theProjector.load('theater')
        return theProjector;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProjector: Projector = await Projector.findOrFail(params.id);
        const body = request.body(); //Leo lo que viene dentro de la carta.
        theProjector.brand = body.brand;
        theProjector.high = body.high;
        theProjector.width = body.width;
        theProjector.theater_id = body.theater_id;
        return await theProjector.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProjector: Projector = await Projector.findOrFail(params.id);
            response.status(204);
            return await theProjector.delete();
    }
} 
