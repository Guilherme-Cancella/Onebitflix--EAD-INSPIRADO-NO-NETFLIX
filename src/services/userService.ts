import { User } from '../models'
import { EpisodeInstance } from '../models/Episode'
import { UserCreationAttributes } from '../models/User'

function filterLastEpisodeFromEachCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = []

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId)
      currentList.push(episode)
      return currentList
    }

    const episodeFromSameCourse = currentList.find(e => e.courseId === episode.courseId)

    if (episodeFromSameCourse!.order > episode.order) {
      return currentList
    }

    const listWithoutEpisodeFromSameCourse = currentList.filter(e => e.courseId !== episode.courseId)
    listWithoutEpisodeFromSameCourse.push(episode)

    return listWithoutEpisodeFromSameCourse
  }, [] as EpisodeInstance[])

  return lastEpisodes
}

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      attributes: [
        'id',
        ['first_name', 'firstName'],
        ['last_name', 'lastName'],
        'phone',
        'birth',
        'email',
        'password',
        'created_at'
      ],
      where: { email }
    })
    return user
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes)
    return user
  },

  update: async (
    id: string | number,
    values: {
      firstName?: string,
      lastName?: string,
      phone?: string,
      birth?: Date,
      email?: string
    }
  ) => {
    const { firstName, lastName, phone, birth, email } = values

    const [affectedRows, updatedUsers] = await User.update({
      firstName,
      lastName,
      phone,
      birth,
      email
    }, {
      where: { id },
      returning: true
    })

    return updatedUsers[0]
  },

  updatePassword: async (id: string | number, password: string) => {
    const [affectedRows, updatedUsers] = await User.update({
      password
    }, {
      where: { id },
      individualHooks: true,
      returning: true
    })

    return updatedUsers[0]
  },

  getKeepWatchingList: async (id: string | number) => {
    const userWithWatchingEpisodes = await User.findByPk(id, {
      attributes: [],
      include: {
        association: 'episodes',
        include: [{
          association: 'course'
        }],
        through: {
          as: 'watchTime'
        }
      }
    })

    if (!userWithWatchingEpisodes) {
      throw new Error('Usuário não encontrado')
    }

    const keepWatchingList = filterLastEpisodeFromEachCourse(userWithWatchingEpisodes.episodes!)
    // @ts-ignore
    keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1)
    return keepWatchingList
  }
}