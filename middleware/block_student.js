module.exports = (req, res, next) => {
  if (req.user_permission === 2) return res.status(403).json({ error: 'Forbbiden' })
  next()
}