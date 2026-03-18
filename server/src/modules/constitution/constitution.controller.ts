import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConstitutionService } from './constitution.service';

@Controller('constitution')
export class ConstitutionController {
  constructor(private readonly constitutionService: ConstitutionService) {}

  // 获取所有体质类型
  @Get('types')
  async getConstitutionTypes() {
    return this.constitutionService.getConstitutionTypes();
  }

  // 获取体质测试题目
  @Get('questions')
  async getTestQuestions() {
    return this.constitutionService.getTestQuestions();
  }

  // 提交测试结果
  @Post('submit-test')
  async submitTest(@Body() body: { userId: string; answers: Record<string, number> }) {
    console.log('[ConstitutionController] submitTest - userId:', body.userId);
    console.log('[ConstitutionController] submitTest - answers:', body.answers);
    return this.constitutionService.calculateConstitution(body.userId, body.answers);
  }

  // 获取用户体质档案
  @Get('profile/:userId')
  async getUserProfile(@Param('userId') userId: string) {
    console.log('[ConstitutionController] getUserProfile - userId:', userId);
    return this.constitutionService.getUserProfile(userId);
  }

  // 获取体质详情
  @Get('detail/:type')
  async getConstitutionDetail(@Param('type') type: string) {
    console.log('[ConstitutionController] getConstitutionDetail - type:', type);
    return this.constitutionService.getConstitutionDetail(type);
  }
}
