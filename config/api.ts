import { IAccount } from '@/config/database/models/account.model'
import { IUser } from '@/config/database/models/user.model'
import fetchClient from '@/config/handlers/fetch'
import Routes from '@/constants/routes'

export const api = {
  users: {
    getAll: () => fetchClient.get(Routes.Users),
    getById: (id: string) => fetchClient.get(Routes.User(id)),
    getByEmail: (email: string) =>
      fetchClient.post(Routes.UserEmail, { email }),
    create: (userData: Partial<IUser>) =>
      fetchClient.post(Routes.Users, userData),
    update: (id: string, userData: Partial<IUser>) =>
      fetchClient.put(Routes.User(id), userData),
    delete: (id: string) => fetchClient.delete(Routes.User(id)),
  },
  accounts: {
    getAll: () => fetchClient.get(Routes.Accounts),
    getById: (id: string) => fetchClient.get(Routes.Account(id)),
    getByProvider: (providerAccountId: string) =>
      fetchClient.post(Routes.AccountProvider, { providerAccountId }),
    create: (accountData: Partial<IAccount>) =>
      fetchClient.post(Routes.Accounts, accountData),
    update: (id: string, accountData: Partial<IAccount>) =>
      fetchClient.put(Routes.Account(id), accountData),
    delete: (id: string) => fetchClient.delete(Routes.Account(id)),
  },
}
