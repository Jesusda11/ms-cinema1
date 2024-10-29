import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movies from 'App/Models/Movies';

export default class MoviesController {
    //Todas las operaciones del crud.
    public async find({ request, params }: HttpContextContract) { //Sirve para buscar un elemento dado un identificador, 
        if (params.id) {
            let theMovies: Movies = await Movies.findOrFail(params.id) //Espere un momentico y despues le doy un identificador para que me lo busque
            return theMovies;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {  //Hace una paginacion, toma una seccion del libro
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Movies.query().paginate(page, perPage) //Traer los elementos en un rango
            } else {
                return await Movies.query()  //Devuelve todos los elementos de la consulta para traer todos.
            }

        }

    }

    public async create({ request }: HttpContextContract) { //Permite crear un nuevo teatro, por debajo node utiliza el procesador de forma completa, capaz de aceptar de forma simultanea varias peticiones.
        const body = request.body(); //Body tiene JSON 
        const theMovies: Movies = await Movies.create(body); //Crear una nueva instancia
        return theMovies;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMovies: Movies = await Movies.findOrFail(params.id);
        const body = request.body(); //Leo lo que viene dentro de la carta.
        theMovies.name = body.name;
        theMovies.duration = body.duration;
        theMovies.date = body.date;
        return await theMovies.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMovies: Movies = await Movies.findOrFail(params.id);
            response.status(204);
            return await theMovies.delete();
    }
}
