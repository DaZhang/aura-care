import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { S3Storage } from 'coze-coding-dev-sdk';
import * as fs from 'fs';
import * as path from 'path';

@Controller('storage')
export class StorageController {
  private storage: S3Storage;

  constructor() {
    this.storage = new S3Storage({
      endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
      accessKey: '',
      secretKey: '',
      bucketName: process.env.COZE_BUCKET_NAME,
      region: 'cn-beijing',
    });
  }

  @Post('upload-image')
  async uploadImage(@Body() body: { imagePath: string }) {
    const fullPath = path.join(process.cwd(), body.imagePath);
    
    if (!fs.existsSync(fullPath)) {
      return { code: 404, msg: 'File not found' };
    }

    const fileBuffer = fs.readFileSync(fullPath);
    const fileName = path.basename(body.imagePath);
    const contentType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

    const key = await this.storage.uploadFile({
      fileContent: fileBuffer,
      fileName: `wellness/${fileName}`,
      contentType,
    });

    const url = await this.storage.generatePresignedUrl({
      key,
      expireTime: 31536000, // 1 year
    });

    return { code: 200, msg: 'success', data: { key, url } };
  }

  @Get('image-urls')
  async getImageUrls() {
    const images = [
      { name: 'bg-header', path: 'src/assets/images/bg-header.png' },
      { name: 'bracelet-peaceful', path: 'src/assets/images/bracelet-peaceful.png' },
      { name: 'bracelet-qixu', path: 'src/assets/images/bracelet-qixu.png' },
      { name: 'bracelet-yangxu', path: 'src/assets/images/bracelet-yangxu.png' },
      { name: 'bracelet-yinxu', path: 'src/assets/images/bracelet-yinxu.png' },
    ];

    const results = {};
    const projectRoot = path.resolve(process.cwd(), '..');
    
    for (const image of images) {
      const fullPath = path.join(projectRoot, image.path);
      console.log(`Checking file: ${fullPath}, exists: ${fs.existsSync(fullPath)}`);
      if (fs.existsSync(fullPath)) {
        const fileBuffer = fs.readFileSync(fullPath);
        const fileName = path.basename(image.path);
        
        const key = await this.storage.uploadFile({
          fileContent: fileBuffer,
          fileName: `wellness/${fileName}`,
          contentType: 'image/png',
        });

        const url = await this.storage.generatePresignedUrl({
          key,
          expireTime: 31536000, // 1 year
        });

        results[image.name] = url;
      }
    }

    return { code: 200, msg: 'success', data: results };
  }
}
