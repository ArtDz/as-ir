import { FC, PropsWithChildren } from "react"

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main>{children}</main>
}

export default AuthLayout
