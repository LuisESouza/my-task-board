import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async(data: { username: string; password: string;}) =>{
    return await prisma.users.create({
        data:{
            username: data.username,
            password: data.password,
            created_at: new Date()
        }
    });
};

export const getUserById = async (user_id: string) => {
    return await prisma.users.findUnique({
        where: { id: user_id },
    });
};