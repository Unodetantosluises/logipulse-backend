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
import { ChoferesService } from './choferes.service';
import { CreateChofereDto } from './dto/create-chofere.dto';
import { UpdateChofereDto } from './dto/update-chofere.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/JwtPayload';

@Controller('choferes')
export class ChoferesController {
  constructor(private readonly choferesService: ChoferesService) {}

  // Ruta protegida para crear un chofer
  @UseGuards(AuthGuard('jwt'))
  @Post('empresa/:empresaId/chofer')
  crearChofer(
    @CurrentUser() user: JwtPayload,
    @Body() createChofereDto: CreateChofereDto,
  ) {
    const idEmpresa = user.idEmpresa;
    return this.choferesService.create(createChofereDto, idEmpresa);
  }

  // Ruta protegida para obtener todos los choferes
  @UseGuards(AuthGuard('jwt'))
  @Get('empresa/choferes')
  findAll(@CurrentUser() user: JwtPayload) {
    const idEmpresa = user.idEmpresa;
    return this.choferesService.findAll(idEmpresa);
  }

  // Ruta protegida para obtener un chofer por ID
  @UseGuards(AuthGuard('jwt'))
  @Get('empresa/chofer/:id')
  findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    const idchofer = parseInt(id, 10);
    const idEmpresa = user.idEmpresa;
    return this.choferesService.findOne(idchofer, idEmpresa);
  }

  // Ruta protegida para actualizar un chofer por ID
  @UseGuards(AuthGuard('jwt'))
  @Patch('empresa/chofer/:id')
  update(
    @Param('id') id: string,
    @Body() updateChofereDto: UpdateChofereDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const idEmpresa = user.idEmpresa;
    return this.choferesService.update(+id, updateChofereDto, idEmpresa);
  }

  // Ruta protegida para eliminar un chofer por ID
  @UseGuards(AuthGuard('jwt'))
  @Delete('empresa/chofer/:id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const idEmpresa = user.idEmpresa;
    return this.choferesService.remove(+id, idEmpresa);
  }
}
