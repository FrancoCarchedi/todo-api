const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer token del header Authorization

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const secret = process.env.JWT_SECRET

  try {
    const user = jwt.verify(token, secret); // Verificar el token
    req.user = user; // Adjuntar datos del usuario a la solicitud
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token no válido' });
  }
};

module.exports = authenticateToken;
