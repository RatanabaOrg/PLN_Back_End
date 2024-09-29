const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado. Sem token de autenticação.' });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey');
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token inválido.' });
    }
};

module.exports = authMiddleware;
