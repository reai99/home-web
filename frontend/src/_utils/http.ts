import { notification } from 'antd';
import axios, { CreateAxiosDefaults } from 'axios';

function createService(config: CreateAxiosDefaults) {
  // 创建axios实例
  const service = axios.create({ 
    timeout: 18000000,
    ...(config || {}) 
  });

  // request拦截器
  service.interceptors.request.use(config => {
    return config;
  }, error => {
    Promise.reject(error)
  });
  
  // respone拦截器
  service.interceptors.response.use(response => {
      const { request, data: res } = response;
      let { code, status } = res;

      code = Number(code);
      status = Number(status);

      if (request.responseType) {
        return response;
      }
      if (code === 200 || status === 200) {
        return res; 
      }

      const errMsg = res?.msg || res?.message || 'error';

      if(code === -1) {
        notification.error({
          message: '提示',
          description: errMsg
        })
      }
      
      return Promise.reject(errMsg);
    }
  );
  return service;
}

const service = createService({});

function fetch(url: string, method: string, payload: Record<string, unknown>) {
  const source = axios.CancelToken.source();
  const promise = service({
    method,
    ...payload,
    cancelToken: source.token,
    url,
  });

  return promise;
}

export {
  fetch,
  createService,
}