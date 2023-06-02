import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose'; 
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    Users: User[] = [];

    constructor(@InjectModel('User') private readonly UserModel: Model<User>){}

    async insertUser(User: User) {
        const newUser = new this.UserModel({userRole: User.userRole, userName: User.userName, userPassword: User.userPassword});
        if(!(await this.getUserByName(User.userName))){
            const result = await newUser.save();
            return result.id as string;
        }
        else{
            return "Username already taken."
        }
    }

    async getUsers() {
        const Users = await this.UserModel.find().exec();
        return Users.map((user) => ({id: user.id, userRole: user.userRole, userName: user.userName, userPassword: user.userPassword}));
    }

    private async findUsers(id: string): Promise<User> {
        let User;
        try{
            User = await this.UserModel.findById(id);
        } catch(error) {
            throw new NotFoundException('Could not find User.');
        }

        if(!User){
            throw new NotFoundException('Could not find User.');
        }
        return User;
    }

    async getUserById(id: string) {
        const User = await this.findUsers(id);
        return {
            id: User.id, 
            type: User.userRole, 
            UserText: User.userName, 
            category: User.userPassword
        };;
    }

    async getUserByName(userName: string) {
        let User;
        try{
            User = await this.UserModel.findOne({ userName: userName });
        } catch(error) {
            throw new NotFoundException('Error while searching for existing Users.');
        }

        return User;
    }

    async updateUserById(id: string, role: string, name: string, password: string) {
        const updateUser = await this.findUsers(id);
        
        if(role){
            updateUser.userRole = role;
        }
        if(name){
            updateUser.userName = name;
        }
        if(password){
            updateUser.userPassword = password;
        }
        updateUser.save();
    }

    async removeUserById(userId: string) {
        const result = await this.UserModel.deleteOne({_id: userId}).exec();
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find User.');
        }
    }
}