import { AuthProvider } from './auth'
import { AudienceProvider } from './audience'

const AppProvider: React.FC = ({ children }) => {
  return (
    <AudienceProvider>
      <AuthProvider>{children}</AuthProvider>
    </AudienceProvider>
  )
}

export default AppProvider
