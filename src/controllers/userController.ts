import { Request, Response } from 'express';
import * as UserModel from '../models/userModel';

export const createUser = async(req: Request, res: Response) => {
    const {  username, password } = req.body;
    try{
        const user = await UserModel.createUser({ username, password});
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message: 'Erro ao criar user', error});
    }
}

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  const { user_id } = req.params;
  try {
    const user = await UserModel.getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
};
