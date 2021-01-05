import { useRef } from 'react'
import { motion, useCycle } from 'framer-motion'
import { useDimensions } from '../hooks/dimensions'
import { MenuToggle } from './MenuToggle'

import { Navigation } from './Navigation'

export const Menu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className="flex lg:hidden mr-6"
      ref={containerRef}
    >
      <Navigation isOpen={isOpen} toggle={() => toggleOpen()} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  )
}
