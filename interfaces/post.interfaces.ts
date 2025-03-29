export interface IAuthor {
  _id: string
  name: string
  image: string
}

export interface ITag {
  _id: string
  name: string
}

export interface IPost {
  _id: string
  title: string // также прокинем в метатег title
  content: string
  author: IAuthor // При запросе автора, прокинем его ФИО в метатег author
  createdAt: Date
  updatedAt?: Date
  likes: number
  views: number
  commentsCount: number
  tags?: ITag[] // При запросе тегов, прокинем их в метатег keywords
  image?: string
  categories: string[]
  description?: string // Описание поста для метатега description
}
