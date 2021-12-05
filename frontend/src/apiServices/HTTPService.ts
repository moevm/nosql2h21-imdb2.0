import axios, { AxiosRequestConfig, Method } from "axios";

export default class HTTPService {
  private readonly basePath: string;

  private readonly host: string;

  constructor(basePath: string, host = "http://localhost:5000/api") {
    this.basePath = basePath;
    this.host = host;
  }

  /**
   * GET запрос
   *
   * @param {string} path - Api путь
   * @param {object} options - Параметры запроса
   */
  public GET<T>(path = "", options?: AxiosRequestConfig): Promise<T> {
    return this.safeFetch(`${this.basePath}/${path}`, "get", null, options);
  }

  /**
   * POST запрос
   *
   * @param {string} path - Api путь
   * @param data {object} - данные для передачи
   * @param {object} options - Параметры запроса
   */
  public POST<T>(
    path = "",
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return this.safeFetch(`${this.basePath}/${path}`, "post", data, options);
  }

  /**
   * PUT запрос
   *
   * @param {string} path - Api путь
   * @param data {object} - данные для передачи
   * @param {object} options - Параметры запроса
   */
  public PUT<T>(
    path = "",
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return this.safeFetch(`${this.basePath}/${path}`, "put", data, options);
  }

  /**
   * PATCH запрос
   *
   * @param {string} path - Api путь
   * @param data {object} - данные для передачи
   * @param {object} options - Параметры запроса
   */
  public PATCH<T>(
    path = "",
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return this.safeFetch(`${this.basePath}/${path}`, "patch", data, options);
  }

  /**
   * DELETE запрос
   *
   * @param {string} path - Api путь
   * @param options
   */
  public DELETE(path = "", options?: AxiosRequestConfig): Promise<any> {
    return this.safeFetch(`${this.basePath}/${path}`, "delete", null, options);
  }

  /**
   * Запрос
   *
   * @param {string} path - Api путь
   * @param {string} method - Метод
   * @param {string} data - Тело
   * @param {Object} options - Параметры запроса
   * @returns {Object|string}
   */
  public async safeFetch(
    path: string,
    method: Method,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<any> {
    if (!options.headers) {
      options.headers = { "Content-Type": "application/json" };
    }

    if (options.headers && !options.headers["Content-Type"]) {
      options.headers["Content-Type"] = "application/json";
    }

    const baseURL = this.host;
    const url = `${path}`;

    try {
      const response = await axios.request({
        baseURL,
        url,
        method,
        data,
        ...options,
      });

      return response.data;
    } catch (errorData: any) {
      if (axios.isCancel(errorData)) {
        // eslint-disable-next-line
        console.log(errorData);

        return {};
      }

      throw errorData.response;
    }
  }
}
