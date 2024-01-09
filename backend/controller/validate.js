
const { generateToken, parseToken } = require('../utils/token_utils');
const sqliteTool = require('../utils/sqlite-tool');

module.exports = {
  async register(ctx) {
    const { username, password } = ctx.request.body || {};
    const data = {
      username,
      password,
    }
    if(!username || !password) {
      return ctx.body = {
        code: -1,
        message: '账号或密码不能为空',
      }
    }
    try {
      const res = await sqliteTool.selectData('users', `WHERE username = '${username}'`);
      if(res.length === 0) {
        await sqliteTool.insertData('users',data);
        ctx.body = {
          code: 200,
          message: '注册成功',
        }
      } else {
        ctx.body = {
          code: -1,
          message: '账号已存在',
        }
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '插入数据异常，请稍后重试',
      }
    }
  },
  async login(ctx) {
    const { username, password } = ctx.request.body || {};
    if(!username || !password) {
      return ctx.body = {
        code: -1,
        message: '账号或密码不能为空',
      }
    }
    const res = await sqliteTool.selectData('users', `WHERE username = '${username}' AND password = '${password}'`);
    if(res.length) {
      const token = generateToken(username);
      ctx.cookies.set('token', token, { httpOnly: true, overwrite: true, maxAge:  12 * 3600 * 1000 });
      return ctx.body = {
        code: 200,
        message: '登陆成功',
      }
    } else {
      return ctx.body = {
        code: -1,
        message: '账号或密码错误',
      }
    }
  },
  async logout(ctx) {
    ctx.cookies.set('token', '');
    ctx.body = {code: 1, msg: '退出成功'}
    return;
  }
}