import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './card.model';
import { InjectModel } from '@nestjs/mongoose'; 
import { Model } from 'mongoose';

@Injectable()
export class CardService {
    cards: Card[] = [];

    constructor(@InjectModel('Card') private readonly cardModel: Model<Card>){}

    async insertCard(card: Card) {
        const newcard = new this.cardModel({type: card.type, cardText: card.cardText, category: card.category});
        const result = await newcard.save();
        return result.id as string;
    }

    async getCards() {
        const cards = await this.cardModel.find().exec();
        return cards.map((card) => ({id: card.id, type: card.type, cardText: card.cardText, category: card.category}));
    }

    private async findCards(id: string): Promise<Card> {
        let card;
        try{
            card = await this.cardModel.findById(id);
        } catch(error) {
            throw new NotFoundException('Could not find card.');
        }

        if(!card){
            throw new NotFoundException('Could not find card.');
        }
        return card;
    }

    async getCardById(id: string) {
        const card = await this.findCards(id);
        return {
            id: card.id, 
            type: card.type, 
            cardText: card.cardText, 
            category: card.category
        };;
    }

    async updateCardById(id: string, type: string, cardText: string, category: string) {
        const updateCard = await this.findCards(id);
        
        if(type){
            updateCard.type = type;
        }
        if(cardText){
            updateCard.cardText = cardText;
        }
        if(category){
            updateCard.category = category;
        }
        updateCard.save();
    }

    async removeCardById(cardId: string) {
        const result = await this.cardModel.deleteOne({_id: cardId}).exec();
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find card.');
        }
    }
}