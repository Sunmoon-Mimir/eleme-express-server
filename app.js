// 引入express
const express = require('express');
const bodyParser = require('body-parser');

// 创建服务器对象
const app = express();

// 注册中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/*+json' }))

//本地服务器解决跨域，不可缺
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


/* 模拟后台 */

// 处理get请求
app.get('/api/citylist', (req, res) => {
        res.json(require('./datas/cityName.json'))
    })
    //分类入口
app.get('/api/foodtype', (req, res) => {
    res.json(require('./datas/home.json'))
})

//首页列表
app.get('/api/shoplist', (req, res) => {
    var offset = parseInt(req.query.offset),
        len = parseInt(req.query.len);
    console.log(offset, len);
    var data = require('./datas/list.json');
    //此时数据还是全部请求，没有实现懒加载
    // 重新定义一个对象，拆分数据
    res.json({ meta: data.meta, items: data.items.slice(offset, offset + len) });
})

//详情页
app.get('/api/detail', (req, res) => {
    var id = req.query.id;
    //根据id请求对应的数据
    var data = require('./datas/detail.json')[id];
    //此时数据还是全部请求，没有实现懒加载
    // 重新定义一个对象，拆分数据
    res.json(data ? data : null);
})

// 开启监听
app.listen(4000, () => {
    console.log('4000端口已经启动')
})