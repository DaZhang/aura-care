import { Injectable } from '@nestjs/common';

// 用户数据存储
const USERS: Record<string, any> = {};

// 会员等级类型
export interface MemberLevel {
  id: string;
  name: string;
  threshold: number;
  discount: number;
  freeShipping: boolean;
  pointsMultiplier: number;
  benefits: string[];
  icon: string;
}

// 会员等级配置

// 会员等级配置（修正后）
const MEMBER_LEVELS: MemberLevel[] = [
  { 
    id: 'silver', 
    name: '白银会员', 
    threshold: 500, 
    discount: 0.98, 
    freeShipping: true,
    pointsMultiplier: 1.2,
    benefits: ['98折优惠', '满299包邮', '专属优惠券', '积分1.2倍'],
    icon: '🥈'
  },
  { 
    id: 'gold', 
    name: '黄金会员', 
    threshold: 2000, 
    discount: 0.95, 
    freeShipping: true,
    pointsMultiplier: 1.5,
    benefits: ['95折优惠', '包邮', '专属优惠券', '积分1.5倍', '优先发货'],
    icon: '🥇'
  },
  { 
    id: 'diamond', 
    name: '钻石会员', 
    threshold: 5000, 
    discount: 0.90, 
    freeShipping: true,
    pointsMultiplier: 2,
    benefits: ['9折优惠', '包邮', '生日礼遇', '积分2倍', '专属客服'],
    icon: '💎'
  },
];

// 积分记录存储
const POINTS_RECORDS: Record<string, any[]> = {};

// 签到记录
const SIGN_IN_RECORDS: Record<string, any> = {};

// 积分规则
const POINTS_RULES = {
  // 消费积分：1元 = 20积分
  consumePerYuan: 20,
  // 签到积分
  signIn: {
    base: 1,
    continuousBonus: 5, // 连续7天额外奖励
  },
  // 评价积分
  review: {
    base: 10,
    withImage: 20,
  },
  // 邀请积分
  invite: 50,
};

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
        memberLevel: null,
        memberId: null,
        points: 0,
        balance: 0,
        totalConsume: 0,
        signInDays: 0,
        lastSignInDate: null,
        createTime: new Date().toISOString(),
        lastLoginTime: new Date().toISOString(),
      };
      USERS[openid] = user;
      POINTS_RECORDS[openid] = [];
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
    
    // 计算当前会员等级
    const memberInfo = this.calculateMemberLevel(user.totalConsume);
    user.memberId = memberInfo.currentLevel?.id || null;
    user.memberLevel = memberInfo.currentLevel?.name || null;
    
    return { code: 200, data: user, message: 'success' };
  }

  // 根据累计消费计算会员等级
  calculateMemberLevel(totalConsume: number): { currentLevel: MemberLevel | null; nextLevel: MemberLevel | null } {
    let currentLevel: MemberLevel | null = null;
    let nextLevel: MemberLevel | null = null;

    for (let i = MEMBER_LEVELS.length - 1; i >= 0; i--) {
      if (totalConsume >= MEMBER_LEVELS[i].threshold) {
        currentLevel = MEMBER_LEVELS[i];
        nextLevel = i < MEMBER_LEVELS.length - 1 ? MEMBER_LEVELS[i + 1] : null;
        break;
      }
    }

    // 如果没有等级，下一个等级是白银
    if (!currentLevel) {
      nextLevel = MEMBER_LEVELS[0];
    }

    return { currentLevel, nextLevel };
  }

  // 获取会员等级信息
  async getMemberLevel(openid: string) {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }

    const { currentLevel, nextLevel } = this.calculateMemberLevel(user.totalConsume);
    const pointsToNext = nextLevel ? nextLevel.threshold - user.totalConsume : 0;

    return {
      code: 200,
      data: {
        currentLevel,
        nextLevel,
        pointsToNext,
        totalConsume: user.totalConsume,
        memberLevels: MEMBER_LEVELS,
      },
      message: 'success',
    };
  }

  // 获取积分信息
  async getPoints(openid: string) {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }

    const { currentLevel, nextLevel } = this.calculateMemberLevel(user.totalConsume);
    const records = POINTS_RECORDS[openid] || [];
    const signInInfo = SIGN_IN_RECORDS[openid] || { days: 0, lastDate: null };

    return {
      code: 200,
      data: {
        points: user.points,
        totalConsume: user.totalConsume,
        currentLevel,
        nextLevel,
        signInDays: signInInfo.days,
        lastSignInDate: signInInfo.lastDate,
        records: records.slice(0, 50), // 最近50条记录
        rules: POINTS_RULES,
      },
      message: 'success',
    };
  }

  // 签到
  async signIn(openid: string) {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }

    const today = new Date().toISOString().split('T')[0];
    const signInInfo = SIGN_IN_RECORDS[openid] || { days: 0, lastDate: null };
    
    // 检查今天是否已签到
    if (signInInfo.lastDate === today) {
      return { code: 400, data: null, message: '今日已签到' };
    }

    // 计算连续签到天数
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (signInInfo.lastDate === yesterday) {
      signInInfo.days += 1;
    } else {
      signInInfo.days = 1;
    }
    signInInfo.lastDate = today;
    SIGN_IN_RECORDS[openid] = signInInfo;

    // 计算积分
    let pointsEarned = POINTS_RULES.signIn.base;
    let bonusDesc = '';
    
    // 连续7天额外奖励
    if (signInInfo.days >= 7) {
      pointsEarned += POINTS_RULES.signIn.continuousBonus;
      bonusDesc = `（连续签到7天额外+${POINTS_RULES.signIn.continuousBonus}）`;
    }

    // 会员等级倍数
    const { currentLevel } = this.calculateMemberLevel(user.totalConsume);
    if (currentLevel) {
      pointsEarned = Math.floor(pointsEarned * currentLevel.pointsMultiplier);
      bonusDesc += ` ${currentLevel.name}${currentLevel.pointsMultiplier}倍`;
    }

    user.points += pointsEarned;

    // 添加积分记录
    this.addPointsRecord(openid, {
      type: 'earn',
      title: '每日签到',
      points: pointsEarned,
      description: `签到成功 +${pointsEarned}积分${bonusDesc}`,
    });

    return {
      code: 200,
      data: {
        pointsEarned,
        totalPoints: user.points,
        continuousDays: signInInfo.days,
        hasBonus: signInInfo.days >= 7,
        memberMultiplier: currentLevel?.pointsMultiplier || 1,
      },
      message: '签到成功',
    };
  }

  // 添加积分
  async addPoints(openid: string, points: number, reason: string, type: 'earn' | 'spend' = 'earn') {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }

    if (type === 'earn') {
      user.points += points;
    } else {
      if (user.points < points) {
        return { code: 400, data: null, message: '积分不足' };
      }
      user.points -= points;
    }

    // 更新会员等级（根据累计消费）
    const { currentLevel } = this.calculateMemberLevel(user.totalConsume);
    user.memberId = currentLevel?.id || null;
    user.memberLevel = currentLevel?.name || null;

    // 添加积分记录
    this.addPointsRecord(openid, {
      type,
      title: reason,
      points: type === 'earn' ? points : -points,
      description: '',
    });

    return {
      code: 200,
      data: { points: user.points, memberLevel: user.memberLevel, memberId: user.memberId },
      message: type === 'earn' ? '积分添加成功' : '积分扣减成功',
    };
  }

  // 消费获得积分
  async consumeEarnPoints(openid: string, amount: number, orderId: string) {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }

    // 计算积分：1元 = 20积分
    let pointsEarned = Math.floor(amount * POINTS_RULES.consumePerYuan);

    // 会员等级倍数
    const { currentLevel } = this.calculateMemberLevel(user.totalConsume);
    if (currentLevel) {
      pointsEarned = Math.floor(pointsEarned * currentLevel.pointsMultiplier);
    }

    user.points += pointsEarned;
    user.totalConsume += amount;

    // 更新会员等级
    const newMember = this.calculateMemberLevel(user.totalConsume);
    user.memberId = newMember.currentLevel?.id || null;
    user.memberLevel = newMember.currentLevel?.name || null;

    // 添加积分记录
    this.addPointsRecord(openid, {
      type: 'earn',
      title: '消费得积分',
      points: pointsEarned,
      description: `消费¥${amount.toFixed(2)} ${newMember.currentLevel ? `(${newMember.currentLevel.name}${newMember.currentLevel.pointsMultiplier}倍)` : ''}`,
    });

    // 检查是否升级
    const upgraded = newMember.currentLevel?.id !== (user.memberId || user.memberLevel);

    return {
      code: 200,
      data: {
        pointsEarned,
        totalPoints: user.points,
        totalConsume: user.totalConsume,
        currentLevel: newMember.currentLevel,
        nextLevel: newMember.nextLevel,
        upgraded,
      },
      message: '积分获得成功',
    };
  }

  // 评价获得积分
  async reviewEarnPoints(openid: string, orderId: string, hasImage: boolean = false) {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }

    let pointsEarned = hasImage ? POINTS_RULES.review.withImage : POINTS_RULES.review.base;

    // 会员等级倍数
    const { currentLevel } = this.calculateMemberLevel(user.totalConsume);
    if (currentLevel) {
      pointsEarned = Math.floor(pointsEarned * currentLevel.pointsMultiplier);
    }

    user.points += pointsEarned;

    this.addPointsRecord(openid, {
      type: 'earn',
      title: '商品评价',
      points: pointsEarned,
      description: hasImage ? '带图评价额外奖励' : '',
    });

    return {
      code: 200,
      data: { pointsEarned, totalPoints: user.points },
      message: '评价积分获得成功',
    };
  }

  // 邀请获得积分
  async inviteEarnPoints(openid: string, invitedOpenid: string) {
    const user = USERS[openid];
    if (!user) {
      return { code: 404, data: null, message: '用户不存在' };
    }

    let pointsEarned = POINTS_RULES.invite;

    // 会员等级倍数
    const { currentLevel } = this.calculateMemberLevel(user.totalConsume);
    if (currentLevel) {
      pointsEarned = Math.floor(pointsEarned * currentLevel.pointsMultiplier);
    }

    user.points += pointsEarned;

    this.addPointsRecord(openid, {
      type: 'earn',
      title: '邀请好友',
      points: pointsEarned,
      description: '好友首单后奖励',
    });

    return {
      code: 200,
      data: { pointsEarned, totalPoints: user.points },
      message: '邀请积分获得成功',
    };
  }

  // 添加积分记录
  private addPointsRecord(openid: string, record: any) {
    if (!POINTS_RECORDS[openid]) {
      POINTS_RECORDS[openid] = [];
    }
    POINTS_RECORDS[openid].unshift({
      id: Date.now().toString(),
      ...record,
      date: new Date().toISOString(),
    });
    // 只保留最近100条记录
    if (POINTS_RECORDS[openid].length > 100) {
      POINTS_RECORDS[openid] = POINTS_RECORDS[openid].slice(0, 100);
    }
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
          id: level.id,
          name: level.name,
          icon: level.icon,
          threshold: level.threshold,
          count: users.filter((u: any) => u.memberId === level.id).length,
        })),
        memberLevels: MEMBER_LEVELS,
      },
      message: 'success',
    };
  }
}
