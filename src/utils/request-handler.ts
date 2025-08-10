import { ErrorHandler } from './error-handler';

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  endPoint: string;
  token?: string;
  params?: Record<string, any>;
  data?: any;
  success: (message: string, response: any) => void;
  failure: (message: string, responseData?: any) => void;
}

type ApiResponse = any;

class RequestHandler {
  /**
   * Base method to handle all HTTP requests
   */
  private async request<T = any>({
    method,
    endPoint,
    token,
    params,
    data,
    success,
    failure,
    isFormData = false,
  }: RequestOptions & {
    method: HttpMethod;
    isFormData?: boolean;
  }): Promise<void> {
    try {
      // Build URL with query parameters for GET requests
      let url = endPoint;
      if (params && Object.keys(params).length > 0 && method === 'GET') {
        const queryString = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          queryString.append(key, String(value));
        });
        url = `${endPoint}?${queryString.toString()}`;
      }

      // Prepare headers
      const headers: Record<string, string> = {};

      // Only add Content-Type for non-FormData requests
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      // Add authorization if token is provided
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Prepare request options
      const requestOptions: RequestInit = {
        method,
        headers,
        cache: 'no-cache',
      };

      // Add body for non-GET requests
      if (method !== 'GET' && data !== undefined) {
        requestOptions.body = isFormData ? data : JSON.stringify(data || {});
      }

      // Execute request
      const response = await fetch(url, requestOptions);
      let responseData: any;
      
      try {
        responseData = await response.json();
      } catch (parseError) {
        // If JSON parsing fails, create a basic error response
        responseData = {
          message: `Failed to parse response: ${response.statusText}`,
          status: response.status,
        };
      }

      // Handle response
      if (!response.ok) {
        // Pass complete response data for better error handling
        const errorMessage = responseData?.message || response.statusText || 'Request failed';
        failure(errorMessage, responseData);
        return;
      }

      // Success case
      success(responseData?.message || 'success', responseData);
    } catch (error: any) {
      // Handle network and other exceptions
      const errorMessage = error?.message || 'An unexpected error occurred';
      failure(errorMessage, { 
        message: errorMessage, 
        isNetworkError: true,
        originalError: error 
      });
    }
  }

  /**
   * GET request
   */
  async get(options: RequestOptions): Promise<void> {
    return this.request({
      ...options,
      method: 'GET',
    });
  }

  /**
   * POST request with JSON body
   */
  async post(options: RequestOptions): Promise<void> {
    return this.request({
      ...options,
      method: 'POST',
    });
  }

  /**
   * PATCH request with JSON body
   */
  async patch(options: RequestOptions): Promise<void> {
    return this.request({
      ...options,
      method: 'PATCH',
    });
  }

  /**
   * DELETE request
   */
  async delete(options: RequestOptions): Promise<void> {
    return this.request({
      ...options,
      method: 'DELETE',
    });
  }

  /**
   * POST request with FormData body
   */
  async postWithFile(options: RequestOptions): Promise<void> {
    return this.request({
      ...options,
      method: 'POST',
      isFormData: true,
    });
  }

  /**
   * PATCH request with FormData body
   */
  async patchWithFile(options: RequestOptions): Promise<void> {
    return this.request({
      ...options,
      method: 'PATCH',
      isFormData: true,
    });
  }
}

const requestHandler = new RequestHandler();
export default requestHandler;

// For backward compatibility
export type TRequest = RequestOptions;
export type TpostResponse = ApiResponse;
export type TpatchResponse = ApiResponse;
export type TdeleteResponse = ApiResponse;
export type TpostWithFileResponse = ApiResponse;
