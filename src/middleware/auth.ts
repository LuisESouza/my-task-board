import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }

    try {
        const decoded = jsonwebtoken.verify(token, 'teste');
        (req as any).user = decoded;
        return next();
    } catch (error) {
        res.status(401).json({ message: 'Token não é válido' });
    }
};
