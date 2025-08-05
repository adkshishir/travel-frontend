'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface VideoModalProps {
  videoContent?: string;
  triggerText?: string;
  triggerClassName?: string;
  modalClassName?: string;
}

export function VideoModal({ 
  videoContent, 
  triggerText = 'Watch Video',
  triggerClassName = '',
  modalClassName = ''
}: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!videoContent) {
    return null;
  }

  // Function to determine if content is a URL or iframe
  const isIframe = (content: string): boolean => {
    return content.trim().toLowerCase().startsWith('<iframe');
  };

  // Function to convert video URL to embed URL
  const getEmbedUrl = (url: string): string => {
    // YouTube URL conversion
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return url
        .replace('watch?v=', 'embed/')
        .replace('youtu.be/', 'youtube.com/embed/')
        .replace('youtube.com/watch?v=', 'youtube.com/embed/');
    }
    
    // Vimeo URL conversion
    if (url.includes('vimeo.com')) {
      return url.replace('vimeo.com/', 'player.vimeo.com/video/');
    }
    
    // Return original URL for direct video files
    return url;
  };

  const renderVideoContent = () => {
    if (isIframe(videoContent)) {
      // If it's already an iframe, render it directly
      return (
        <div 
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: videoContent }}
        />
      );
    } else {
      // If it's a URL, determine the type and render appropriate element
      const embedUrl = getEmbedUrl(videoContent);
      
      if (videoContent.includes('youtube.com') || videoContent.includes('youtu.be') || videoContent.includes('vimeo.com')) {
        return (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        );
      } else {
        // Direct video file
        return (
          <video
            src={videoContent}
            controls
            className="w-full h-full object-cover"
            autoPlay
          />
        );
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          <span className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            {triggerText}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className={`max-w-4xl w-full p-0 ${modalClassName}`}>
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          {renderVideoContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
} 