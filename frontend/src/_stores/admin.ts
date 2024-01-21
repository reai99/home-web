import { flow } from "mobx";
import { fetch } from "../_utils/http";

class Admin {
  getClassifyList = flow(function* (payload) {
    try {
      const { data } = yield fetch('/api/admin/classify/list', 'post', payload);
      return data;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  addClassify = flow(function* (payload) {
    try {
      const res = yield fetch('/api/admin/classify/add', 'post', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  updClassify = flow(function* (payload) {
    try {
      const res = yield fetch('/api/admin/classify/update', 'post', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  delClassify = flow(function* (payload) {
    try {
      const res = yield fetch('/api/admin/classify/delete', 'get', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })

  getModulesList = flow(function* (payload) {
    try {
      const { data } = yield fetch('/api/admin/modules/list', 'post', payload);
      return data;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  addModules = flow(function* (payload) {
    try {
      const res = yield fetch('/api/admin/modules/add', 'post', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  updModules = flow(function* (payload) {
    try {
      const res = yield fetch('/api/admin/modules/update', 'post', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  delModules = flow(function* (payload) {
    try {
      const res = yield fetch('/api/admin/modules/delete', 'get', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })
}

export default new Admin();