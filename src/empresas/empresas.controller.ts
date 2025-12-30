import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/JwtPayload';
import { UpdateEmpresaPasswordDto } from './dto/update-empresa-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  // Ruta publica para crear una nueva empresa
  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.create(createEmpresaDto);
  }

  // Ruta protegida para obtener el perfil de la empresa autenticada
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Get('perfil')
  getProfile(@CurrentUser() user: JwtPayload) {
    return this.empresasService.findOne(user.idEmpresa);
  }

  // Ruta protegida pora actualizar el perfil de la empresa autenticada
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Patch('perfil')
  updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    return this.empresasService.update(user.idEmpresa, updateEmpresaDto);
  }

  // Ruta protegida para actualizar la contraseña de una empresa autenticada
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Patch('perfil/password')
  updateProfilePassword(
    @CurrentUser() user: JwtPayload,
    @Body() updateProfilePasswordDto: UpdateEmpresaPasswordDto,
  ) {
    return this.empresasService.updateProfilePassword(
      user.idEmpresa,
      updateProfilePasswordDto,
    );
  }

  // Ruta protegida para eliminar el perfil de una empresa autenticada
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Delete('perfil')
  deleteProfile(@CurrentUser() user: JwtPayload) {
    return this.empresasService.remove(user.idEmpresa);
  }

  // Ruta protegida que la emresa autenticada puede subriu su logo
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Post('perfil/logo')
  @UseInterceptors(
    FileInterceptor('file', {
      //Configuramos el alamcenamiento
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      // Filtro para validar el tipo de archivo antes de guardar
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
          return cb(
            new BadRequestException(
              'Solo se permiten archivos de imagen(jpg, png) o PDF',
            ),
            false,
          );
        }
        // Aceptamosd el archivo
        cb(null, true);
      },
    }),
  )
  uploadLogo(
    @CurrentUser() user: JwtPayload,
    @UploadedFile(
      // Validacion extra de Nestjs para el tamaño y que el archivo no venga vacio
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Si llegamos aqui, el archivo ya se guardo
    return this.empresasService.updateLogo(user.idEmpresa, file.filename);
  }

  // Rutas protegidas para SuperAdministrador(en dessarrollo futuro)
  // Solo el SuperAdmin podra ver una empresa, ver todas las empresas y eliminar o actualizar cualquier empresa
  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Get()
  findAll() {
    return this.empresasService.findAll();
  }

  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const idSolicitado = +id;
    if (idSolicitado !== user.idEmpresa) {
      throw new ForbiddenException(
        'No tienes permiso para ver la informacion de otra empresa.',
      );
    }
    return this.empresasService.findOne(idSolicitado);
  }

  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(+id, updateEmpresaDto);
  }

  @UseGuards(AuthGuard('jwt')) // Proteccion de Rutas
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    const idSolicitado = +id;
    if (idSolicitado !== user.idEmpresa) {
      throw new ForbiddenException(
        'No tienes permiso para realizar esta accion en otra empresa.',
      );
    }
    return this.empresasService.remove(idSolicitado);
  }
}
