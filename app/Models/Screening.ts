import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Movie from './Movies'
import Theater from './Theater'

export default class Screening extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public date:DateTime

  @column()
  public movie_id: number

  @column()
  public theater_id: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Movie,{ 
    foreignKey: 'movie_id' // Este es el nombre de la clave foranea en la de projectors
  })
  public movie: BelongsTo<typeof Movie>

  @belongsTo(() => Theater,{ 
    foreignKey: 'theater_id' // Este es el nombre de la clave foranea en la de projectors
  })
  public theater: BelongsTo<typeof Theater>


}
