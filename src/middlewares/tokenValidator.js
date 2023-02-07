const tokenValidator = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === undefined) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16 || typeof authorization !== 'string') {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};

module.exports = tokenValidator;
