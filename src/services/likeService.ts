import { Like } from "../models"

export const likeService = {
  create: async (userId: number, courseId: number) => {
    const likeAlreadyExists = await Like.findOne({
      where: {
        userId,
        courseId
      }
    })

    if (likeAlreadyExists) {
      throw new Error('Este usuário já gostou deste curso')
    }

    const like = await Like.create({
      userId,
      courseId
    })

    return like
  },

  delete: async (userId: string | number, courseId: string | number) => {
    await Like.destroy({
      where: {
        userId,
        courseId
      }
    })
  },

  isLiked: async (courseId: string | number, userId: string | number) => {
    const like = await Like.findOne({
      where: {
        courseId,
        userId
      }
    })

    return like ? true : false
  }
}