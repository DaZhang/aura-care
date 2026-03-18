import { Injectable } from '@nestjs/common';

// 九大体质类型
const CONSTITUTION_TYPES = [
  { id: 'peaceful', name: '平和质', color: '#10B981', bg: '#D1FAE5', description: '阴阳气血调和，体态适中、面色红润、精力充沛' },
  { id: 'qixu', name: '气虚质', color: '#F59E0B', bg: '#FEF3C7', description: '元气不足，易疲乏、气短、自汗' },
  { id: 'yangxu', name: '阳虚质', color: '#EF4444', bg: '#FEE2E2', description: '阳气不足，畏寒怕冷、手足不温' },
  { id: 'yinxu', name: '阴虚质', color: '#8B5CF6', bg: '#EDE9FE', description: '阴液亏少，口燥咽干、手足心热' },
  { id: 'tanshi', name: '痰湿质', color: '#6B7280', bg: '#F3F4F6', description: '痰湿凝聚，形体肥胖、腹部肥满' },
  { id: 'shire', name: '湿热质', color: '#F97316', bg: '#FFEDD5', description: '湿热内蕴，面垢油光、易生痤疮' },
  { id: 'xueyu', name: '血瘀质', color: '#DC2626', bg: '#FEE2E2', description: '血行不畅，肤色晦暗、易有瘀斑' },
  { id: 'qiyu', name: '气郁质', color: '#6366F1', bg: '#E0E7FF', description: '气机郁滞，情绪低落、易焦虑' },
  { id: 'tebing', name: '特禀质', color: '#EC4899', bg: '#FCE7F3', description: '先天失常，易过敏、有遗传倾向' },
];

// 测试题目
const TEST_QUESTIONS = [
  {
    id: 1,
    question: '您是否容易感到疲乏无力？',
    options: [
      { text: '经常如此', score: { qixu: 3, yangxu: 2 } },
      { text: '偶尔这样', score: { qixu: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: { yinxu: 1 } },
    ],
  },
  {
    id: 2,
    question: '您是否容易手脚冰凉？',
    options: [
      { text: '经常如此', score: { yangxu: 3, xueyu: 1 } },
      { text: '偶尔这样', score: { yangxu: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: { yinxu: 1 } },
    ],
  },
  {
    id: 3,
    question: '您是否容易出汗，尤其是活动后？',
    options: [
      { text: '经常如此', score: { qixu: 3 } },
      { text: '偶尔这样', score: { qixu: 1 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 4,
    question: '您是否容易口干舌燥？',
    options: [
      { text: '经常如此', score: { yinxu: 3, shire: 1 } },
      { text: '偶尔这样', score: { yinxu: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: { tanshi: 1 } },
    ],
  },
  {
    id: 5,
    question: '您是否容易情绪低落或焦虑？',
    options: [
      { text: '经常如此', score: { qiyu: 3 } },
      { text: '偶尔这样', score: { qiyu: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 6,
    question: '您是否容易皮肤过敏或出现皮疹？',
    options: [
      { text: '经常如此', score: { tebing: 3, shire: 1 } },
      { text: '偶尔这样', score: { tebing: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 7,
    question: '您是否容易面部油腻或长痘？',
    options: [
      { text: '经常如此', score: { shire: 3, tanshi: 1 } },
      { text: '偶尔这样', score: { shire: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 8,
    question: '您是否容易身体沉重或困倦？',
    options: [
      { text: '经常如此', score: { tanshi: 3, shire: 1 } },
      { text: '偶尔这样', score: { tanshi: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 9,
    question: '您是否容易头痛或身体疼痛？',
    options: [
      { text: '经常如此', score: { xueyu: 3, qiyu: 1 } },
      { text: '偶尔这样', score: { xueyu: 2 } },
      { text: '很少这样', score: {} },
      { text: '从不这样', score: {} },
    ],
  },
  {
    id: 10,
    question: '您整体感觉精力充沛吗？',
    options: [
      { text: '非常充沛', score: { peaceful: 3 } },
      { text: '比较充沛', score: { peaceful: 2 } },
      { text: '一般', score: {} },
      { text: '不太充沛', score: { qixu: 1, yangxu: 1 } },
    ],
  },
];

// 体质详细信息
const CONSTITUTION_DETAILS: Record<string, any> = {
  peaceful: {
    id: 'peaceful',
    name: '平和质',
    color: '#10B981',
    bg: '#D1FAE5',
    description: '阴阳气血调和，体态适中、面色红润、精力充沛',
    features: ['体态适中', '面色红润', '精力充沛', '睡眠良好', '二便正常'],
    spice: '檀香+沉香+薰衣草',
    spiceInfo: [
      { name: '檀香', effect: '理气和胃，安神定志' },
      { name: '沉香', effect: '行气止痛，温中止呕' },
      { name: '薰衣草', effect: '舒缓神经，改善睡眠' },
    ],
    advice: ['保持规律作息', '适度运动', '饮食均衡', '保持心情愉悦'],
  },
  qixu: {
    id: 'qixu',
    name: '气虚质',
    color: '#F59E0B',
    bg: '#FEF3C7',
    description: '元气不足，易疲乏、气短、自汗',
    features: ['容易疲乏', '声音低弱', '易出汗', '易感冒', '舌淡红'],
    spice: '黄芪+人参+白术',
    spiceInfo: [
      { name: '黄芪', effect: '补气升阳，固表止汗' },
      { name: '人参', effect: '大补元气，复脉固脱' },
      { name: '白术', effect: '健脾益气，燥湿利水' },
    ],
    advice: ['避免剧烈运动', '注意保暖', '多吃补气食物', '充足休息'],
  },
  yangxu: {
    id: 'yangxu',
    name: '阳虚质',
    color: '#EF4444',
    bg: '#FEE2E2',
    description: '阳气不足，畏寒怕冷、手足不温',
    features: ['畏寒怕冷', '手足不温', '面色柔白', '口淡不渴', '喜热饮'],
    spice: '肉桂+干姜+杜仲',
    spiceInfo: [
      { name: '肉桂', effect: '补火助阳，引火归元' },
      { name: '干姜', effect: '温中散寒，回阳通脉' },
      { name: '杜仲', effect: '补肝肾，强筋骨' },
    ],
    advice: ['注意保暖', '多晒太阳', '避免寒凉食物', '适量运动'],
  },
  yinxu: {
    id: 'yinxu',
    name: '阴虚质',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    description: '阴液亏少，口燥咽干、手足心热',
    features: ['口燥咽干', '手足心热', '面色潮红', '易失眠', '大便干燥'],
    spice: '麦冬+石斛+百合',
    spiceInfo: [
      { name: '麦冬', effect: '养阴润肺，益胃生津' },
      { name: '石斛', effect: '滋阴清热，益胃生津' },
      { name: '百合', effect: '养阴润肺，清心安神' },
    ],
    advice: ['避免熬夜', '少吃辛辣', '多吃滋阴食物', '保持心情平和'],
  },
  tanshi: {
    id: 'tanshi',
    name: '痰湿质',
    color: '#6B7280',
    bg: '#F3F4F6',
    description: '痰湿凝聚，形体肥胖、腹部肥满',
    features: ['形体肥胖', '腹部肥满', '口黏苔腻', '身重不爽', '喜食肥甘'],
    spice: '陈皮+茯苓+苍术',
    spiceInfo: [
      { name: '陈皮', effect: '理气健脾，燥湿化痰' },
      { name: '茯苓', effect: '利水渗湿，健脾宁心' },
      { name: '苍术', effect: '燥湿健脾，祛风散寒' },
    ],
    advice: ['控制饮食', '加强运动', '少吃甜食油腻', '规律作息'],
  },
  shire: {
    id: 'shire',
    name: '湿热质',
    color: '#F97316',
    bg: '#FFEDD5',
    description: '湿热内蕴，面垢油光、易生痤疮',
    features: ['面垢油光', '易生痤疮', '口苦口干', '身重困倦', '大便黏滞'],
    spice: '藿香+佩兰+荷叶',
    spiceInfo: [
      { name: '藿香', effect: '化湿醒脾，解暑发表' },
      { name: '佩兰', effect: '化湿解暑，醒脾开胃' },
      { name: '荷叶', effect: '清热解暑，升发清阳' },
    ],
    advice: ['清淡饮食', '避免湿热环境', '多吃清热食物', '适量运动'],
  },
  xueyu: {
    id: 'xueyu',
    name: '血瘀质',
    color: '#DC2626',
    bg: '#FEE2E2',
    description: '血行不畅，肤色晦暗、易有瘀斑',
    features: ['肤色晦暗', '易有瘀斑', '口唇暗淡', '易有疼痛', '舌质暗'],
    spice: '丹参+红花+川芎',
    spiceInfo: [
      { name: '丹参', effect: '活血祛瘀，通经止痛' },
      { name: '红花', effect: '活血通经，散瘀止痛' },
      { name: '川芎', effect: '活血行气，祛风止痛' },
    ],
    advice: ['避免久坐', '适量运动', '保持心情舒畅', '注意保暖'],
  },
  qiyu: {
    id: 'qiyu',
    name: '气郁质',
    color: '#6366F1',
    bg: '#E0E7FF',
    description: '气机郁滞，情绪低落、易焦虑',
    features: ['情绪低落', '易焦虑', '胸闷叹气', '咽喉有异物感', '易失眠'],
    spice: '玫瑰+合欢花+佛手',
    spiceInfo: [
      { name: '玫瑰', effect: '疏肝解郁，理气止痛' },
      { name: '合欢花', effect: '解郁安神，理气开胃' },
      { name: '佛手', effect: '疏肝理气，和胃止痛' },
    ],
    advice: ['保持心情愉悦', '多参加社交活动', '适量运动', '学会释放压力'],
  },
  tebing: {
    id: 'tebing',
    name: '特禀质',
    color: '#EC4899',
    bg: '#FCE7F3',
    description: '先天失常，易过敏、有遗传倾向',
    features: ['易过敏', '易打喷嚏', '皮肤敏感', '有遗传倾向', '易患哮喘'],
    spice: '黄芪+防风+甘草',
    spiceInfo: [
      { name: '黄芪', effect: '补气固表，托毒排脓' },
      { name: '防风', effect: '祛风解表，胜湿止痛' },
      { name: '甘草', effect: '补脾益气，清热解毒' },
    ],
    advice: ['避免过敏原', '增强体质', '注意饮食', '定期体检'],
  },
};

// 模拟用户数据存储
const userProfiles: Map<string, any> = new Map();

@Injectable()
export class ConstitutionService {
  getConstitutionTypes() {
    return {
      code: 200,
      data: CONSTITUTION_TYPES,
      message: 'success',
    };
  }

  getTestQuestions() {
    return {
      code: 200,
      data: TEST_QUESTIONS,
      message: 'success',
    };
  }

  calculateConstitution(userId: string, answers: Record<string, number>) {
    // 计算得分最高的体质
    const sorted = Object.entries(answers).sort((a, b) => b[1] - a[1]);
    const topConstitution = sorted[0]?.[0] || 'peaceful';
    
    // 获取体质详情
    const detail = CONSTITUTION_DETAILS[topConstitution] || CONSTITUTION_DETAILS.peaceful;
    
    // 保存用户档案
    userProfiles.set(userId, {
      userId,
      constitution: topConstitution,
      score: sorted[0]?.[1] || 0,
      testedAt: new Date().toISOString(),
      detail,
    });

    return {
      code: 200,
      data: {
        type: topConstitution,
        score: sorted[0]?.[1] || 0,
        detail,
      },
      message: 'success',
    };
  }

  getUserProfile(userId: string) {
    const profile = userProfiles.get(userId);
    if (!profile) {
      return {
        code: 404,
        data: null,
        message: '用户档案不存在',
      };
    }
    return {
      code: 200,
      data: profile,
      message: 'success',
    };
  }

  getConstitutionDetail(type: string) {
    const detail = CONSTITUTION_DETAILS[type];
    if (!detail) {
      return {
        code: 404,
        data: null,
        message: '体质类型不存在',
      };
    }
    return {
      code: 200,
      data: detail,
      message: 'success',
    };
  }
}
