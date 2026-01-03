import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UnidadesTransporteService } from './unidades_transporte.service';
import { CreateUnidadesTransporteDto } from './dto/create-unidades_transporte.dto';
import { UpdateUnidadesTransporteDto } from './dto/update-unidades_transporte.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/JwtPayload';
import { AuthGuard } from '@nestjs/passport';

@Controller('unidades-transporte')
export class UnidadesTransporteController {
  constructor(
    private readonly unidadesTransporteService: UnidadesTransporteService,
  ) {}

  // Ruta protegida para crear una nueva unidad de transporte
  @UseGuards(AuthGuard('jwt'))
  @Post('empresa/:empresaId/unidades-transporte')
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
  @UseGuards(AuthGuard('jwt'))
  @Get('empresa/unidades-transporte')
  findAll(@CurrentUser() user: JwtPayload) {
    const idEmpresa = user.idEmpresa;
    return this.unidadesTransporteService.findAll(idEmpresa);
  }

  // Ruta protegida para obtener una unidad de transporte por ID
  @UseGuards(AuthGuard('jwt'))
  @Get('empresa/unidad-transporte/:id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const idUnidadTransporte = parseInt(id, 10);
    const idEmpresa = user.idEmpresa;
    return this.unidadesTransporteService.findOne(
      idUnidadTransporte,
      idEmpresa,
    );
  }

  // Ruta protegida para actualizar una unidad de transporte por ID
  @UseGuards(AuthGuard('jwt'))
  @Patch('empresa/unidad-transporte/:id')
  update(
    @Param('id') id: string,
    @Body() updateUnidadesTransporteDto: UpdateUnidadesTransporteDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const idEmpresa = user.idEmpresa;
    return this.unidadesTransporteService.update(
      +id,
      updateUnidadesTransporteDto,
      idEmpresa,
    );
  }

  // Ruta protegida para eliminar una unidad de transporte por ID
  @UseGuards(AuthGuard('jwt'))
  @Delete('empresa/unidad-transporte/:id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const idEmpresa = user.idEmpresa;
    return this.unidadesTransporteService.remove(+id, idEmpresa);
  }

  // Asignar un chofer a una unidad de transporte
  @UseGuards(AuthGuard('jwt'))
  @Patch('empresa/unidad-transporte/:id/chofer/:choferId')
  assignChofer(
    @Param('id') id: string,
    @Param('choferId') choferId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    const idEmpresa = user.idEmpresa;
    return this.unidadesTransporteService.assignChoferToUnidad(
      +id,
      +choferId,
      idEmpresa,
    );
  }
}
