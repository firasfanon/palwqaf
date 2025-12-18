import React, { useState, useRef } from 'react';
import { Upload, X, File, Image, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { StorageService } from '../../services/storage';

interface FileUploadProps {
  onUpload: (filePath: string, fileUrl: string) => void;
  accept?: string;
  maxSizeMB?: number;
  bucket?: 'documents' | 'images' | 'avatars' | 'attachments';
  folder?: string;
  multiple?: boolean;
  label?: string;
  description?: string;
}

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
  path?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept = '*',
  maxSizeMB = 50,
  bucket = 'documents',
  folder = 'general',
  multiple = false,
  label = 'رفع الملفات',
  description = 'اسحب الملفات هنا أو انقر للاختيار'
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileIndex = files.length + i;

      try {
        StorageService.validateFile(file, maxSizeMB, accept !== '*' ? [accept] : undefined);

        const timestamp = Date.now();
        const fileName = `${folder}/${timestamp}-${file.name}`;

        const data = await StorageService.uploadFile(bucket, fileName, file);
        const url = StorageService.getPublicUrl(bucket, data.path);

        setFiles(prev => prev.map((f, idx) =>
          idx === fileIndex
            ? { ...f, status: 'success', progress: 100, url, path: data.path }
            : f
        ));

        onUpload(data.path, url);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'فشل رفع الملف';
        setFiles(prev => prev.map((f, idx) =>
          idx === fileIndex
            ? { ...f, status: 'error', progress: 0, error: errorMessage }
            : f
        ));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (file.type.includes('pdf')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-islamic-500 bg-islamic-50'
              : 'border-gray-300 hover:border-islamic-400 hover:bg-gray-50'
          }`}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600 mb-1">{description}</p>
          <p className="text-xs text-gray-500">
            الحد الأقصى: {maxSizeMB} ميجابايت
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((uploadedFile, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 space-x-reverse p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex-shrink-0">
                {uploadedFile.status === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {uploadedFile.status === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                {uploadedFile.status === 'uploading' && getFileIcon(uploadedFile.file)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {StorageService.formatFileSize(uploadedFile.file.size)}
                </p>

                {uploadedFile.status === 'uploading' && (
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-islamic-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${uploadedFile.progress}%` }}
                    ></div>
                  </div>
                )}

                {uploadedFile.status === 'error' && (
                  <p className="text-xs text-red-600 mt-1">{uploadedFile.error}</p>
                )}
              </div>

              <button
                onClick={() => removeFile(index)}
                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
