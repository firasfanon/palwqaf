import { supabase } from '../lib/supabase';

export class StorageService {
  private static readonly BUCKETS = {
    DOCUMENTS: 'documents',
    IMAGES: 'images',
    AVATARS: 'avatars',
    ATTACHMENTS: 'attachments'
  };

  static async uploadFile(
    bucket: string,
    path: string,
    file: File,
    options?: { cacheControl?: string; upsert?: boolean }
  ) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: options?.cacheControl || '3600',
          upsert: options?.upsert || false
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  static async uploadDocument(file: File, folder: string = 'general') {
    const timestamp = Date.now();
    const fileName = `${folder}/${timestamp}-${file.name}`;
    return this.uploadFile(this.BUCKETS.DOCUMENTS, fileName, file);
  }

  static async uploadImage(file: File, folder: string = 'general') {
    const timestamp = Date.now();
    const fileName = `${folder}/${timestamp}-${file.name}`;
    return this.uploadFile(this.BUCKETS.IMAGES, fileName, file);
  }

  static async uploadAvatar(file: File, userId: number) {
    const fileName = `avatars/${userId}-${Date.now()}.${file.name.split('.').pop()}`;
    return this.uploadFile(this.BUCKETS.AVATARS, fileName, file, { upsert: true });
  }

  static async uploadAttachment(file: File, relatedTo: string, relatedId: number) {
    const fileName = `${relatedTo}/${relatedId}/${Date.now()}-${file.name}`;
    return this.uploadFile(this.BUCKETS.ATTACHMENTS, fileName, file);
  }

  static async downloadFile(bucket: string, path: string) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }

  static getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  static async deleteFile(bucket: string, path: string) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  static async listFiles(bucket: string, folder: string = '') {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  static async createBucket(bucketName: string, isPublic: boolean = false) {
    try {
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: isPublic,
        fileSizeLimit: 52428800
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating bucket:', error);
      throw error;
    }
  }

  static validateFile(file: File, maxSizeMB: number = 50, allowedTypes?: string[]) {
    const maxSize = maxSizeMB * 1024 * 1024;

    if (file.size > maxSize) {
      throw new Error(`حجم الملف يجب أن يكون أقل من ${maxSizeMB} ميجابايت`);
    }

    if (allowedTypes && allowedTypes.length > 0) {
      const fileType = file.type;
      const isAllowed = allowedTypes.some(type => {
        if (type.endsWith('/*')) {
          return fileType.startsWith(type.replace('/*', ''));
        }
        return fileType === type;
      });

      if (!isAllowed) {
        throw new Error('نوع الملف غير مسموح به');
      }
    }

    return true;
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 بايت';
    const k = 1024;
    const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
