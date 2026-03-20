import { Controller, Get, Post, Delete, Body, Headers, Param, Query } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // 创建评价
  @Post('create')
  async createReview(
    @Headers('x-user-id') userId: string,
    @Body() review: any,
  ) {
    console.log('[ReviewController] createReview - userId:', userId);
    return this.reviewService.createReview(userId, review);
  }

  // 获取商品评价
  @Get('product/:productId')
  async getProductReviews(
    @Param('productId') productId: string,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    console.log('[ReviewController] getProductReviews - productId:', productId);
    return this.reviewService.getProductReviews(productId, Number(page), Number(pageSize));
  }

  // 获取用户评价
  @Get('my')
  async getUserReviews(
    @Headers('x-user-id') userId: string,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    console.log('[ReviewController] getUserReviews - userId:', userId);
    return this.reviewService.getUserReviews(userId, Number(page), Number(pageSize));
  }

  // 点赞评价
  @Post('like')
  async likeReview(@Body('reviewId') reviewId: string) {
    console.log('[ReviewController] likeReview - reviewId:', reviewId);
    return this.reviewService.likeReview(reviewId);
  }

  // 删除评价
  @Delete('delete')
  async deleteReview(
    @Headers('x-user-id') userId: string,
    @Body('reviewId') reviewId: string,
  ) {
    console.log('[ReviewController] deleteReview - userId:', userId, 'reviewId:', reviewId);
    return this.reviewService.deleteReview(userId, reviewId);
  }

  // 管理后台：获取所有评价
  @Get('admin/list')
  async getAllReviews(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Query('status') status?: string,
  ) {
    return this.reviewService.getAllReviews(Number(page), Number(pageSize), status);
  }

  // 管理后台：更新评价状态
  @Post('admin/status')
  async toggleReviewStatus(
    @Body() body: { reviewId: string; status: string },
  ) {
    console.log('[ReviewController] toggleReviewStatus - reviewId:', body.reviewId);
    return this.reviewService.toggleReviewStatus(body.reviewId, body.status);
  }

  // 统计
  @Get('admin/stats')
  async getReviewStats() {
    return this.reviewService.getReviewStats();
  }
}
