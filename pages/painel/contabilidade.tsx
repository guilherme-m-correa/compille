import { useState } from 'react'
import Container from '../../components/Container'

export default function Contabilidade() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Container>
      <h2 className="text-2xl font-semibold">Contabilidade</h2>
    </Container>
  )
}
