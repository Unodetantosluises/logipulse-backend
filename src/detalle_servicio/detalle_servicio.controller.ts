import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { DetalleServicioService } from './detalle_servicio.service';
import { CreateDetalleServicioDto } from './dto/create-detalle_servicio.dto';
import { UpdateDetalleServicioDto } from './dto/update-detalle_servicio.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/JwtPayload';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('detalle-servicio')
export class DetalleServicioController {
  constructor(
    private readonly detalleServicioService: DetalleServicioService,
  ) {}

  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Body() createDetalleServicioDto: CreateDetalleServicioDto,
  ) {
    return this.detalleServicioService.create(
      createDetalleServicioDto,
      user.idEmpresa,
    );
  }

  // Obtener los productos de un servicio específico
  // GET /detalle-servicio/servicio/1
  @Get('servicio/:idServicio')
  findAllByServicio(
    @Param('idServicio', ParseIntPipe) idServicio: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.detalleServicioService.findAllByServicio(
      idServicio,
      user.idEmpresa,
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetalleServicioDto: UpdateDetalleServicioDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.detalleServicioService.update(
      id,
      updateDetalleServicioDto,
      user.idEmpresa,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.detalleServicioService.remove(id, user.idEmpresa);
  }
}
