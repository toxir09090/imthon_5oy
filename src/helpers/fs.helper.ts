import { Injectable, OnModuleInit } from '@nestjs/common';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
type a = Express.Multer.File[];
@Injectable()
export class FsHelper implements OnModuleInit {
  onModuleInit() {
    this.mkdirPath();
  }
  mkdirPath() {
    const uploadsPath = join(process.cwd(), 'uploads');
    if (!existsSync(uploadsPath)) {
      mkdirSync(uploadsPath, { recursive: true });
    }
    const uploads_images = join(process.cwd(), 'uploads', 'images');
    if (!existsSync(uploads_images)) {
      mkdirSync(uploads_images, { recursive: true });
    }
    const uploads_videos = join(process.cwd(), 'uploads', 'videos');
    if (!existsSync(uploads_videos)) {
      mkdirSync(uploads_videos, { recursive: true });
    }
    const uploads_audios = join(process.cwd(), 'uploads', 'audios');
    if (!existsSync(uploads_audios)) {
      mkdirSync(uploads_audios, { recursive: true });
    }
  }
  uploadsImage(image: Express.Multer.File, oldImage?: string): string {
    if (oldImage && oldImage !== 'default-user-icon.png') {
      const oldImagePath = join(process.cwd(), 'uploads', 'images', oldImage);
      if (existsSync(oldImagePath)) {
        unlinkSync(oldImagePath);
      }
    }
    if (image.originalname !== 'default-user-icon.png') {
      const uploads_images = join(process.cwd(), 'uploads', 'images');
      const sanitizeFilename = (name: string) =>
        name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const imagePath = ` ${Date.now()}-${Math.random() * 2}-${sanitizeFilename(image.originalname)}`;
      const fullImagePath = join(uploads_images, imagePath);
      writeFileSync(fullImagePath, image.buffer);
      return imagePath;
    } else {
      return 'bur rasm ochirish mumkun emas';
    }
  }
  removeImage(image: string): string {
    if (image !== 'default-user-icon.png') {
      const imagePath = join(process.cwd(), 'uploads', 'images', image);
      if (existsSync(imagePath)) {
        unlinkSync(imagePath);
      }
      return 'deleted';
    } else {
      return 'bur rasm ochirish mumkun emas';
    }
  }
  uploadFiles(
    files: { images: a; videos: a; audios: a },
    oldFiles?: { images: string[]; videos: string[]; audios: string[] },
  ) {
    if (oldFiles) {
      if (oldFiles.images.length > 0) {
        oldFiles.images.forEach((image) => {
          const oldImagePath = join(process.cwd(), 'uploads', 'images', image);
          if (existsSync(oldImagePath)) {
            unlinkSync(oldImagePath);
          }
        });
      }
      if (oldFiles.videos.length > 0) {
        oldFiles.videos.forEach((video) => {
          const oldVideoPath = join(process.cwd(), 'uploads', 'videos', video);
          if (existsSync(oldVideoPath)) {
            unlinkSync(oldVideoPath);
          }
        });
      }
      if (oldFiles.audios.length > 0) {
        oldFiles.audios.forEach((audio) => {
          const oldAudioPath = join(process.cwd(), 'uploads', 'audios', audio);
          if (existsSync(oldAudioPath)) {
            unlinkSync(oldAudioPath);
          }
        });
      }
    }
    const uploads_images = join(process.cwd(), 'uploads', 'images');
    const uploads_videos = join(process.cwd(), 'uploads', 'videos');
    const uploads_audios = join(process.cwd(), 'uploads', 'audios');
    const uploads:any = {
      images: [],
      videos: [],
      audios: [],
    };
    if (files.images.length > 0) {
      files.images.forEach((image) => {
        const sanitizeFilename = (name: string) =>
          name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const imagePath = `${Date.now()}-${Math.random() * 2}-${sanitizeFilename(image.originalname)}`;
        const fullImagePath = join(uploads_images, imagePath);
        writeFileSync(fullImagePath, image.buffer);
        uploads.images.push(imagePath);
      });
    }
    if (files.videos.length > 0) {
      files.videos.forEach((video) => {
        const sanitizeFilename = (name: string) =>
          name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const videoPath = `${Date.now()}-${Math.random() * 2}-${sanitizeFilename(video.originalname)}`;
        const fullVideoPath = join(uploads_videos, videoPath);
        writeFileSync(fullVideoPath, video.buffer);
        uploads.videos.push(videoPath);
      });
    }
    if (files.audios.length > 0) {
      files.audios.forEach((audio) => {
        const sanitizeFilename = (name: string) =>
          name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const audioPath = `${Date.now()}-${Math.random() * 2}-${sanitizeFilename(audio.originalname)}`;
        const fullAudioPath = join(uploads_audios, audioPath);
        writeFileSync(fullAudioPath, audio.buffer);
        uploads.audios.push(audioPath);
      });
    }
    return uploads;
  }
  removeFiles(files: { images: string[]; videos: string[]; audios: string[] }) {
    if (files.images.length > 0) {
      files.images.forEach((image) => {
        const imagePath = join(process.cwd(), 'uploads', 'images', image);
        if (existsSync(imagePath)) {
          unlinkSync(imagePath);
        }
      });
    }
    if (files.videos.length > 0) {
      files.videos.forEach((video) => {
        const videoPath = join(process.cwd(), 'uploads', 'videos', video);
        if (existsSync(videoPath)) {
          unlinkSync(videoPath);
        }
      });
    }
    if (files.audios.length > 0) {
      files.audios.forEach((audio) => {
        const audioPath = join(process.cwd(), 'uploads', 'audios', audio);
        if (existsSync(audioPath)) {
          unlinkSync(audioPath);
        }
      });
    }
    return 'deleted';
  }
}
