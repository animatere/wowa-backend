import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common'
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post() 
    addProduct(@Body() completeBody: Product ): any{
        const generatedId = this.productsService.insertProduct(completeBody);
        return {id: generatedId };
    }

    @Get('all') 
    getProducts(): Product[]{
        return this.productsService.getProducts();
    }

    @Get(':id') 
    getProduct(@Param('id') id: string){
        return this.productsService.getProductById(id);
    }

    @Patch(':id') 
    updateProduct(@Param('id') id: string, @Body('title') title: string, @Body('description') desc: string, @Body('price') price: number){
        this.productsService.updateProductById(id, title, desc, price);
        return null;
    }

    @Delete(':id') 
    removeProduct(@Param('id') id: string){
        this.productsService.removeProductById(id);
        return null;
    }
}
