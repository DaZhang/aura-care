import { Injectable } from '@nestjs/common';

// 商品数据
const PRODUCTS: Record<string, any> = {
  peaceful: {
    id: 'peaceful',
    name: '平和养生手串',
    price: 298,
    originalPrice: 398,
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=800&fit=crop',
    ],
    constitution: '平和质',
    constitutionColor: '#10B981',
    constitutionBg: '#D1FAE5',
    description: '专为平和质人群设计，选用檀香、沉香、薰衣草等天然香料，帮助维持身体平衡，安神定志。',
    spiceInfo: [
      { name: '檀香', effect: '理气和胃，安神定志' },
      { name: '沉香', effect: '行气止痛，温中止呕' },
      { name: '薰衣草', effect: '舒缓神经，改善睡眠' },
    ],
    features: ['天然香料', '手工编织', '可定制刻字', '养生档案'],
    material: ['紫檀木', '沉香木', '白水晶'],
    sales: 1280,
    rating: 4.9,
    reviews: [
      { user: '清风明月', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', content: '手串做工精致，香味淡雅持久，很喜欢！', rating: 5, date: '2024-01-15' },
    ],
  },
  qixu: {
    id: 'qixu',
    name: '补气安神手串',
    price: 358,
    originalPrice: 458,
    images: ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=800&fit=crop'],
    constitution: '气虚质',
    constitutionColor: '#F59E0B',
    constitutionBg: '#FEF3C7',
    description: '专为气虚质人群设计，选用黄芪、人参、白术等补气药材，帮助提升元气，改善疲劳。',
    spiceInfo: [
      { name: '黄芪', effect: '补气升阳，固表止汗' },
      { name: '人参', effect: '大补元气，复脉固脱' },
      { name: '白术', effect: '健脾益气，燥湿利水' },
    ],
    features: ['天然香料', '补气养生', '可定制刻字', '养生档案'],
    material: ['黄花梨', '蜜蜡', '翡翠'],
    sales: 856,
    rating: 4.8,
    reviews: [],
  },
  yangxu: {
    id: 'yangxu',
    name: '温阳暖身手串',
    price: 328,
    originalPrice: 428,
    images: ['https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop'],
    constitution: '阳虚质',
    constitutionColor: '#EF4444',
    constitutionBg: '#FEE2E2',
    description: '专为阳虚质人群设计，选用肉桂、干姜、杜仲等温阳药材，帮助驱寒暖身，增强体质。',
    spiceInfo: [
      { name: '肉桂', effect: '补火助阳，引火归元' },
      { name: '干姜', effect: '温中散寒，回阳通脉' },
      { name: '杜仲', effect: '补肝肾，强筋骨' },
    ],
    features: ['天然香料', '温阳散寒', '可定制刻字', '养生档案'],
    material: ['红玛瑙', '石榴石', '朱砂'],
    sales: 723,
    rating: 4.9,
    reviews: [],
  },
  yinxu: {
    id: 'yinxu',
    name: '滋阴润燥手串',
    price: 368,
    originalPrice: 468,
    images: ['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop'],
    constitution: '阴虚质',
    constitutionColor: '#8B5CF6',
    constitutionBg: '#EDE9FE',
    description: '专为阴虚质人群设计，选用麦冬、石斛、百合等滋阴药材，帮助润燥养阴，清热安神。',
    spiceInfo: [
      { name: '麦冬', effect: '养阴润肺，益胃生津' },
      { name: '石斛', effect: '滋阴清热，益胃生津' },
      { name: '百合', effect: '养阴润肺，清心安神' },
    ],
    features: ['天然香料', '滋阴润燥', '可定制刻字', '养生档案'],
    material: ['紫水晶', '月光石', '蓝宝石'],
    sales: 654,
    rating: 4.7,
    reviews: [],
  },
  tanshi: {
    id: 'tanshi',
    name: '祛湿化痰手串',
    price: 318,
    originalPrice: 418,
    images: ['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop'],
    constitution: '痰湿质',
    constitutionColor: '#6B7280',
    constitutionBg: '#F3F4F6',
    description: '专为痰湿质人群设计，选用陈皮、茯苓、苍术等祛湿药材，帮助化痰祛湿，轻身健体。',
    spiceInfo: [
      { name: '陈皮', effect: '理气健脾，燥湿化痰' },
      { name: '茯苓', effect: '利水渗湿，健脾宁心' },
      { name: '苍术', effect: '燥湿健脾，祛风散寒' },
    ],
    features: ['天然香料', '祛湿化痰', '可定制刻字', '养生档案'],
    material: ['青金石', '黑曜石', '虎眼石'],
    sales: 512,
    rating: 4.8,
    reviews: [],
  },
  shire: {
    id: 'shire',
    name: '清热利湿手串',
    price: 338,
    originalPrice: 438,
    images: ['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=800&fit=crop'],
    constitution: '湿热质',
    constitutionColor: '#F97316',
    constitutionBg: '#FFEDD5',
    description: '专为湿热质人群设计，选用藿香、佩兰、荷叶等清热药材，帮助清热利湿，调理体质。',
    spiceInfo: [
      { name: '藿香', effect: '化湿醒脾，解暑发表' },
      { name: '佩兰', effect: '化湿解暑，醒脾开胃' },
      { name: '荷叶', effect: '清热解暑，升发清阳' },
    ],
    features: ['天然香料', '清热利湿', '可定制刻字', '养生档案'],
    material: ['绿松石', '孔雀石', '翡翠'],
    sales: 478,
    rating: 4.7,
    reviews: [],
  },
  xueyu: {
    id: 'xueyu',
    name: '活血化瘀手串',
    price: 348,
    originalPrice: 448,
    images: ['https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop'],
    constitution: '血瘀质',
    constitutionColor: '#DC2626',
    constitutionBg: '#FEE2E2',
    description: '专为血瘀质人群设计，选用丹参、红花、川芎等活血药材，帮助活血化瘀，通经活络。',
    spiceInfo: [
      { name: '丹参', effect: '活血祛瘀，通经止痛' },
      { name: '红花', effect: '活血通经，散瘀止痛' },
      { name: '川芎', effect: '活血行气，祛风止痛' },
    ],
    features: ['天然香料', '活血化瘀', '可定制刻字', '养生档案'],
    material: ['红珊瑚', '红玛瑙', '石榴石'],
    sales: 389,
    rating: 4.9,
    reviews: [],
  },
  qiyu: {
    id: 'qiyu',
    name: '疏肝解郁手串',
    price: 328,
    originalPrice: 428,
    images: ['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop'],
    constitution: '气郁质',
    constitutionColor: '#6366F1',
    constitutionBg: '#E0E7FF',
    description: '专为气郁质人群设计，选用玫瑰、合欢花、佛手等疏肝药材，帮助疏肝解郁，调节情绪。',
    spiceInfo: [
      { name: '玫瑰', effect: '疏肝解郁，理气止痛' },
      { name: '合欢花', effect: '解郁安神，理气开胃' },
      { name: '佛手', effect: '疏肝理气，和胃止痛' },
    ],
    features: ['天然香料', '疏肝解郁', '可定制刻字', '养生档案'],
    material: ['紫水晶', '蓝宝石', '海蓝宝'],
    sales: 456,
    rating: 4.8,
    reviews: [],
  },
  tebing: {
    id: 'tebing',
    name: '固表御敏手串',
    price: 358,
    originalPrice: 458,
    images: ['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop'],
    constitution: '特禀质',
    constitutionColor: '#EC4899',
    constitutionBg: '#FCE7F3',
    description: '专为特禀质人群设计，选用黄芪、防风、甘草等固表药材，帮助益气固表，增强免疫。',
    spiceInfo: [
      { name: '黄芪', effect: '补气固表，托毒排脓' },
      { name: '防风', effect: '祛风解表，胜湿止痛' },
      { name: '甘草', effect: '补脾益气，清热解毒' },
    ],
    features: ['天然香料', '益气固表', '可定制刻字', '养生档案'],
    material: ['白水晶', '粉晶', '月光石'],
    sales: 312,
    rating: 4.7,
    reviews: [],
  },
};

// 香料数据
const SPICES = {
  core: [
    { id: 'tanxiang', name: '檀香', effect: '理气和胃，安神定志', color: '#8B4513' },
    { id: 'chenxiang', name: '沉香', effect: '行气止痛，温中止呕', color: '#2F4F4F' },
    { id: 'huangqi', name: '黄芪', effect: '补气升阳，固表止汗', color: '#DAA520' },
    { id: 'rougui', name: '肉桂', effect: '补火助阳，引火归元', color: '#CD853F' },
  ],
  auxiliary: [
    { id: 'xunyicao', name: '薰衣草', effect: '舒缓神经，改善睡眠', color: '#9370DB' },
    { id: 'meigui', name: '玫瑰', effect: '疏肝解郁，理气止痛', color: '#FF69B4' },
    { id: 'baihe', name: '百合', effect: '养阴润肺，清心安神', color: '#FFFACD' },
    { id: 'chenpi', name: '陈皮', effect: '理气健脾，燥湿化痰', color: '#FFA500' },
  ],
};

// 材质数据
const MATERIALS = [
  { id: 'zitan', name: '紫檀木', price: 0, color: '#8B0000', desc: '经典选择，温润如玉' },
  { id: 'huanghuali', name: '黄花梨', price: 100, color: '#DAA520', desc: '珍贵木种，纹理优美' },
  { id: 'baijing', name: '白水晶', price: 80, color: '#F0FFFF', desc: '纯净通透，能量纯净' },
  { id: 'zishuijing', name: '紫水晶', price: 120, color: '#9370DB', desc: '智慧之石，安神助眠' },
  { id: 'hongma', name: '红玛瑙', price: 60, color: '#B22222', desc: '热情活力，温暖护身' },
  { id: 'liuli', name: '琉璃', price: 50, color: '#87CEEB', desc: '流光溢彩，灵动优雅' },
];

@Injectable()
export class ProductService {
  getProductList(constitution?: string) {
    let products = Object.values(PRODUCTS);
    
    // 如果指定了体质类型，返回对应的商品
    if (constitution && PRODUCTS[constitution]) {
      products = [PRODUCTS[constitution]];
    }
    
    return {
      code: 200,
      data: products,
      message: 'success',
    };
  }

  getProductDetail(id: string) {
    const product = PRODUCTS[id];
    if (!product) {
      return {
        code: 404,
        data: null,
        message: '商品不存在',
      };
    }
    return {
      code: 200,
      data: product,
      message: 'success',
    };
  }

  getSpices() {
    return {
      code: 200,
      data: SPICES,
      message: 'success',
    };
  }

  getMaterials() {
    return {
      code: 200,
      data: MATERIALS,
      message: 'success',
    };
  }

  calculatePrice(material: string, engraving?: string, quantity: number = 1) {
    const basePrice = 298;
    const materialInfo = MATERIALS.find(m => m.id === material);
    const materialExtra = materialInfo?.price || 0;
    const engravingExtra = engraving && engraving.length > 0 ? 20 : 0;
    const totalPrice = (basePrice + materialExtra + engravingExtra) * quantity;

    return {
      code: 200,
      data: {
        basePrice,
        materialExtra,
        engravingExtra,
        quantity,
        totalPrice,
      },
      message: 'success',
    };
  }
}
