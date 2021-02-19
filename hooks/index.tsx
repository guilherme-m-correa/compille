import { AuthProvider } from './auth'
import { AudienceProvider } from './audience'
import { SocketProvider } from './socket'

const AppProvider: React.FC = ({ children }) => {
  return (
    <AudienceProvider>
      <AuthProvider>
        <SocketProvider>{children}</SocketProvider>
      </AuthProvider>
    </AudienceProvider>
  )
}

export default AppProvider
