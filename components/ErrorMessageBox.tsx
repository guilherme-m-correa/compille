// import { useState } from 'react'
import { FaTimesCircle, FaTimes } from 'react-icons/fa'

const ErrorMessageBox: React.FC = ({ children }) => {
  // const [open, setOpen] = useState(true)

  return (
    <>
      <div className="bg-red-500 py-4 px-6 rounded-md relative flex space-x-4 items-center text-white">
        <FaTimesCircle className="h-10 w-10 flex-shrink-0" />

        <div>{children}</div>
        {/*
        <button type="button" onClick={() => setOpen(false)}>
          <FaTimes className="absolute top-2 right-2" />
        </button> */}
      </div>
    </>
  )
}

export default ErrorMessageBox
