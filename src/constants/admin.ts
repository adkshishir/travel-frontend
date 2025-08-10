// Admin Panel Constants
export const ADMIN_CONFIG = {
  // Common table configurations
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_EXCLUDE_COLUMNS: ['id', '_count', 'createdAt', 'updatedAt'],
  
  // Common CSS classes
  BUTTON_CLASSES: {
    PRIMARY: 'bg-primary text-white w-fit px-4 rounded-sm py-2 hover:bg-primary/90 transition-colors',
    SECONDARY: 'bg-secondary text-secondary-foreground w-fit px-4 rounded-sm py-2 hover:bg-secondary/90 transition-colors',
    DANGER: 'bg-destructive text-destructive-foreground w-fit px-4 rounded-sm py-2 hover:bg-destructive/90 transition-colors',
    SUCCESS: 'bg-green-600 text-white w-fit px-4 rounded-sm py-2 hover:bg-green-700 transition-colors',
  },
  
  // Form validation patterns
  VALIDATION_PATTERNS: {
    SLUG: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
    EMAIL: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    USERNAME: '^[a-zA-Z0-9_]+$',
    URL: '^https?:\\/\\/.+\\..+',
    PHONE: '^[+]?[0-9]{10,15}$',
    ALPHANUMERIC: '^[a-zA-Z0-9\\s]+$',
  },
  
  // Enhanced validation messages
  VALIDATION_MESSAGES: {
    REQUIRED: 'This field is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    URL_INVALID: 'Please enter a valid URL (starting with http:// or https://)',
    SLUG_INVALID: 'Slug must contain only lowercase letters, numbers, and hyphens',
    USERNAME_INVALID: 'Username must contain only letters, numbers, and underscores',
    PHONE_INVALID: 'Please enter a valid phone number',
    MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
    MAX_LENGTH: (max: number) => `Must be at most ${max} characters`,
    MIN_VALUE: (min: number) => `Must be at least ${min}`,
    MAX_VALUE: (max: number) => `Must be at most ${max}`,
  },
  
  // Common field configurations with enhanced validation
  COMMON_FIELDS: {
    TITLE: {
      validation: { 
        minLength: 2, 
        maxLength: 100,
      },
      required: true,
      description: 'Enter a descriptive title (2-100 characters)',
    },
    SLUG: {
      validation: { 
        pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
        minLength: 2,
        maxLength: 100,
      },
      required: true,
      description: 'URL-friendly version of the title (lowercase, numbers, and hyphens only)',
    },
    DESCRIPTION: {
      validation: { 
        maxLength: 500 
      },
      required: false,
      description: 'Brief description (max 500 characters)',
    },
    EMAIL: {
      validation: {
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      },
      required: true,
      description: 'Enter a valid email address',
    },
    USERNAME: {
      validation: {
        pattern: '^[a-zA-Z0-9_]+$',
        minLength: 3,
        maxLength: 50,
      },
      required: true,
      description: 'Username (3-50 characters, letters, numbers, and underscores only)',
    },
    WEBSITE: {
      validation: {
        pattern: '^https?:\\/\\/.+\\..+',
      },
      required: false,
      description: 'Website URL (must start with http:// or https://)',
    },
    PHONE: {
      validation: {
        pattern: '^[+]?[0-9]{10,15}$',
      },
      required: false,
      description: 'Phone number (10-15 digits, optional + prefix)',
    },
  },
  
  // Status options
  STATUS_OPTIONS: {
    AUTHOR: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Suspended', value: 'suspended' },
    ],
    GENERAL: [
      { label: 'Published', value: 'published' },
      { label: 'Draft', value: 'draft' },
      { label: 'Archived', value: 'archived' },
    ],
    BOOKING: [
      { label: 'Pending', value: 'pending' },
      { label: 'Confirmed', value: 'confirmed' },
      { label: 'Cancelled', value: 'cancelled' },
      { label: 'Completed', value: 'completed' },
    ],
  },
  
  // Role options
  ROLE_OPTIONS: {
    AUTHOR: [
      { label: 'Author', value: 'author' },
      { label: 'Editor', value: 'editor' },
      { label: 'Contributor', value: 'contributor' },
      { label: 'Guest Writer', value: 'guest' },
    ],
    USER: [
      { label: 'User', value: 'USER' },
      { label: 'Admin', value: 'ADMIN' },
      { label: 'Author', value: 'AUTHOR' },
    ],
  },

  // Form layout settings
  FORM_SETTINGS: {
    DEFAULT_GRID_COLS: 2,
    FULL_WIDTH_FIELDS: ['richtext', 'textarea'],
    LOADING_TIMEOUT: 30000, // 30 seconds
    SUCCESS_REDIRECT_DELAY: 1500, // 1.5 seconds
  },

  // Toast settings
  TOAST_SETTINGS: {
    SUCCESS_DURATION: 4000,
    ERROR_DURATION: 6000,
    WARNING_DURATION: 5000,
    INFO_DURATION: 4000,
  },
}; 