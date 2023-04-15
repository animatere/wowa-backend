import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './card.model';
import { InjectModel } from '@nestjs/mongoose'; 
import { Model } from 'mongoose';

@Injectable()
export class CardService {
    products: Card[] = [];

    constructor(@InjectModel('Card') private readonly cardModel: Model<Card>){}

    async insertCard(product: Card) {
        const newProduct = new this.cardModel({type: product.type, cardText: product.cardText, category: product.category});
        const result = await newProduct.save();
        return result.id as string;
    }

    async getCards() {
        const products = await this.cardModel.find().exec();
        return products.map((prod) => ({id: prod.id, type: prod.type, cardText: prod.cardText, category: prod.category}));
    }

    private async findCards(id: string): Promise<Card> {
        let product;
        try{
            product = await this.cardModel.findById(id);
        } catch(error) {
            throw new NotFoundException('Could not find product.');
        }

        if(!product){
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }

    async getCardById(id: string) {
        const product = await this.findCards(id);
        return {
            id: product.id, 
            type: product.type, 
            cardText: product.cardText, 
            category: product.category
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

    async removeCardById(prodId: string) {
        const result = await this.cardModel.deleteOne({_id: prodId}).exec();
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find product.');
        }
    }
}