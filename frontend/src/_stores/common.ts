import { flow } from "mobx";
import { fetch } from "../_utils/http";

class Common {
  cacheRouterConfig = { now: null, before: null };

  setCacheRouterConfig = (location) => {
    if(!this.cacheRouterConfig.now) {
      this.cacheRouterConfig.now = { ...location };
    } else {
      this.cacheRouterConfig.before = { ...this.cacheRouterConfig.now };
      this.cacheRouterConfig.now = { ...location };
    }
  }

  userLogin = flow(function* (payload) {
    try {
      const res = yield fetch('/api/login', 'post', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  userRegister = flow(function* (payload) {
    try {
      const res = yield fetch('/api/register', 'post', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })
}

export default new Common();