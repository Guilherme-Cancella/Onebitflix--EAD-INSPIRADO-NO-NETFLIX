import { Response } from 'express'
import { RequestWithUser } from '../middlewares/auth'
import { favoriteService } from '../services/favoriteService'

export const favoritesController = {
  // GET /favorites
  index: async (req: RequestWithUser, res: Response) => {
    const userId = req.user!.id

    try {
      const favorites = await favoriteService.findByUserId(userId)
      return res.json(favorites)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // POST /favorites
  save: async (req: RequestWithUser, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body

    try {
      const favorite = await favoriteService.create(userId, courseId)
      return res.status(201).json(favorite)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // DELETE /favorites
  delete: async (req: RequestWithUser, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body

    try {
      await favoriteService.delete(userId, courseId)
      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}