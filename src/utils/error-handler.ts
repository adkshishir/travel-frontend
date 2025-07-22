import toast from 'react-hot-toast';

export interface ApiError {
  message: string;
  status?: number;
  error?: any;
}

export class ErrorHandler {
  /**
   * Handle API errors with consistent formatting
   */
  static handleApiError(error: ApiError, context?: string): void {
    const contextMessage = context ? `${context}: ` : '';
    const message = error.message || 'An unexpected error occurred';
    
    toast.error(`${contextMessage}${message}`);
    
    // Log detailed error for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        context,
        message: error.message,
        status: error.status,
        error: error.error,
      });
    }
  }

  /**
   * Handle validation errors from forms
   */
  static handleValidationErrors(errors: Record<string, string[]>): string {
    const errorMessages: string[] = [];
    
    Object.entries(errors).forEach(([field, messages]) => {
      if (Array.isArray(messages)) {
        errorMessages.push(`${field}: ${messages.join(', ')}`);
      } else {
        errorMessages.push(`${field}: ${messages}`);
      }
    });
    
    const combinedMessage = errorMessages.join('; ');
    toast.error(combinedMessage);
    return combinedMessage;
  }

  /**
   * Handle network errors
   */
  static handleNetworkError(error: Error): void {
    toast.error('Network error: Please check your connection and try again');
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Network Error:', error);
    }
  }

  /**
   * Handle authentication errors
   */
  static handleAuthError(): void {
    toast.error('Authentication required. Please log in again.');
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/auth';
    }
  }

  /**
   * Handle permission errors
   */
  static handlePermissionError(): void {
    toast.error('You do not have permission to perform this action');
  }

  /**
   * Success message handler
   */
  static showSuccess(message: string, context?: string): void {
    const contextMessage = context ? `${context}: ` : '';
    toast.success(`${contextMessage}${message}`);
  }

  /**
   * Warning message handler
   */
  static showWarning(message: string, context?: string): void {
    const contextMessage = context ? `${context}: ` : '';
    toast.error(`${contextMessage}${message}`, {
      icon: '⚠️',
    });
  }

  /**
   * Info message handler
   */
  static showInfo(message: string, context?: string): void {
    const contextMessage = context ? `${context}: ` : '';
    toast(message, {
      icon: 'ℹ️',
    });
  }
}

// Export commonly used error types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTH: 'AUTH_ERROR',
  PERMISSION: 'PERMISSION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER: 'SERVER_ERROR',
} as const;

export type ErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES]; 