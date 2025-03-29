const Routes = {
  Home: '/',
  SignIn: '/sign-in',
  SignUp: '/sign-up',
  Posts: '/posts',
  Post: (id: string) => `/posts/${id}`,
  Cart: '/cart',
  Collection: '/collection',
  Books: '/books',
  Book: (id: string) => `/books/${id}`,
  Categories: '/categories',
  Category: (id: string) => `/categories/${id}`,
  Contact: '/contact',
  Profile: (id: string) => `/profile/${id}`,
  Tags: '/tags',
  Tag: (id: string) => `/tags/${id}`,
}

export default Routes
