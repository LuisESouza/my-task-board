import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export const createUser = async(data: { email: string, username: string; password: string; }) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.users.create({
        data: {
            email: data.email,
            username: data.username,
            password: hashedPassword,
            created_at: new Date(),
        }
    });
};

export const getUserById = async (user_id: string) => {
    return await prisma.users.findUnique({
        where: { id: user_id },
    });
};

export const getUserByEmail = async (email: string) => {
    return prisma.users.findUnique({
        where: { email },
    });
};