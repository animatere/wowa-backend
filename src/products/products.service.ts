import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose'; 
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async insertProduct(product: Product) {
        const newProduct = new this.productModel({title: product.title, description: product.description, price: product.price});
        const result = await newProduct.save();
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({id: prod.id, title: prod.title, description: prod.description, price: prod.price}));
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try{
            product = await this.productModel.findById(id);
        } catch(error) {
            throw new NotFoundException('Could not find product.');
        }

        if(!product){
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }

    async getProductById(id: string) {
        const product = await this.findProduct(id);
        return {
            id: product.id, 
            title: product.title, 
            description: product.description, 
            price: product.price
        };;
    }

    async updateProductById(id: string, title: string, desc: string, price: number) {
        const updateProduct = await this.findProduct(id);
        
        if(title){
            updateProduct.title = title;
        }
        if(desc){
            updateProduct.description = desc;
        }
        if(price){
            updateProduct.price = price;
        }
        updateProduct.save();
    }

    async removeProductById(prodId: string) {
        const result = await this.productModel.deleteOne({_id: prodId}).exec();
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find product.');
        }
    }
}