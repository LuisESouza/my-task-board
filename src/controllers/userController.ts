import { Request, Response } from 'express';
import * as UserModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async(req: Request, res: Response): Promise<any> => {
    const {  email, username, password } = req.body;
    try{
        const userCheck = await UserModel.getUserByEmail(email)
        if(userCheck){
          return res.status(500).json('Erro ao registrar: Email ja registrado');
        }
        const user = await UserModel.createUser({ email ,username, password});
        if(!user){
          res.status(500).json('Erro ao registrar');
        }
        const token = jwt.sign({ userId: user.id }, 'teste', { expiresIn: '1h' });
        res.status(201).json({ token });
    }catch(error){
        res.status(500).json({message: 'Erro ao registrar user', error});
    }
};

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

export const loginUser = async(req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Senha inválida' });
    }
    const token = jwt.sign({ userId: user.id }, 'teste', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};