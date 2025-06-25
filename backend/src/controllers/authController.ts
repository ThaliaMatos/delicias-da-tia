import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
    console.log('🛠️ REQ.BODY:', req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '2h' }
    );

    return res.json({ token });
};
