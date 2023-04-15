import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common'
import { Card } from './card.model';
import { CardService } from './card.service';

@Controller('Card')
export class CardController {

    constructor(private readonly productsService: CardService) {}

    @Post() 
    async addCard(@Body() completeBody: Card ){
        const generatedId = await this.productsService.insertCard(completeBody);
        return {id: generatedId };
    }

    @Get('all') 
    async getCards(){
        const products = await this.productsService.getCards() as Card[];
        return products;
    }

    @Get(':id') 
    async getCard(@Param('id') id: string){
        return await this.productsService.getCardById(id);
    }

    @Patch(':id') 
    async updateCard(@Param('id') id: string, @Body('type') type: string, @Body('cardText') cardText: string, @Body('category') category: string){
        await this.productsService.updateCardById(id, type, cardText, category);
        return null;
    }

    @Delete(':id') 
    async removeCard(@Param('id') id: string){
        await this.productsService.removeCardById(id);
        return null;
    }
}
