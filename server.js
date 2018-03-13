const express = require('express');
import React from 'react';
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');
import Demo from './src/demo';

// html+css渲染
const html = ReactDOMServer.renderToStaticMarkup(
<div className="divider">
    <h2>itbilu.com</h2>
    <hr/>
</div>);

// 渲染react组件
// 此时异步请求到的数据还没有写入页面
// const html = ReactDOMServer.renderToStaticMarkup(<Demo />);
console.log(html);
let content;
const app = express();

app.listen(3000,err => {
    if(!err){
        console.log('服务已启动，监听3000端口');
    }
});  

fs.readFile('./index.html','utf8', (err,data) => {
    if(!err) {
        content = data.replace(/<div id="box"><\/div>/,`<div id="box">${html}</div>`);
        console.log(content);
    }
});

//allow custom header and CORS
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    if (req.method == 'OPTIONS') {
      res.send(200); //让options请求快速返回
    }
    else {
      next();
    }
  });


app.get('/ssr', (req,res) => {
    res.send(content);
});
