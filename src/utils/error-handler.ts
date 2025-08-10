import toast from 'react-hot-toast';

export interface ApiError {
  message?: string;
  status?: number;
  error?: any;
  statusCode?: number;
}

export interface ValidationErrors {
  [field: string]: string[] | string;
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
        status: error.status || error.statusCode,
        error: error.error,
      });
    }
  }

  /**
   * Handle validation errors from forms with improved formatting
   */
  static handleValidationErrors(errors: ValidationErrors): string {
    const errorMessages: string[] = [];
    
    Object.entries(errors).forEach(([field, messages]) => {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
      
      if (Array.isArray(messages)) {
        errorMessages.push(`${fieldName}: ${messages.join(', ')}`);
      } else {
        errorMessages.push(`${fieldName}: ${messages}`);
      }
    });
    
    const combinedMessage = errorMessages.join('\n');
    toast.error(combinedMessage, {
      duration: 6000,
      style: {
        minWidth: '300px',
        whiteSpace: 'pre-line',
      },
    });
    return combinedMessage;
  }

  /**
   * Parse backend response and extract validation errors
   */
  static extractValidationErrors(responseData: any): ValidationErrors | null {
    // Handle NestJS validation errors
    if (responseData?.error && typeof responseData.error === 'object') {
      return responseData.error;
    }
    
    // Handle other validation error formats
    if (responseData?.errors && typeof responseData.errors === 'object') {
      return responseData.errors;
    }
    
    // Handle array format validation errors
    if (Array.isArray(responseData?.message)) {
      const errors: ValidationErrors = {};
      responseData.message.forEach((msg: string) => {
        const [field, ...rest] = msg.split(': ');
        if (field && rest.length > 0) {
          errors[field] = rest.join(': ');
        }
      });
      return Object.keys(errors).length > 0 ? errors : null;
    }
    
    return null;
  }

  /**
   * Handle network errors
   */
  static handleNetworkError(error: Error): void {
    toast.error('Network error: Please check your connection and try again', {
      duration: 5000,
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Network Error:', error);
    }
  }

  /**
   * Handle form submission errors with field mapping
   */
  static handleFormError(responseData: any, context?: string): boolean {
    // Try to extract validation errors first
    const validationErrors = this.extractValidationErrors(responseData);
    
    if (validationErrors) {
      this.handleValidationErrors(validationErrors);
      return true; // Indicates validation errors were handled
    }
    
    // Handle general API errors
    this.handleApiError({
      message: responseData?.message || 'An error occurred',
      status: responseData?.statusCode || responseData?.status,
      error: responseData?.error,
    }, context);
    
    return false; // Indicates general error was handled
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
   * Show success message with consistent formatting
   */
  static showSuccess(message: string, duration = 4000): void {
    toast.success(message, {
      duration,
      style: {
        minWidth: '250px',
      },
    });
  }

  /**
   * Show info message
   */
  static showInfo(message: string, duration = 4000): void {
    toast(message, {
      duration,
      icon: 'ℹ️',
      style: {
        minWidth: '250px',
      },
    });
  }

  /**
   * Show warning message
   */
  static showWarning(message: string, duration = 5000): void {
    toast(message, {
      duration,
      icon: '⚠️',
      style: {
        minWidth: '250px',
        background: '#f59e0b',
        color: 'white',
      },
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