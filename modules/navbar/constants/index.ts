import Routes from '@/constants/routes'

export const navigationLinks = [
  {
    imgURL: '/icons/home.svg',
    route: Routes.Home,
    label: 'Главная',
  },
  {
    imgURL: '/icons/star.svg',
    route: Routes.Posts,
    label: 'Публикации',
  },
  {
    imgURL: '/icons/star.svg',
    route: Routes.Books,
    label: 'Книги',
  },
  {
    imgURL: '/icons/star.svg',
    route: Routes.Contact,
    label: 'Связаться',
  },
  {
    imgURL: '/icons/star.svg',
    route: Routes.Categories,
    label: 'Категории',
  },
  {
    imgURL: '/icons/star.svg',
    route: Routes.Collection,
    label: 'Избранное',
  },
  {
    imgURL: '/icons/star.svg',
    route: Routes.Cart,
    label: 'Корзина',
  },
  {
    imgURL: '/icons/star.svg',
    route: '/profile',
    label: 'Мой аккаунт',
  },
]
