import { Request, Response } from 'express';
import * as TaskModel from '../models/taskModel';

export const createTask = async(req: Request, res: Response) => {
    const { user_id, title, description, status} = req.body;
    try{
        await TaskModel.createTask({user_id, title, description, status});
        res.status(200).json({message: 'Task criada com sucesso!'});
    }catch(error){
        res.status(500).json({message: 'Erro ao criar user', error});
    }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            res.status(400).json({ message: 'O ID do usuário é obrigatório.' });
            return;
        }
        const tasks = await TaskModel.getTask(user_id);
        if (!tasks || tasks.length === 0) {
            res.status(404).json({ message: 'Nenhuma tarefa encontrada para este usuário' });
            return;
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao pegar tasks', error });
    }
};

export const putTask = async(req: Request, res: Response) => {
    const { task_id } = req.params;
    const { title, description, status } = req.body;
    try{
        await TaskModel.putTask(task_id, {title, description, status});
        res.json('Task alterada com sucesso');
    }catch(error){
        res.status(500).json({message: 'Erro ao alterar task', error});
    }
};

export const deleteTask = async(req: Request, res: Response) => {
    const { task_id } = req.params;
    try{
        await TaskModel.deleteTask(task_id);
        res.json('Task deletada com sucesso');
    }catch(error){
        res.status(500).json({message: 'Erro ao deletar task', error});
    }
};