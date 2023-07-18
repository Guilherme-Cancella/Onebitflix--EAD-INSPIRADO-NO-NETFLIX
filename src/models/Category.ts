import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

export interface CategoryAttributes {
  id: number
  name: string
  position: number
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

export interface CategoryInstance extends Model<CategoryAttributes, CategoryCreationAttributes>, CategoryAttributes {}

export const Category = database.define<CategoryInstance, CategoryAttributes>('categories', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  position: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER
  }
})