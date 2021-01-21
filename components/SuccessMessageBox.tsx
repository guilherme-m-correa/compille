// import { useState } from 'react'
import { FaRegCheckCircle, FaTimes } from 'react-icons/fa'

const SuccessMessageBox: React.FC = ({ children }) => {
  // const [open, setOpen] = useState(true)

  return (
    <>
      <div className="bg-green-500 py-4 px-6 rounded-md relative flex space-x-4 items-center text-white">
        <FaRegCheckCircle className="h-10 w-10 flex-shrink-0" />

        <div>{children}</div>
        {/*
          <button type="button" onClick={() => setOpen(false)}>
            <FaTimes className="absolute top-2 right-2" />
          </button> */}
      </div>
    </>
  )
}

export default SuccessMessageBox
