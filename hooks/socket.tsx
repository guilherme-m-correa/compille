import { useState, useEffect, createContext, useContext } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from './auth'

interface SocketContextData {
  socket: Socket
}

const SocketContext = createContext({} as SocketContextData)

export const SocketProvider: React.FC = ({ children }) => {
  const { user } = useAuth()
  const [socket, setSocket] = useState({} as any)

  useEffect(() => {
    if (!user) {
      return
    }
    const websocket = io(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}`, {
      query: { user_id: user.id }
    })

    setSocket(websocket)
  }, [user])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = (): SocketContextData => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('The hook useSocket must be used within an AuthProvider')
  }

  return context
}

export default SocketContext
