import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Projector from './Projector'
import Screening from './Screening'
import Seat from './Seat'

export default class Theater extends BaseModel { //El orm, por debajo toma el diagrama de clases y lo pasa a bases de datos
  @column({ isPrimary: true }) 
  public id: number

  @column()  //Se crean los atributos de esta forma. Si hay relaciones se deben poner aqui.
  public location: string

  @column()
  public capacity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Projector,{ 
    foreignKey: 'theater_id' // Este es el nombre de la clave foranea en la de projectors
  })
  public projector: HasOne<typeof Projector>

  @hasMany(() => Screening,{ 
    foreignKey: 'theater_id' // Este es el nombre de la clave foranea en la de projectors
  })
  public screenings: HasMany<typeof Screening>

  @hasMany(() => Seat,{ 
    foreignKey: 'theater_id' // Este es el nombre de la clave foranea en la de projectors
  })
  public seats: HasMany<typeof Seat>


}
