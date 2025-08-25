import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { medecin } from './medecin.entity';
import { diskStorage } from 'multer';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as pathLib from 'path';

@Controller('medecin')
export class MedecinController {
  constructor(private readonly medecinService: MedecinService) {}

  @Post()
  async create(@Body() createMedecinDto: Partial<medecin>): Promise<medecin> {
    return await this.medecinService.create(createMedecinDto);
  }

  @Get()
  async findAll(): Promise<medecin[]> {
    return await this.medecinService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<medecin> {
    return await this.medecinService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedecinDto: Partial<medecin>,
  ): Promise<medecin> {
    return await this.medecinService.update(id, updateMedecinDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.medecinService.remove(id);
  }
  // Upload photo functionality
  @Post(':id/upload-photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/photos', // Directory to store photos
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  async uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<medecin> {
    if (!file) {
      throw new NotFoundException('Photo not uploaded.');
    }
    const photoUrl = `/uploads/photos/${file.filename}`;
    // Update the medecin with the photo URL
    return await this.medecinService.update(id, { photo: photoUrl });
  }
}
