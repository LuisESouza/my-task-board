import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async(data: {user_id: string; title: string; description: string; status: string; icon: string}) =>{
    return await prisma.tasks.create({
        data: {
            user_id: data.user_id,
            title: data.title,
            description: data.description,
            icon: data.icon,
            status: data.status
        } 
    });
};

export const getTask = async (user_id: string) => {
    return await prisma.tasks.findMany({ 
        where: { user_id: user_id },
    });
};


export const putTask = async (task_id: string, data: { title?: string; description?: string; status?: string; icon?: string}) => {
    console.log("Testando os dados: ",data)
    return await prisma.tasks.update({
        where: { id: task_id },
        data,
    });
};


export const deleteTask = async (task_id: string) => {
    return await prisma.tasks.delete({
        where: { id: task_id },
    });
};