import { Module } from '@nestjs/common';
import { ConstitutionController } from './constitution.controller';
import { ConstitutionService } from './constitution.service';

@Module({
  controllers: [ConstitutionController],
  providers: [ConstitutionService],
  exports: [ConstitutionService],
})
export class ConstitutionModule {}
