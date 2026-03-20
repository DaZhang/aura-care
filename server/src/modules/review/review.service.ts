import { Injectable } from '@nestjs/common';

// 评价数据
const REVIEWS: any[] = [];

@Injectable()
export class ReviewService {
  // 创建评价
  async createReview(userId: string, review: any) {
    const newReview = {
      id: `review_${Date.now()}`,
      userId,
      orderId: review.orderId,
      productId: review.productId,
      productName: review.productName,
      productImage: review.productImage,
      rating: review.rating,
      content: review.content,
      images: review.images || [],
      anonymous: review.anonymous || false,
      likes: 0,
      status: 'active', // active, hidden, deleted
      createTime: new Date().toISOString(),
      userNickname: review.userNickname || '匿名用户',
      userAvatar: review.userAvatar || '',
    };

    REVIEWS.unshift(newReview);

    return {
      code: 200,
      data: newReview,
      message: '评价成功',
    };
  }

  // 获取商品评价列表
  async getProductReviews(productId: string, page: number = 1, pageSize: number = 10) {
    const productReviews = REVIEWS.filter(r => r.productId === productId && r.status === 'active');
    
    const start = (page - 1) * pageSize;
    const list = productReviews.slice(start, start + pageSize);

    // 统计
    const total = productReviews.length;
    const avgRating = total > 0 
      ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
      : '0.0';
    const ratingDistribution = {
      5: productReviews.filter(r => r.rating === 5).length,
      4: productReviews.filter(r => r.rating === 4).length,
      3: productReviews.filter(r => r.rating === 3).length,
      2: productReviews.filter(r => r.rating === 2).length,
      1: productReviews.filter(r => r.rating === 1).length,
    };

    return {
      code: 200,
      data: {
        list,
        total,
        avgRating,
        ratingDistribution,
        page,
        pageSize,
      },
      message: 'success',
    };
  }

  // 获取用户评价列表
  async getUserReviews(userId: string, page: number = 1, pageSize: number = 10) {
    const userReviews = REVIEWS.filter(r => r.userId === userId);
    
    const start = (page - 1) * pageSize;
    const list = userReviews.slice(start, start + pageSize);

    return {
      code: 200,
      data: {
        list,
        total: userReviews.length,
        page,
        pageSize,
      },
      message: 'success',
    };
  }

  // 点赞评价
  async likeReview(reviewId: string) {
    const review = REVIEWS.find(r => r.id === reviewId);
    if (!review) {
      return { code: 404, data: null, message: '评价不存在' };
    }

    review.likes++;
    return { code: 200, data: { likes: review.likes }, message: 'success' };
  }

  // 删除评价
  async deleteReview(userId: string, reviewId: string) {
    const index = REVIEWS.findIndex(r => r.id === reviewId && r.userId === userId);
    if (index === -1) {
      return { code: 404, data: null, message: '评价不存在' };
    }

    REVIEWS[index].status = 'deleted';
    return { code: 200, data: null, message: '删除成功' };
  }

  // 管理后台：获取所有评价
  async getAllReviews(page: number = 1, pageSize: number = 10, status?: string) {
    let reviews = [...REVIEWS];
    
    if (status) {
      reviews = reviews.filter(r => r.status === status);
    }

    const start = (page - 1) * pageSize;
    const list = reviews.slice(start, start + pageSize);

    return {
      code: 200,
      data: {
        list,
        total: reviews.length,
        page,
        pageSize,
      },
      message: 'success',
    };
  }

  // 管理后台：隐藏/显示评价
  async toggleReviewStatus(reviewId: string, status: string) {
    const review = REVIEWS.find(r => r.id === reviewId);
    if (!review) {
      return { code: 404, data: null, message: '评价不存在' };
    }

    review.status = status;
    return { code: 200, data: null, message: '更新成功' };
  }

  // 统计
  async getReviewStats() {
    const activeReviews = REVIEWS.filter(r => r.status === 'active');
    return {
      code: 200,
      data: {
        total: REVIEWS.length,
        active: activeReviews.length,
        avgRating: activeReviews.length > 0
          ? (activeReviews.reduce((sum, r) => sum + r.rating, 0) / activeReviews.length).toFixed(1)
          : '0.0',
      },
      message: 'success',
    };
  }
}
