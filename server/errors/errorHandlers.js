const notFound = (req, res, next) => {
  res.status(404).json({ success: false, error: 'Resource not found' })
}

const serverError = (err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json({ success: false, error: err })
}

module.exports = { notFound, serverError }