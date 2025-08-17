'use client';

import React, { useState } from 'react';
import { ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePreviewProps {
  file?: File | null;
  existingImageUrl?: string;
  alt?: string;
  onFileChange: (file: File | null) => void;
  onExistingImageRemove?: () => void;
  className?: string;
  previewClassName?: string;
  label?: string;
  description?: string;
  accept?: string;
  disabled?: boolean;
  required?: boolean;
  variant?: 'default' | 'circular' | 'gallery';
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  existingImageUrl,
  alt = 'Image preview',
  onFileChange,
  onExistingImageRemove,
  className = '',
  previewClassName = '',
  label = 'Image',
  description = 'Select an image file',
  accept = 'image/*',
  disabled = false,
  required = false,
  variant = 'default',
}) => {
  const [preview, setPreview] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  // Generate preview URL
  const getPreviewUrl = () => {
    if (file) {
      return preview || URL.createObjectURL(file);
    }
    return existingImageUrl || '';
  };

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      onFileChange(selectedFile);
    } else {
      setPreview('');
      onFileChange(null);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileChange(selectedFile);
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
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  };

  const removeImage = () => {
    if (file) {
      handleFileChange(null);
    } else if (existingImageUrl && onExistingImageRemove) {
      onExistingImageRemove();
    }
  };

  const previewUrl = getPreviewUrl();
  const hasImage = previewUrl !== '';

  // Variant-specific styles
  const getPreviewStyles = () => {
    switch (variant) {
      case 'circular':
        return 'w-32 h-32 rounded-full border-4 border-gray-200';
      case 'gallery':
        return 'w-24 h-24 rounded-md';
      default:
        return 'w-full h-48 rounded-md';
    }
  };

  const getContainerStyles = () => {
    switch (variant) {
      case 'circular':
        return 'w-32 h-32 rounded-full';
      case 'gallery':
        return 'w-24 h-24';
      default:
        return 'w-full aspect-video';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <h3 className="text-lg font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
      )}
      
      {/* Image Preview */}
      {hasImage && (
        <div className={cn('relative', getContainerStyles(), previewClassName)}>
          <img
            src={previewUrl}
            alt={alt}
            className={cn('object-cover', getPreviewStyles())}
            onError={(e) => {
              console.error('Image failed to load:', previewUrl);
              e.currentTarget.style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={removeImage}
            disabled={disabled}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* File Input Area */}
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400',
          hasImage && variant !== 'gallery' ? 'mt-4' : ''
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && document.getElementById(`file-input-${label.replace(/\s+/g, '-')}`)?.click()}
      >
        {!hasImage && (
          <div className="flex flex-col items-center text-gray-500">
            <ImageIcon className="h-12 w-12 mb-2" />
            <span className="text-sm">
              {dragActive ? 'Drop image here' : 'Click to select or drag & drop'}
            </span>
          </div>
        )}
        
        <input
          id={`file-input-${label.replace(/\s+/g, '-')}`}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />
        
        {!hasImage && description && (
          <p className="text-xs text-gray-400 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default ImagePreview; 