import { Injectable } from '@nestjs/common';

// 用户数据存储
const USERS: Record<string, any> = {};

// 会员等级配置
const MEMBER_LEVELS = [
  { level: 1, name: '普通会员', minPoints: 0, discount: 1.0, benefits: ['基础服务'] },
  { level: 2, name: '银卡会员', minPoints: 100, discount: 0.98, benefits: ['基础服务', '生日礼遇', '专属客服'] },
  { level: 3, name: '金卡会员', minPoints: 500, discount: 0.95, benefits: ['基础服务', '生日礼遇', '专属客服', '优先发货'] },
  { level: 4, name: '铂金会员', minPoints: 1000, discount: 0.92, benefits: ['基础服务', '生日礼遇', '专属客服', '优先发货', '专属折扣'] },
  { level: 5, name: '钻石会员', minPoints: 2000, discount: 0.88, benefits: ['基础服务', '生日礼遇', '专属客服', '优先发货', '专属折扣', '免费包邮'] },
];

@Injectable()
export class UserService {
  // 微信登录
  async wechatLogin(code: string) {
    // 模拟微信登录，实际需要调用微信API
    const openid = `wx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const sessionKey = `sk_${Math.random().toString(36).substr(2, 16)}`;
    
    // 创建或获取用户
    let user = USERS[openid];
    if (!user) {
      user = {
        id: openid,
        openid,
        nickname: '微信用户',
        avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        phone: '',
        memberLevel: 1,
        points: 0,
        balance: 0,
        createTime: new Date().toISOString(),
        lastLoginTime: new Date().toISOString(),
      };
      USERS[openid] = user;
    } else {
      user.lastLoginTime = new Date().toISOString();
    }

    return {
      code: 200,
      data: {
        token: this.generateToken(openid),
        userInfo: user,
      },
      message: '登录成功',
    };
  }

  // 更新用户信息
  async updateUserInfo(openid: string, userInfo: any) {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }

    Object.assign(user, userInfo, { updateTime: new Date().toISOString() });
    return { code: 200, data: user, message: '更新成功' };
  }

  // 获取用户信息
  async getUserInfo(openid: string) {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }
    return { code: 200, data: user, message: 'success' };
  }

  // 获取会员等级信息
  async getMemberLevel(openid: string) {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }

    const currentLevel = MEMBER_LEVELS.find((l, index) => {
      const nextLevel = MEMBER_LEVELS[index + 1];
      return user.points >= l.minPoints && (!nextLevel || user.points < nextLevel.minPoints);
    }) || MEMBER_LEVELS[0];

    const nextLevel = MEMBER_LEVELS.find(l => l.minPoints > user.points);
    const pointsToNext = nextLevel ? nextLevel.minPoints - user.points : 0;

    return {
      code: 200,
      data: {
        currentLevel,
        nextLevel,
        pointsToNext,
        memberLevels: MEMBER_LEVELS,
      },
      message: 'success',
    };
  }

  // 添加积分
  async addPoints(openid: string, points: number, reason: string) {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }

    user.points += points;
    
    // 更新会员等级
    for (let i = MEMBER_LEVELS.length - 1; i >= 0; i--) {
      if (user.points >= MEMBER_LEVELS[i].minPoints) {
        user.memberLevel = MEMBER_LEVELS[i].level;
        break;
      }
    }

    return {
      code: 200,
      data: { points: user.points, memberLevel: user.memberLevel },
      message: '积分添加成功',
    };
  }

  // 生成Token
  private generateToken(openid: string): string {
    return `token_${openid}_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
  }

  // 验证Token
  verifyToken(token: string): string | null {
    // 简单验证，实际应使用JWT
    const match = token.match(/^token_([^_]+)_/);
    return match ? match[1] : null;
  }

  // 获取所有用户（管理后台用）
  async getAllUsers(page: number = 1, pageSize: number = 10) {
    const users = Object.values(USERS);
    const start = (page - 1) * pageSize;
    const list = users.slice(start, start + pageSize);
    
    return {
      code: 200,
      data: {
        list,
        total: users.length,
        page,
        pageSize,
      },
      message: 'success',
    };
  }

  // 用户统计
  async getUserStats() {
    const users = Object.values(USERS);
    return {
      code: 200,
      data: {
        total: users.length,
        byLevel: MEMBER_LEVELS.map(level => ({
          level: level.level,
          name: level.name,
          count: users.filter((u: any) => u.memberLevel === level.level).length,
        })),
      },
      message: 'success',
    };
  }
}
