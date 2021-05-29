import { createContext, useCallback, useState, useContext } from 'react'

interface Forum {
  place_id: string
  formatted_address: string
  name: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
    viewport: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
  }
}

interface Audience {
  city: string
  area: string
  type: string
  local: string
  date: string
  hour_start: string
  hour_end: string
  process_number: string
  process_type: string
  certificate_required: string
  observations: string
  lawyer: Person
  forum: Forum
}

interface AudienceState {
  audience: Audience
}

interface AudienceContextData {
  audience: Audience
  updateAudience(audience: Audience): void
  reset(): void
}

const Audience = createContext<AudienceContextData>({} as AudienceContextData)

export const AudienceProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AudienceState>(() => {
    if (typeof window !== 'undefined') {
      const audience = localStorage.getItem('@Compille:audience')

      if (audience) {
        return { audience: JSON.parse(audience) }
      }
    }

    return {
      audience: {}
    } as AudienceState
  })

  const updateAudience = useCallback(
    (audience: Audience) => {
      localStorage.setItem('@Compille:audience', JSON.stringify(audience))
      setData({ audience })
    },
    [setData]
  )

  const reset = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('@Compille:audience')
    }
    setData({} as AudienceState)
  }, [])

  return (
    <Audience.Provider
      value={{ audience: data.audience, updateAudience, reset }}
    >
      {children}
    </Audience.Provider>
  )
}

export const useAudience = (): AudienceContextData => {
  const context = useContext(Audience)

  if (!context) {
    throw new Error(
      'The hook useAudience must be used within an AudienceProvider'
    )
  }

  return context
}
