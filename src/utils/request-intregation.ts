import requestHandler from '@/utils/request-handler';
import toast from 'react-hot-toast';
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
      failure: (message) => {
        if (showErrors) {
          toast.error(message || 'Failed to fetch data');
        }
        resolve(undefined);
      },
    });
  });
}

/**
 * Create or update data
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
        toast.success(message || 'Data updated successfully');
        resolve(response.data);
      },
      failure: (message) => {
        toast.error(message || 'Something went wrong');
        resolve(undefined);
      },
    });
  });
}

/**
 * Upload an image
 * @param img - File or string to upload
 * @param folderName - Optional folder name (defaults to 'logo')
 * @returns Promise with the image URL or undefined
 */
async function uploadImage({
  img,
  folder,
  alt,
}: {
  img: File | string;
  folder?: string | undefined;
  alt?: string | undefined;
}): Promise<{ id:number } | undefined> {
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
      success: (_, response) => {
        resolve(response);
      },
      failure: (message) => {
        toast.error(message || 'Failed to upload image');
        resolve(undefined);
      },
    });
  });
}

/**
 * Delete data
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
        toast.success(message || 'Data deleted successfully');
        resolve(true);
      },
      failure: (message) => {
        toast.error(message || 'Something went wrong');
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
