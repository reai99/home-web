const router = require('koa-router')();

const Controler = require('../controller');
const apiDecorator = require('../utils/api_generator');

router.all('/api/common/template/download', Controler['common'].templateDownload);
router.all('/api/common/import', Controler['common'].importProcess);
router.all('/api/common/download', Controler['common'].downloadProcess);

router.post('/api/register', Controler['validate'].register);
router.post('/api/login', Controler['validate'].login);
router.post('/api/logout', Controler['validate'].logout);

router.all('/api/common/stream', Controler['common'].streamProcess)

router.all('/api/process', async function(ctx) {
  await apiDecorator(ctx)
});

router.post('/api/common/scheduler/select_task', Controler['scheduler'].selectTask)
router.post('/api/common/scheduler/add_task', Controler['scheduler'].addTask);
router.get('/api/common/scheduler/del_task', Controler['scheduler'].delTask);
router.post('/api/common/scheduler/upd_task', Controler['scheduler'].updTask);

// 后台管理——分类管理
router.post('/api/common/classify/list', Controler['admin_classify'].list)
router.post('/api/admin/classify/add', Controler['admin_classify'].add);
router.post('/api/admin/classify/update', Controler['admin_classify'].update);
router.get('/api/admin/classify/delete', Controler['admin_classify'].delete);

// 后台管理——模块管理
router.post('/api/common/modules/list', Controler['admin_modules'].list)
router.post('/api/admin/modules/add', Controler['admin_modules'].add);
router.post('/api/admin/modules/update', Controler['admin_modules'].update);
router.get('/api/admin/modules/delete', Controler['admin_modules'].delete);

// 知识库——分类树
router.post('/api/common/classtree/list', Controler['classtree'].list);
router.get('/api/common/classtree/detail', Controler['classtree'].detail);
router.post('/api/admin/classtree/add', Controler['classtree'].add);
router.post('/api/admin/classtree/update', Controler['classtree'].update);
router.get('/api/admin/classtree/delete', Controler['classtree'].delete);
router.post('/api/common/classtree/detail/save', Controler['classtree'].detailSave);

// 接口访问
router.all('/api/(.*)', async function (ctx) {
  ctx.body = { code : -1, msg: '没有找到对应的接口' }
});

// 页面访问
router.get('/(.*)', async function (ctx) {
  await ctx.render('index', { 
    title: '测试项目',
    env: process.env.CONFIG_ENV
  });
});



module.exports = router;
