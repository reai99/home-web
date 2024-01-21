const sqliteTool = require('../utils/sqlite-tool');

const sql_table_name = 'modules';

module.exports = {
  async list(ctx) {
    const data = ctx.request.body || {};
    let condition;
    if(data.code) { 
      condition = `WHERE classCode = '${data.code}'`
    }
    const res = await sqliteTool.selectData(sql_table_name, condition);
    ctx.body = {
      code: 200,
      data: res,
    };
  },
  async add(ctx) {
    const data = ctx.request.body;
    try {
      await sqliteTool.insertData(sql_table_name, data);
      ctx.body = {
        code: 200,
        message: '新增成功',
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '插入数据异常，请稍后重试',
      }
    }
  },
  async update(ctx) {
    const data = ctx.request.body;
    try {
      await sqliteTool.updateData(sql_table_name, data);
      ctx.body = {
        code: 200,
        message: '更新成功',
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: error || '更新数据异常，请稍后重试',
      }
    }
  },
  async delete(ctx) {
    const params = ctx.request.query || {};
    if(!params.ids) {
      return ctx.body = {
        code: -1,
        message: 'ids参数不能为空'
      }
    }
    try {
      await sqliteTool.deleteData(sql_table_name, params);
      ctx.body = {
        code: 200,
        message: '删除成功',
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '删除数据异常，请稍后重试'
      }
    }
  }
}