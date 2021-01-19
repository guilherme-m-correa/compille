const SuccessMessageBox: React.FC = ({ children }) => {
  return (
    <div className="bg-green-300 p-3 rounded-lg font-medium text-white">
      {children}
    </div>
  )
}

export default SuccessMessageBox
