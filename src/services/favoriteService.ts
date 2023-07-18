import { Favorite } from "../models"

export const favoriteService = {
  isFavorited: async (courseId: string | number, userId: string | number) => {
    const favorite = await Favorite.findOne({
      where: {
        courseId,
        userId
      }
    })

    return favorite ? true : false
  },

  findByUserId: async (userId: string | number) => {
    const favorites = await Favorite.findAll({
      attributes: [['user_id', 'userId']],
      where: { userId },
      include: {
        association: 'course',
        attributes: [
          'id',
          'name',
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl'],
          'featured',
          ['category_id', 'categoryId']
        ]
      },
    })

    const courses = favorites.map(favorite => favorite.course)

    return {
      userId,
      courses
    }
  },

  create: async (userId: number, courseId: number) => {
    const favoriteAlreadyExists = await Favorite.findOne({
      where: {
        userId,
        courseId
      }
    })

    if (favoriteAlreadyExists) {
      throw new Error('Curso já existente na lista')
    }

    const favorite = await Favorite.create({
      userId,
      courseId
    })

    return favorite
  },

  delete: async (userId: string | number, courseId: string | number) => {
    await Favorite.destroy({
      where: {
        userId,
        courseId
      }
    })
  }
}