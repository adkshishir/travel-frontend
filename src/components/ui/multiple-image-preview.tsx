'use client';

import React, { useState } from 'react';
import { ImageIcon, X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultipleImagePreviewProps {
  files: File[];
  existingImages?: Array<{ url: string; alt?: string; id?: string | number }>;
  onFilesChange: (files: File[]) => void;
  onExistingImageRemove?: (index: number) => void;
  className?: string;
  label?: string;
  description?: string;
  accept?: string;
  disabled?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
}

export const MultipleImagePreview: React.FC<MultipleImagePreviewProps> = ({
  files,
  existingImages = [],
  onFilesChange,
  onExistingImageRemove,
  className = '',
  label = 'Gallery Images',
  description = 'Select multiple images',
  accept = 'image/*',
  disabled = false,
  maxFiles = 10,
  maxSizeMB = 2,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  // Generate preview URLs for files
  React.useEffect(() => {
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
    
    // Cleanup function to revoke object URLs
    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(selectedFiles).forEach(file => {
      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        errors.push(`${file.name} is larger than ${maxSizeMB}MB`);
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name} is not a valid image file`);
        return;
      }

      validFiles.push(file);
    });

    // Check total file count
    const totalFiles = files.length + validFiles.length;
    if (totalFiles > maxFiles) {
      errors.push(`Maximum ${maxFiles} images allowed`);
      return;
    }

    if (errors.length > 0) {
      console.warn('File validation errors:', errors);
      // You might want to show these errors to the user
    }

    onFilesChange([...files, ...validFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
    e.target.value = ''; // Reset input to allow selecting the same file again
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const removeExistingImage = (index: number) => {
    if (onExistingImageRemove) {
      onExistingImageRemove(index);
    }
  };

  const totalImages = files.length + existingImages.length;
  const canAddMore = totalImages < maxFiles && !disabled;

  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <h3 className="text-lg font-medium">{label}</h3>
      )}
      
      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Existing Images</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {existingImages.map((image, index) => (
              <div key={`existing-${index}`} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={image.url}
                    alt={image.alt || `Existing image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {onExistingImageRemove && (
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    disabled={disabled}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* New Images */}
      {files.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">New Images</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {files.map((file, index) => (
              <div key={`new-${index}`} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={previews[index]}
                    alt={`New image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
            dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300',
            'cursor-pointer hover:border-gray-400'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-input-${label.replace(/\s+/g, '-')}`)?.click()}
        >
          <div className="flex flex-col items-center text-gray-500">
            <Upload className="h-12 w-12 mb-4" />
            <span className="text-lg font-medium mb-2">
              {dragActive ? 'Drop images here' : 'Click to select or drag & drop images'}
            </span>
            <p className="text-sm text-gray-400">
              {description} • Max {maxFiles} images, {maxSizeMB}MB each
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {totalImages > 0 && `${totalImages}/${maxFiles} images selected`}
            </p>
          </div>
          
          <input
            id={`file-input-${label.replace(/\s+/g, '-')}`}
            type="file"
            accept={accept}
            multiple
            onChange={handleFileInput}
            disabled={disabled}
            className="hidden"
          />
        </div>
      )}

      {totalImages >= maxFiles && (
        <p className="text-sm text-orange-600 text-center">
          Maximum number of images ({maxFiles}) reached
        </p>
      )}
    </div>
  );
};

export default MultipleImagePreview; 