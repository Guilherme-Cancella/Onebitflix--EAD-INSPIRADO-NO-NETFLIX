import { Request, Response } from 'express'
import { getPaginationParams } from '../helpers/getPaginationParams'
import { RequestWithUser } from '../middlewares/auth'
import { courseService } from '../services/courseService'
import { favoriteService } from '../services/favoriteService'
import { likeService } from '../services/likeService'

export const coursesController = {
  // GET /courses/:id
  show: async (req: RequestWithUser, res: Response) => {
    const { id } = req.params
    const userId = req.user!.id

    try {
      const course = await courseService.findByIdWithEpisodes(id)

      if (course) {
        const liked = await likeService.isLiked(course.id, userId)
        const favorited = await favoriteService.isFavorited(course.id, userId)
        return res.json({ ...course.get(), favorited, liked })
      } else {
        return res.status(404).json({ message: 'Curso não encontrado' })
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // GET /courses/featured
  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await courseService.getRandomFeaturedCourses()
      return res.json(featuredCourses)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // GET /courses/search?name=
  search: async (req: Request, res: Response) => {
    const { name } = req.query
    const [page, perPage] = getPaginationParams(req.query)

    try {
      if (typeof name !== 'string') throw new Error('name param must be of type string');
      const courses = await courseService.findByName(name, page, perPage)
      return res.json(courses)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // GET /courses/popular
  popular: async (req: Request, res: Response) => {
    try {
      const topTen = await courseService.getTopTenByLikes()
      return res.json(topTen)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // GET /courses/newest
  newest: async (req: Request, res: Response) => {
    try {
      const newestCourses = await courseService.getTopTenNewest()
      return res.json(newestCourses)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}