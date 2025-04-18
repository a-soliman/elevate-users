import { ID, IUser } from '../data/types/user';
import { makeLoggerWithContext } from './logger';

type UserIds = ID[];
interface IBaseResponse {
  error?: string;
}

interface IGetUsersResponse extends IBaseResponse {
  user_ids: UserIds;
}
interface IGetUserInfoResponse extends IUser, IBaseResponse {}

class ApiService {
  static readonly BASE_URL = 'https://interviews-accounts.elevateapp.com/api/ui';

  static readonly AUTHENTICATION_USER_ID = import.meta.env.VITE_API_USER_ID;
  static readonly AUTHENTICATION_TOKEN = import.meta.env.VITE_API_TOKEN;

  private readonly logger = makeLoggerWithContext('API SERVICE');

  public async getUsers(): Promise<number[]> {
    return (await this.getValidResponse<IGetUsersResponse>('users')).user_ids;
  }

  public async getUserInfo(id: ID): Promise<IGetUserInfoResponse> {
    return this.getValidResponse<IGetUserInfoResponse>(`users/${id}`);
  }

  // ================ Private methods ================
  private constructAuthenticatedUrl(path: string): string {
    const { BASE_URL, AUTHENTICATION_USER_ID, AUTHENTICATION_TOKEN } = ApiService;
    return `${BASE_URL}/${path}?authentication_user_id=${AUTHENTICATION_USER_ID}&authentication_token=${AUTHENTICATION_TOKEN}`;
  }

  private async getValidResponse<T extends IBaseResponse>(path: string): Promise<T> {
    this.logger.info(`Starting API call to path = `, path);

    const url = this.constructAuthenticatedUrl(path);
    const response = await fetch(url);

    if (!response.ok) {
      this.logger.error(`Error while making API call to path = ${path}, error = ${response.statusText}`);
      throw new Error(response.statusText);
    }

    const data: T = await response.json();

    if (data.error) {
      this.logger.error(`Error while making API call to path = ${path}, error = ${data.error}`);
      throw new Error(data.error);
    }

    this.logger.info(`Successfully finished API call to path = `, path);
    return data;
  }
}

export const apiService = new ApiService();
