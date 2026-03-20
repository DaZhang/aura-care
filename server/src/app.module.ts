import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConstitutionModule } from '@/modules/constitution/constitution.module';
import { ProductModule } from '@/modules/product/product.module';
import { OrderModule } from '@/modules/order/order.module';
import { StorageModule } from '@/modules/storage/storage.module';
import { UserModule } from '@/modules/user/user.module';
import { CartModule } from '@/modules/cart/cart.module';
import { CouponModule } from '@/modules/coupon/coupon.module';
import { ReviewModule } from '@/modules/review/review.module';
import { LogisticsModule } from '@/modules/logistics/logistics.module';
import { MessageModule } from '@/modules/message/message.module';
import { AnalyticsModule } from '@/modules/analytics/analytics.module';
import { AdminModule } from '@/modules/admin/admin.module';

@Module({
  imports: [
    ConstitutionModule,
    ProductModule,
    OrderModule,
    StorageModule,
    UserModule,
    CartModule,
    CouponModule,
    ReviewModule,
    LogisticsModule,
    MessageModule,
    AnalyticsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
