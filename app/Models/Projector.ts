import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Theater from './Theater'

export default class Projector extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public brand: String

  @column()
  public high: number

  @column()
  public width: number

  @column()
  public theater_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Theater,{ 
    foreignKey: 'theater_id' // Este es el nombre de la clave foranea en la de projectors
  })
  public theater: BelongsTo<typeof Theater>
}
