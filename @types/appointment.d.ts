interface Appointment {
  id: number
  correspondent_id: string
  requester_id: string
  forum_id: number
  appointment_status_id: number
  start_date: Date
  end_date: Date
  area: string
  type: string
  process_type: string
  process_number: string
  observations: string
  value: number
  forum: {
    id: number
    address: string
    descricao: string
    zip_code: string
    street: string
    street_number: string
    street_complement: string
    neighborhood: string
    city_id: number
    latitude: number
    longitude: number
    created_at: Date
    updated_at: Date
    city: {
      id: number
      state_id: number
      name: string
      is_capital: booolean
      ibge_city_code: string
      created_at: Date
      updated_at: Date
      state: {
        id: number
        region_id: number
        name: string
        uf: string
        ibge_uf_code: string
        created_at: Date
        updated_at: Date
      }
    }
  }
  requester: {
    id: number
    user_id: string
    cpf: string
    rg: string
    rg_exp: string
    rg_uf: string
    gender: string
    birth_date: string
    profile_name: string
    profile_type: string
    schoolarity: null
    avatar_url: string
  }
  correspondent: {
    id: number
    user_id: string
    cpf: string
    rg: string
    rg_exp: string
    rg_uf: string
    oab: string
    oab_uf: string
    gender: string
    birth_date: string
    profile_name: string
    profile_link: string
    curriculum: string
    has_certificate: boolean
    profile_type: string
    schoolarity: string
    avatar_url: string
  }
  status: {
    id: number
    description: string
  }
  created_at: Date
  updated_at: Date
}
