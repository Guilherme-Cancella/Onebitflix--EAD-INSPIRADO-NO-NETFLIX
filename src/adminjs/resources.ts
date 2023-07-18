import { ResourceWithOptions } from 'adminjs'
import { Category, Course, Episode, User } from '../models'
import { categoryResourceOptions } from './resources/category'
import { courseResourceFeatures, courseResourceOptions } from './resources/course'
import { episodeResourceFeatures, episodeResourceOptions } from './resources/episode'
import { userResourceOptions } from './resources/user'

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Course,
    options: courseResourceOptions,
    features: courseResourceFeatures
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
    features: episodeResourceFeatures
  },
  {
    resource: Category,
    options: categoryResourceOptions
  },
  {
    resource: User,
    options: userResourceOptions
  }
]