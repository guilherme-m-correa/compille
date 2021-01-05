import { motion } from 'framer-motion'
import Link from 'next/link'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const contentVariant = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

export const Navigation = ({ isOpen, toggle }) => {
  return (
    <motion.div
      className={
        isOpen
          ? 'absolute left-0 right-0 top-20 min-h-screen flex flex-col'
          : 'hidden'
      }
      variants={variants}
    >
      <motion.div
        variants={contentVariant}
        className="bg-black-500 flex-1 px-4"
      >
        <Link href="/login">
          <button
            type="button"
            onClick={toggle}
            className="mt-4 secondary-btn w-full"
          >
            LOGIN
          </button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
