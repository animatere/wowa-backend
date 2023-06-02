import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common'
import { Card } from './card.model';
import { CardService } from './card.service';

@Controller('Card')
export class CardController {

    constructor(private readonly cardService: CardService) {}

    @Post() 
    async addCard(@Body() completeBody: Card ){
        const generatedId = await this.cardService.insertCard(completeBody);
        return {id: generatedId };
    }

    @Get('all') 
    async getCards(){
        const cards = await this.cardService.getCards() as Card[];
        return cards;
    }

    @Get(':id') 
    async getCard(@Param('id') id: string){
        return await this.cardService.getCardById(id);
    }

    @Patch(':id') 
    async updateCard(@Param('id') id: string, @Body('type') type: string, @Body('cardText') cardText: string, @Body('category') category: string){
        await this.cardService.updateCardById(id, type, cardText, category);
        return null;
    }

    @Delete(':id') 
    async removeCard(@Param('id') id: string){
        await this.cardService.removeCardById(id);
        return null;
    }
}
