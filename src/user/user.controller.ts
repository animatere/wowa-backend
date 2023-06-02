import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common'
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('User')
export class UserController {

    constructor(private readonly UserService: UserService) {}

    @Post() 
    async addUser(@Body() completeBody: User ){
        debugger;
        const generatedId = await this.UserService.insertUser(completeBody);
        return {id: generatedId };
    }

    @Get('all') 
    async getUsers(){
        debugger;
        const Users = await this.UserService.getUsers() as User[];
        return Users;
    }

    @Get(':id') 
    async getUser(@Param('id') id: string){
        debugger;
        return await this.UserService.getUserById(id);
    }

    @Patch(':id') 
    async updateUser(@Param('id') id: string, @Body('userRole') userRole: string, @Body('userName') userName: string, @Body('userPassword') userPassword: string){
        debugger;
        await this.UserService.updateUserById(id, userRole, userName, userPassword);
        return null;
    }

    @Delete(':id') 
    async removeUser(@Param('id') id: string){
        debugger;
        await this.UserService.removeUserById(id);
        return null;
    }
}
