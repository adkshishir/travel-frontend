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
  },
  
  // Form validation patterns
  VALIDATION_PATTERNS: {
    SLUG: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
    EMAIL: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    USERNAME: '^[a-zA-Z0-9_]+$',
    URL: '^https?:\\/\\/.+\\..+',
  },
  
  // Common field configurations
  COMMON_FIELDS: {
    TITLE: {
      validation: { minLength: 2, maxLength: 100 },
      required: true,
    },
    SLUG: {
      validation: { pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' },
      required: true,
    },
    DESCRIPTION: {
      validation: { maxLength: 500 },
      required: false,
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
  },
  
  // Role options
  ROLE_OPTIONS: {
    AUTHOR: [
      { label: 'Author', value: 'author' },
      { label: 'Editor', value: 'editor' },
      { label: 'Contributor', value: 'contributor' },
      { label: 'Guest Writer', value: 'guest' },
    ],
  },
}; 