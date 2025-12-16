import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoferesService } from './choferes.service';
import { ChoferesController } from './choferes.controller';
import { Chofer } from './entities/chofere.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chofer])],
  controllers: [ChoferesController],
  providers: [ChoferesService],
  exports: [ChoferesService],
})
export class ChoferesModule {}
