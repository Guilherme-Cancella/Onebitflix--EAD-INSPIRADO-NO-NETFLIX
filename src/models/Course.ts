import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

export interface CourseAttributes {
  id: number
  name: string
  synopsis: string
  thumbnailUrl: string
  featured: boolean
  categoryId: number
}

export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id' | 'thumbnailUrl' | 'featured' > {}

export interface CourseInstance extends Model<CourseAttributes, CourseCreationAttributes>, CourseAttributes {}

export const Course = database.define<CourseInstance, CourseAttributes>('courses', {
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
  synopsis: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  thumbnailUrl: {
    type: DataTypes.STRING
  },
  featured: {
    defaultValue: false,
    type: DataTypes.BOOLEAN
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})