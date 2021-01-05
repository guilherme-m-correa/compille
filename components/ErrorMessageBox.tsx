const ErrorMessageBox: React.FC = ({ children }) => {
  return (
    <div className="bg-red-100 p-2 rounded-lg border-2 border-red-500 text-red-600">
      {children}
    </div>
  )
}

export default ErrorMessageBox
