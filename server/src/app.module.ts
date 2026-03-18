import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConstitutionModule } from '@/modules/constitution/constitution.module';
import { ProductModule } from '@/modules/product/product.module';
import { OrderModule } from '@/modules/order/order.module';
import { StorageModule } from '@/modules/storage/storage.module';

@Module({
  imports: [ConstitutionModule, ProductModule, OrderModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
