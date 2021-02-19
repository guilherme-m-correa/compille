import { motion, AnimateSharedLayout } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/tailwind.css'
import '../styles/globals.css'

import Header from '../components/Header'
import Footer from '../components/Footer'

import AppProvider from '../hooks'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimateSharedLayout>
      <AppProvider>
        <Header />
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: { opacity: 0 },
            pageAnimate: { opacity: 1 }
          }}
          transition={{
            delay: 0.5
          }}
        >
          <Component {...pageProps} />
        </motion.div>
        <Footer />
        <ToastContainer />
      </AppProvider>
    </AnimateSharedLayout>
  )
}

export default MyApp
