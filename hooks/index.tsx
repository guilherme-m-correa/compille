import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './auth'

const AppProvider: React.FC = ({ children }) => {
  return (
    <CookiesProvider>
      <AuthProvider>{children}</AuthProvider>
    </CookiesProvider>
  )
}

export default AppProvider
