import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common'
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post() 
    async addProduct(@Body() completeBody: Product ){
        const generatedId = await this.productsService.insertProduct(completeBody);
        return {id: generatedId };
    }

    @Get('all') 
    async getProducts(){
        const products = await this.productsService.getProducts() as Product[];
        return products;
    }

    @Get(':id') 
    async getProduct(@Param('id') id: string){
        return await this.productsService.getProductById(id);
    }

    @Patch(':id') 
    async updateProduct(@Param('id') id: string, @Body('title') title: string, @Body('description') desc: string, @Body('price') price: number){
        await this.productsService.updateProductById(id, title, desc, price);
        return null;
    }

    @Delete(':id') 
    async removeProduct(@Param('id') id: string){
        await this.productsService.removeProductById(id);
        return null;
    }
}
