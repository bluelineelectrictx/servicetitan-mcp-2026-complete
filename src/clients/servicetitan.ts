import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  ServiceTitanConfig,
  OAuthTokenResponse,
  PaginatedResponse,
} from '../types/index.js';

export class ServiceTitanClient {
  private axiosInstance: AxiosInstance;
  private config: ServiceTitanConfig;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config: ServiceTitanConfig) {
    this.config = {
      baseUrl: 'https://api.servicetitan.io',
      ...config,
    };

    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'ST-App-Key': this.config.appKey,
      },
    });

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data as any;
          
          if (status === 401) {
            // Token expired, clear it
            this.accessToken = null;
            this.tokenExpiry = 0;
            throw new Error('Authentication failed. Token expired or invalid.');
          } else if (status === 429) {
            throw new Error('Rate limit exceeded. Please try again later.');
          } else if (status >= 500) {
            throw new Error(`ServiceTitan API error: ${data?.message || 'Internal server error'}`);
          } else {
            throw new Error(`API error (${status}): ${data?.message || error.message}`);
          }
        }
        throw new Error(`Network error: ${error.message}`);
      }
    );
  }

  /**
   * Authenticate using OAuth2 client_credentials flow
   */
  private async authenticate(): Promise<void> {
    const now = Date.now();
    
    // Return if token is still valid (with 5-minute buffer)
    if (this.accessToken && this.tokenExpiry > now + 300000) {
      return;
    }

    try {
      const tokenUrl = 'https://auth.servicetitan.io/connect/token';
      const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
      });

      const response = await axios.post<OAuthTokenResponse>(tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = now + response.data.expires_in * 1000;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`OAuth authentication failed: ${error.response?.data?.error_description || error.message}`);
      }
      throw error;
    }
  }

  /**
   * Make authenticated GET request
   */
  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    await this.authenticate();

    const response = await this.axiosInstance.get<T>(path, {
      params: {
        tenant: this.config.tenantId,
        ...params,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return response.data;
  }

  /**
   * Make authenticated POST request
   */
  async post<T>(path: string, data?: any, params?: Record<string, any>): Promise<T> {
    await this.authenticate();

    const response = await this.axiosInstance.post<T>(path, data, {
      params: {
        tenant: this.config.tenantId,
        ...params,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return response.data;
  }

  /**
   * Make authenticated PUT request
   */
  async put<T>(path: string, data?: any, params?: Record<string, any>): Promise<T> {
    await this.authenticate();

    const response = await this.axiosInstance.put<T>(path, data, {
      params: {
        tenant: this.config.tenantId,
        ...params,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return response.data;
  }

  /**
   * Make authenticated PATCH request
   */
  async patch<T>(path: string, data?: any, params?: Record<string, any>): Promise<T> {
    await this.authenticate();

    const response = await this.axiosInstance.patch<T>(path, data, {
      params: {
        tenant: this.config.tenantId,
        ...params,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return response.data;
  }

  /**
   * Make authenticated DELETE request
   */
  async delete<T>(path: string, params?: Record<string, any>): Promise<T> {
    await this.authenticate();

    const response = await this.axiosInstance.delete<T>(path, {
      params: {
        tenant: this.config.tenantId,
        ...params,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return response.data;
  }

  /**
   * Get paginated results automatically
   * Handles ServiceTitan's pagination pattern
   */
  async getPaginated<T>(
    path: string,
    params: Record<string, any> = {},
    maxPages: number = 10
  ): Promise<T[]> {
    const results: T[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= maxPages) {
      const response = await this.get<PaginatedResponse<T>>(path, {
        ...params,
        page,
        pageSize: params.pageSize || 50,
      });

      results.push(...response.data);
      hasMore = response.hasMore;
      page++;
    }

    return results;
  }

  /**
   * Get a single page of results
   */
  async getPage<T>(
    path: string,
    page: number = 1,
    pageSize: number = 50,
    params: Record<string, any> = {}
  ): Promise<PaginatedResponse<T>> {
    return await this.get<PaginatedResponse<T>>(path, {
      ...params,
      page,
      pageSize,
    });
  }
}
