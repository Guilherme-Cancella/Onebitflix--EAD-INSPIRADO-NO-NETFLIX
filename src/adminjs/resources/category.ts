import { ResourceOptions } from "adminjs";

export const categoryResourceOptions: ResourceOptions = {
  navigation: {
    name: 'Catálogo',
    icon: 'Categories'
  },
  editProperties: ['name', 'position'],
  filterProperties: ['name', 'position', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'position'],
  showProperties: ['id', 'name', 'position', 'createdAt', 'updatedAt']
}