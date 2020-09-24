module.exports = (req, res, next) => {
  console.log(req.user_permission)
  // if (!req.user_permission || req.user_permission > 1) return res.status(403).json({ error: 'Forbbiden' })
  if (req.user_permission || req.user_permission > 1) return res.status(403).json({ error: 'Forbbiden' })
  next()
}