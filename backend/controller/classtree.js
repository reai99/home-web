const sqliteTool = require('../utils/sqlite-tool');

const sql_table_name = 'classtree';

const formatClassTreeList = (list) => {
  return list.map(v => ({
    title: v.name,
    key: v.id,
    parentId: v.parentId,
  }))
}

module.exports = {
  async list(ctx) {
    const data = ctx.request.body || {};
    let condition;
    const res = await sqliteTool.selectData(sql_table_name, condition);
    ctx.body = {
      code: 200,
      data: formatClassTreeList(res),
    };
  },
  async detail(ctx) {
    const params = ctx.request.query || {};
    try {
      let condition;
      if(params.classId) condition = `WHERE classId = '${params.classId}'`;
      const res = await sqliteTool.selectData('classtreeDetail', condition);
      ctx.body = {
        code: 200,
        data: res,
      };
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '查询数据异常，请稍后重试'
      }
    }
  },
  async detailSave(ctx) {
    const data = ctx.request.body;
    try {
      const res = await sqliteTool.selectData('classtreeDetail', `WHERE classId = '${data.classId}'`);
      if(res.length === 0) {
        await sqliteTool.insertData('classtreeDetail', data);
      } else {
        await sqliteTool.updateData('classtreeDetail', { ...res[0], ...data });
      }
      ctx.body = {
        code: 200,
        message: '保存成功',
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '插入数据异常，请稍后重试',
      }
    }
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