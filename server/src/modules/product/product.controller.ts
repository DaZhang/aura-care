import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 获取商品列表
  @Get('list')
  async getProductList(@Query('constitution') constitution?: string) {
    console.log('[ProductController] getProductList - constitution:', constitution);
    return this.productService.getProductList(constitution);
  }

  // 获取商品详情
  @Get('detail/:id')
  async getProductDetail(@Param('id') id: string) {
    console.log('[ProductController] getProductDetail - id:', id);
    return this.productService.getProductDetail(id);
  }

  // 获取香料列表
  @Get('spices')
  async getSpices() {
    return this.productService.getSpices();
  }

  // 获取材质列表
  @Get('materials')
  async getMaterials() {
    return this.productService.getMaterials();
  }

  // 计算定制价格
  @Get('calculate-price')
  async calculatePrice(
    @Query('material') material: string,
    @Query('engraving') engraving?: string,
    @Query('quantity') quantity?: string,
  ) {
    console.log('[ProductController] calculatePrice - material:', material, 'engraving:', engraving, 'quantity:', quantity);
    return this.productService.calculatePrice(material, engraving, Number(quantity) || 1);
  }
}
