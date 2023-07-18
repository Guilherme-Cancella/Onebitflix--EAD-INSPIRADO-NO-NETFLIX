import { database } from '../database'
import { DataTypes, Model } from 'sequelize'

export interface WatchTimeAttributes {
  seconds: number
  userId: number
  episodeId: number
}

export interface WatchTimeInstance extends Model<WatchTimeAttributes>, WatchTimeAttributes { }

export const WatchTime = database.define<WatchTimeInstance, WatchTimeAttributes>('watch_times', {
  seconds: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  episodeId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'episodes', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})