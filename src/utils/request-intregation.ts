import requestHandler from '@/utils/request-handler';
import { ErrorHandler } from '@/utils/error-handler';
import ENDPOINTS from './endpoints';
import { getCookie } from './cookie-handler';

// Define proper types for better type safety
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Base configuration creator for API requests
 */
async function getBaseConfig() {
  return {
    baseUrl: ENDPOINTS.BASE,
    token: (await getCookie('token')) || undefined,
  };
}

/**
 * Fetch data from the API
 * @param endPoint - API endpoint path
 * @param searchParams - Query parameters
 * @param showErrors - Whether to show error toasts
 * @returns Promise with the response data or undefined
 */
async function fetchData<T = any, S = any>(
  endPoint: string,
  searchParams?: S,
  showErrors = false
): Promise<T | undefined> {
  const { baseUrl, token } = await getBaseConfig();

  return new Promise((resolve) => {
    requestHandler.get({
      endPoint: `${baseUrl}/${endPoint}`,
      params: searchParams || {},
      token,
      success: (_, response) => {
        resolve(response.data);
      },
      failure: (message, responseData) => {
        if (showErrors) {
          if (responseData?.isNetworkError) {
            ErrorHandler.handleNetworkError(responseData.originalError);
          } else {
            ErrorHandler.handleFormError(responseData, 'Fetch Error');
          }
        }
        resolve(undefined);
      },
    });
  });
}

/**
 * Create or update data with enhanced error handling
 * @param endPoint - API endpoint path
 * @param data - Data to send
 * @param id - Optional ID for update operations
 * @returns Promise with the response data or undefined
 */
async function postAndPatch<T = any, D = any>(
  endPoint: string,
  data: D,
  id?: string | number
): Promise<T | undefined> {
  const { baseUrl, token } = await getBaseConfig();
  const url = id ? `${baseUrl}/${endPoint}/${id}` : `${baseUrl}/${endPoint}`;
  const method = id ? 'patch' : 'post';

  return new Promise((resolve) => {
    requestHandler[method]({
      endPoint: url,
      data,
      token,
      success: (message, response) => {
        ErrorHandler.showSuccess(message || (id ? 'Data updated successfully' : 'Data created successfully'));
        resolve(response.data || response);
      },
      failure: (message, responseData) => {
        if (responseData?.isNetworkError) {
          ErrorHandler.handleNetworkError(responseData.originalError);
        } else {
          // Check if it's validation errors or general error
          const hasValidationErrors = ErrorHandler.handleFormError(responseData, id ? 'Update Error' : 'Create Error');
          
          // For debugging in development
          if (process.env.NODE_ENV === 'development') {
            console.error('API Error Details:', {
              endpoint: url,
              method,
              data,
              responseData,
            });
          }
        }
        resolve(undefined);
      },
    });
  });
}

/**
 * Upload an image with enhanced error handling
 * @param img - File or string to upload
 * @param folder - Optional folder name (defaults to 'images')
 * @param alt - Alt text for the image
 * @returns Promise with the image response or undefined
 */
async function uploadImage({
  img,
  folder,
  alt,
}: {
  img: File | string;
  folder?: string | undefined;
  alt?: string | undefined;
}): Promise<{ id: number } | undefined> {
  const { token } = await getBaseConfig();
  const formData = new FormData();

  formData.append('file', img);
  formData.append('alt', alt || '');
  formData.append('folder', folder || 'images');

  return new Promise((resolve) => {
    requestHandler.postWithFile({
      endPoint: ENDPOINTS.BASE + '/upload',
      data: formData,
      token,
      success: (message, response) => {
        ErrorHandler.showSuccess(message || 'Image uploaded successfully');
        resolve(response);
      },
      failure: (message, responseData) => {
        if (responseData?.isNetworkError) {
          ErrorHandler.handleNetworkError(responseData.originalError);
        } else {
          ErrorHandler.handleFormError(responseData, 'Upload Error');
        }
        resolve(undefined);
      },
    });
  });
}

/**
 * Delete data with enhanced error handling
 * @param endPoint - API endpoint path
 * @param id - ID of the item to delete
 * @returns Promise indicating success or failure
 */
async function deleteData(
  endPoint: string,
  id: string | number
): Promise<boolean> {
  const { baseUrl, token } = await getBaseConfig();

  return new Promise((resolve) => {
    requestHandler.delete({
      endPoint: `${baseUrl}/${endPoint}/${id}`,
      token,
      success: (message) => {
        ErrorHandler.showSuccess(message || 'Data deleted successfully');
        resolve(true);
      },
      failure: (message, responseData) => {
        if (responseData?.isNetworkError) {
          ErrorHandler.handleNetworkError(responseData.originalError);
        } else {
          ErrorHandler.handleFormError(responseData, 'Delete Error');
        }
        resolve(false);
      },
    });
  });
}

/**
 * Create data
 * @param endPoint - API endpoint path
 * @param data - Data to send
 * @returns Promise with the response data or undefined
 */
async function createData<T = any, D = any>(
  endPoint: string,
  data: D
): Promise<T | undefined> {
  return postAndPatch<T, D>(endPoint, data);
}

/**
 * Update data
 * @param endPoint - API endpoint path
 * @param id - ID of the item to update
 * @param data - Data to send
 * @returns Promise with the response data or undefined
 */
async function updateData<T = any, D = any>(
  endPoint: string,
  id: string | number,
  data: D
): Promise<T | undefined> {
  return postAndPatch<T, D>(endPoint, data, id);
}

export {
  fetchData,
  postAndPatch,
  uploadImage,
  deleteData,
  createData,
  updateData,
};
