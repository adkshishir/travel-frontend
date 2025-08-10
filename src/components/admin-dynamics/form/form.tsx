'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { ErrorHandler } from '@/utils/error-handler';

const CKEditor = dynamic(() => import('@/utils/ck-editor'), { ssr: false });

// Define the field types our dynamic form will support
export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'file'
  | 'files'
  | 'radio'
  | 'switch'
  | 'date'
  | 'richtext';

// Define the structure for field options (for select, radio, etc.)
export interface FieldOption {
  label: string;
  value: string;
}

// Define the structure for a single field configuration
export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: FieldOption[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: any) => boolean | string;
  };
  defaultValue?: any;
}

// Define the structure for the entire form configuration
export interface FormConfig {
  fields: FieldConfig[];
  submitLabel?: string;
}

interface DynamicFormProps {
  config: FormConfig;
  onSubmit: (data: any) => Promise<any> | any;
  isLoading?: boolean;
}

export function DynamicForm({ config, onSubmit, isLoading = false }: DynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  // Generate Zod schema dynamically based on the form configuration
  const generateZodSchema = (fields: FieldConfig[]) => {
    const schema: Record<string, any> = {};

    fields.forEach((field) => {
      let fieldSchema: any;

      // Base schema based on field type
      switch (field.type) {
        case 'email':
          fieldSchema = z.string().email('Invalid email address');
          break;
        case 'number':
          fieldSchema = z.coerce.number();
          break;
        case 'date':
          fieldSchema = z.date();
          break;
        case 'checkbox':
          fieldSchema = z.boolean().default(false);
          break;
        case 'switch':
          fieldSchema = z.boolean().default(false);
          break;
        case 'file':
          fieldSchema = z.any();
          break;
        case 'files':
          fieldSchema = z.any();
          break;
        case 'select':
          fieldSchema = z.any();
          break;
        default:
          fieldSchema = z.string();
      }

      // Add validation rules
      if (field.validation) {
        if (field.type === 'number') {
          if (field.validation.min !== undefined) {
            fieldSchema = fieldSchema.min(field.validation.min, {
              message: `Must be at least ${field.validation.min}`,
            });
          }
          if (field.validation.max !== undefined) {
            fieldSchema = fieldSchema.max(field.validation.max, {
              message: `Must be at most ${field.validation.max}`,
            });
          }
        } else if (
          field.type === 'text' ||
          field.type === 'email' ||
          field.type === 'password' ||
          field.type === 'textarea'
        ) {
          if (field.validation.minLength !== undefined) {
            fieldSchema = fieldSchema.min(field.validation.minLength, {
              message: `Must be at least ${field.validation.minLength} characters`,
            });
          }
          if (field.validation.maxLength !== undefined) {
            fieldSchema = fieldSchema.max(field.validation.maxLength, {
              message: `Must be at most ${field.validation.maxLength} characters`,
            });
          }
          if (field.validation.pattern) {
            fieldSchema = fieldSchema.regex(
              new RegExp(field.validation.pattern),
              { message: 'Invalid format' }
            );
          }
        } else if (field.type === 'file' || field.type === 'files') {
          fieldSchema = z.any();
        }
      }

      // Handle required fields
      if (field.required) {
        if (field.type === 'checkbox' || field.type === 'switch') {
          fieldSchema = fieldSchema.refine((val: boolean) => val === true, {
            message: `${field.label} is required`,
          });
        } else {
          schema[field.name] = fieldSchema;
        }
      } else {
        schema[field.name] =
          field.type === 'checkbox' || field.type === 'switch'
            ? fieldSchema.optional().default(false)
            : fieldSchema.optional();
      }
    });

    return z.object(schema);
  };

  // Generate default values
  const generateDefaultValues = (fields: FieldConfig[]) => {
    const defaultValues: Record<string, any> = {};

    fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        defaultValues[field.name] = field.defaultValue;
      } else {
        // Set appropriate default values based on field type
        switch (field.type) {
          case 'checkbox':
          case 'switch':
            defaultValues[field.name] = false;
            break;
          case 'number':
            defaultValues[field.name] = 0;
            break;
          case 'select':
          case 'radio':
            defaultValues[field.name] =
              field.options && field.options.length > 0
                ? field.options[0].value
                : '';
            break;
          default:
            defaultValues[field.name] = '';
        }
      }
    });

    return defaultValues;
  };

  const zodSchema = generateZodSchema(config.fields);
  const defaultValues = generateDefaultValues(config.fields);

  // Set up the form
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  // Clear server errors when form values change
  useEffect(() => {
    const subscription = form.watch(() => {
      if (Object.keys(serverErrors).length > 0) {
        setServerErrors({});
      }
    });
    return () => subscription.unsubscribe();
  }, [form, serverErrors]);

  // Handle form submission with enhanced error handling
  const handleSubmit = async (data: z.infer<typeof zodSchema>) => {
    setIsSubmitting(true);
    setServerErrors({});

    try {
      const result = await onSubmit(data);
      
      // If onSubmit returns a result, we can check it for errors
      if (result === undefined || result === null) {
        // This typically means an error occurred and was already handled
        return;
      }
    } catch (error: any) {
      // Handle any synchronous errors
      ErrorHandler.handleApiError(error, 'Form Submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set server-side validation errors
  const setFieldErrors = (errors: Record<string, string>) => {
    Object.entries(errors).forEach(([field, message]) => {
      form.setError(field as any, {
        type: 'server',
        message,
      });
    });
    setServerErrors(errors);
  };

  // Render a field based on its type
  const renderField = (field: FieldConfig) => {
    // Special case for richtext editor - make it span full width
    const isFullWidth = field.type === 'richtext';
    const hasError = form.formState.errors[field.name] || serverErrors[field.name];
    
    return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem className={cn(isFullWidth ? 'lg:col-span-2' : '', hasError && 'space-y-1')}>
            {field.type !== 'checkbox' && field.type !== 'switch' && (
              <FormLabel className={cn(hasError && 'text-destructive')}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}
            <FormControl>{renderFieldControl(field, formField)}</FormControl>
            {field.description && !hasError && (
              <FormDescription>{field.description}</FormDescription>
            )}
            <FormMessage />
            {serverErrors[field.name] && (
              <p className="text-sm text-destructive">{serverErrors[field.name]}</p>
            )}
          </FormItem>
        )}
      />
    );
  };

  // Render the appropriate form control based on field type
  const renderFieldControl = (fieldConfig: FieldConfig, field: any) => {
    const hasError = form.formState.errors[fieldConfig.name] || serverErrors[fieldConfig.name];
    const baseClassName = hasError ? 'border-destructive focus:border-destructive' : '';

    switch (fieldConfig.type) {
      case 'textarea':
        return (
          <Textarea
            className={cn('lg:col-span-2', baseClassName)}
            placeholder={fieldConfig.placeholder}
            disabled={isSubmitting || isLoading}
            {...field}
          />
        );
      case 'file':
        return (
          <Input
            type='file'
            className={baseClassName}
            disabled={isSubmitting || isLoading}
            onChange={(e) => field.onChange(e.target.files?.[0])}
          />
        );
      case 'files':
        return (
          <Input
            type='file'
            multiple
            className={baseClassName}
            disabled={isSubmitting || isLoading}
            onChange={(e) => field.onChange(e.target.files)}
          />
        );
      case 'select':
        return (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value?.toString()}
            disabled={isSubmitting || isLoading}>
            <SelectTrigger className={baseClassName}>
              <SelectValue placeholder={fieldConfig.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {fieldConfig.options?.map((option) => (
                <SelectItem key={option.value} value={option.value?.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return (
          <div className='flex items-center space-x-2'>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isSubmitting || isLoading}
              id={fieldConfig.name}
              className={hasError ? 'border-destructive' : ''}
            />
            <FormLabel htmlFor={fieldConfig.name} className={cn('!mt-0', hasError && 'text-destructive')}>
              {fieldConfig.label}
              {fieldConfig.required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          </div>
        );
      case 'radio':
        return (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isSubmitting || isLoading}
            className='flex flex-col space-y-1'>
            {fieldConfig.options?.map((option) => (
              <div key={option.value} className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={option.value}
                  id={`${fieldConfig.name}-${option.value}`}
                  className={hasError ? 'border-destructive' : ''}
                />
                <FormLabel
                  htmlFor={`${fieldConfig.name}-${option.value}`}
                  className={cn('!mt-0', hasError && 'text-destructive')}>
                  {option.label}
                </FormLabel>
              </div>
            ))}
          </RadioGroup>
        );
      case 'switch':
        return (
          <div className='flex items-center space-x-2'>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isSubmitting || isLoading}
              id={fieldConfig.name}
            />
            <FormLabel htmlFor={fieldConfig.name} className={cn('!mt-0', hasError && 'text-destructive')}>
              {fieldConfig.label}
              {fieldConfig.required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          </div>
        );
      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                disabled={isSubmitting || isLoading}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !field.value && 'text-muted-foreground',
                  baseClassName
                )}>
                <CalendarIcon className='mr-2 h-4 w-4' />
                {field.value ? (
                  format(field.value, 'PPP')
                ) : (
                  <span>{fieldConfig.placeholder || 'Pick a date'}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      case 'number':
        return (
          <Input
            type='number'
            placeholder={fieldConfig.placeholder}
            className={baseClassName}
            disabled={isSubmitting || isLoading}
            {...field}
          />
        );
      case 'richtext':
        return (
          <div className={cn("w-full min-h-[400px] border rounded-md", baseClassName)}>
            <CKEditor 
              value={field.value} 
              onChange={field.onChange}
            />
          </div>
        );
      default:
        return (
          <Input
            type={fieldConfig.type}
            placeholder={fieldConfig.placeholder}
            className={baseClassName}
            disabled={isSubmitting || isLoading}
            {...field}
          />
        );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-6 border p-4 rounded-md bg-white'>
        <div className='grid gap-4 lg:grid-cols-2'>
          {config.fields.map(renderField)}
        </div>
        <Button 
          className='text-white cursor-pointer rounded-sm min-w-[120px]' 
          type='submit'
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            config.submitLabel || 'Submit'
          )}
        </Button>
      </form>
    </Form>
  );
}
