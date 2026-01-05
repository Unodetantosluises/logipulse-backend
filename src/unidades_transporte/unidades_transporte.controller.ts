import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UnidadesTransporteService } from './unidades_transporte.service';
import { CreateUnidadesTransporteDto } from './dto/create-unidades_transporte.dto';
import { UpdateUnidadesTransporteDto } from './dto/update-unidades_transporte.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/JwtPayload';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('unidades-transporte')
export class UnidadesTransporteController {
  constructor(
    private readonly unidadesTransporteService: UnidadesTransporteService,
  ) {}

  // Ruta protegida para crear una nueva unidad de transporte
  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Body() createUnidadesTransporteDto: CreateUnidadesTransporteDto,
  ) {
    const idEmpresa = user.idEmpresa;
    return this.unidadesTransporteService.create(
      createUnidadesTransporteDto,
      idEmpresa,
    );
  }

  // Ruta protegida para obtener todas las unidades de transporte
  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.unidadesTransporteService.findAll(user.idEmpresa);
  }

  // Ruta protegida para obtener una unidad de transporte por ID
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.unidadesTransporteService.findOne(id, user.idEmpresa);
  }

  // Ruta protegida para actualizar una unidad de transporte por ID
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUnidadesTransporteDto: UpdateUnidadesTransporteDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.unidadesTransporteService.update(
      id,
      updateUnidadesTransporteDto,
      user.idEmpresa,
    );
  }

  // Ruta protegida para eliminar una unidad de transporte por ID
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.unidadesTransporteService.remove(id, user.idEmpresa);
  }

  // Asignar un chofer a una unidad de transporte
  @Patch(':id/asignar-chofer/:choferId')
  assignChofer(
    @Param('id', ParseIntPipe) id: number,
    @Param('choferId', ParseIntPipe) choferId: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.unidadesTransporteService.assignChoferToUnidad(
      id,
      choferId,
      user.idEmpresa,
    );
  }

  // Desvincular chofer
  @Patch(':id/desvincular-chofer')
  unassignChofer(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.unidadesTransporteService.unassignChofer(id, user.idEmpresa);
  }
}
