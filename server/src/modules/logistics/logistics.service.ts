import { Injectable } from '@nestjs/common';

// 物流公司
const LOGISTICS_COMPANIES = [
  { code: 'SF', name: '顺丰速运', phone: '95338' },
  { code: 'YTO', name: '圆通速递', phone: '95554' },
  { code: 'ZTO', name: '中通快递', phone: '95311' },
  { code: 'STO', name: '申通快递', phone: '95543' },
  { code: 'YD', name: '韵达快递', phone: '95546' },
  { code: 'EMS', name: 'EMS', phone: '11183' },
  { code: 'JD', name: '京东物流', phone: '950616' },
];

// 物流信息存储
const LOGISTICS_INFO: Record<string, any> = {};

@Injectable()
export class LogisticsService {
  // 创建物流信息
  async createLogistics(orderId: string, info: any) {
    const logisticsId = `LG${Date.now()}`;
    
    const logistics = {
      id: logisticsId,
      orderId,
      companyCode: info.companyCode,
      companyName: this.getCompanyName(info.companyCode),
      trackingNo: info.trackingNo,
      status: 'pending', // pending: 待揽件, picked: 已揽件, transit: 运输中, delivered: 已签收
      traces: [
        {
          time: new Date().toISOString(),
          status: 'pending',
          description: '商家已发货，等待快递揽收',
        },
      ],
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
    };

    LOGISTICS_INFO[orderId] = logistics;

    return {
      code: 200,
      data: logistics,
      message: '创建成功',
    };
  }

  // 获取物流信息
  async getLogistics(orderId: string) {
    const logistics = LOGISTICS_INFO[orderId];
    if (!logistics) {
      // 返回模拟数据
      return {
        code: 200,
        data: {
          id: `LG${Date.now()}`,
          orderId,
          companyCode: 'SF',
          companyName: '顺丰速运',
          trackingNo: 'SF1234567890',
          status: 'transit',
          traces: [
            { time: '2024-01-15 14:30:00', status: 'delivered', description: '您的快件已签收，签收人：本人签收' },
            { time: '2024-01-15 10:20:00', status: 'transit', description: '快件正在派送中，派送员：张三，电话：13800138000' },
            { time: '2024-01-15 08:00:00', status: 'transit', description: '快件已到达 北京市朝阳区营业点' },
            { time: '2024-01-14 20:00:00', status: 'transit', description: '快件已到达 北京转运中心' },
            { time: '2024-01-14 16:00:00', status: 'picked', description: '快件已从 广州转运中心发出' },
            { time: '2024-01-14 14:00:00', status: 'picked', description: '快件已揽收，揽收员：李四' },
            { time: '2024-01-14 10:00:00', status: 'pending', description: '商家已发货，等待快递揽收' },
          ],
          createTime: '2024-01-14T10:00:00.000Z',
          updateTime: '2024-01-15T14:30:00.000Z',
        },
        message: 'success',
      };
    }

    return {
      code: 200,
      data: logistics,
      message: 'success',
    };
  }

  // 更新物流状态
  async updateLogisticsStatus(orderId: string, status: string, trace?: any) {
    const logistics = LOGISTICS_INFO[orderId];
    if (!logistics) {
      return { code: 404, data: null, message: '物流信息不存在' };
    }

    logistics.status = status;
    logistics.updateTime = new Date().toISOString();

    if (trace) {
      logistics.traces.unshift({
        time: new Date().toISOString(),
        status,
        ...trace,
      });
    }

    return { code: 200, data: logistics, message: '更新成功' };
  }

  // 模拟物流更新（用于测试）
  async simulateLogisticsUpdate(orderId: string) {
    const logistics = LOGISTICS_INFO[orderId];
    if (!logistics) {
      return { code: 404, data: null, message: '物流信息不存在' };
    }

    const statusFlow = ['pending', 'picked', 'transit', 'delivered'];
    const currentIndex = statusFlow.indexOf(logistics.status);
    
    if (currentIndex < statusFlow.length - 1) {
      const nextStatus = statusFlow[currentIndex + 1];
      const descriptions = {
        picked: '快件已揽收',
        transit: '快件正在运输中',
        delivered: '您的快件已签收',
      };

      logistics.status = nextStatus;
      logistics.traces.unshift({
        time: new Date().toISOString(),
        status: nextStatus,
        description: descriptions[nextStatus],
      });
      logistics.updateTime = new Date().toISOString();
    }

    return { code: 200, data: logistics, message: '更新成功' };
  }

  // 获取物流公司列表
  async getLogisticsCompanies() {
    return {
      code: 200,
      data: LOGISTICS_COMPANIES,
      message: 'success',
    };
  }

  // 根据快递单号自动识别物流公司
  async recognizeCompany(trackingNo: string) {
    // 简单识别规则
    if (trackingNo.startsWith('SF')) {
      return { code: 200, data: { code: 'SF', name: '顺丰速运' }, message: 'success' };
    }
    if (trackingNo.startsWith('YT')) {
      return { code: 200, data: { code: 'YTO', name: '圆通速递' }, message: 'success' };
    }
    if (trackingNo.startsWith('7') || trackingNo.startsWith('ZT')) {
      return { code: 200, data: { code: 'ZTO', name: '中通快递' }, message: 'success' };
    }
    if (trackingNo.startsWith('ST')) {
      return { code: 200, data: { code: 'STO', name: '申通快递' }, message: 'success' };
    }
    if (trackingNo.startsWith('YD')) {
      return { code: 200, data: { code: 'YD', name: '韵达快递' }, message: 'success' };
    }
    if (trackingNo.startsWith('JD')) {
      return { code: 200, data: { code: 'JD', name: '京东物流' }, message: 'success' };
    }
    
    return { code: 200, data: null, message: '无法识别' };
  }

  // 获取物流公司名称
  private getCompanyName(code: string): string {
    const company = LOGISTICS_COMPANIES.find(c => c.code === code);
    return company?.name || code;
  }
}
