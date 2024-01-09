import { flow } from "mobx";
import { fetch } from "../_utils/http";

class Common {
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