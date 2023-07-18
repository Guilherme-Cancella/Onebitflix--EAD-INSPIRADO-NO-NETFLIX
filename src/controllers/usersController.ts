import { Response } from 'express'
import { RequestWithUser } from '../middlewares/auth'
import { userService } from '../services/userService'

export const usersController = {
  // GET /users/current
  show: async (req: RequestWithUser, res: Response) => {
    const currentUser = req.user

    try {
      return res.json(currentUser)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // PUT /users/current
  update: async (req: RequestWithUser, res: Response) => {
    const user = req.user
    const { firstName, lastName, phone, birth, email } = req.body

    if (!user) {
      return res.status(401).json({ message: 'Não autorizado!' })
    }

    try {
      const updatedUser = await userService.update(user.id, {
        firstName,
        lastName,
        phone,
        birth,
        email
      })

      return res.json(updatedUser)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // PUT /users/current/password
  updatePassword: async (req: RequestWithUser, res: Response) => {
    const user = req.user
    const { currentPassword, newPassword } = req.body

    if (!user) {
      return res.status(401).json({ message: 'Não autorizado!' })
    }

    try {
      user.checkPassword(currentPassword, async (err, isSame) => {
        if (err) {
          return res.status(400).json({ message: err.message })
        }

        if (!isSame) {
          return res.status(400).json({ message: 'Senha incorreta' })
        }

        await userService.updatePassword(user.id, newPassword)
        return res.status(204).send()
      })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // GET /users/current/watching
  watching: async (req: RequestWithUser, res: Response) => {
    const { id } = req.user!

    try {
      const watching = await userService.getKeepWatchingList(id)
      return res.json(watching)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}