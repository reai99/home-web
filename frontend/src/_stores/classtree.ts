import { flow } from "mobx";
import { fetch } from "../_utils/http";

class Classtree {

  getList = flow(function* (payload) {
    try {
      const { data } = yield fetch('/api/common/classtree/list', 'post', payload);
      return data;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  detail = flow(function* (payload) {
    try {
      const { data } = yield fetch('/api/admin/classtree/detail', 'get', payload);
      return data;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  detailSave = flow(function* (payload) {
    try {
      const { data } = yield fetch('/api/admin/classtree/detail/save', 'post', payload);
      return data;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  add = flow(function* (payload) {
    try {
      const res = yield fetch('/api/admin/classtree/add', 'post', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  update = flow(function* (payload) {
    try {
      const res = yield fetch('/api/admin/classtree/update', 'post', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })
  delete = flow(function* (payload) {
    try {
      const res = yield fetch('/api/admin/classtree/delete', 'get', payload);
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  })
}

export default new Classtree();