import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    products: Product[] = [];

    insertProduct(product: Product): string {
        const newProduct = new Product(Math.random().toString(), product.title, product.description, product.price);
        this.products.push(newProduct);
        return newProduct.id;
    }

    getProducts() {
        return [...this.products];
    }

    findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(x => x.id == id);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }

    getProductById(id: string) {
        const product = this.findProduct(id)[0];
        return{...product};
    }

    updateProductById(id: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(id);
        const updateProduct = {...product};
        
        if(title){
            updateProduct.title = title;
        }
        if(desc){
            updateProduct.description = desc;
        }
        if(price){
            updateProduct.price = price;
        }
        this.products[index] = updateProduct;

        return updateProduct;
    }

    removeProductById(id: string) {
        const index = this.findProduct(id)[1];
        this.products.splice(index, 1);
    }
}