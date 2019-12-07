const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 8010;
const imgPort = 8011;

const apiServer = http.createServer((req, res) =>{
    const url = 'http://news-at.zhihu.com/api/4' + req.url;
    console.log(url)
    const options = {
        url: url
    };
    function callback (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
            res.end(body);
        }
        else {
            console.error(response.statusCode)
        }
    }
    request.get(options, callback);
});
apiServer.listen(port, hostname, () => {
    console.log(`开始接口代理 http://${hostname}:${port}/`);
});

const imgServer = http.createServer((req, res) => {
    const url = 'http://pic4.zhimg.com/' + req.url.split("/img/")[1];
    const options = {
        url : url,
        encoding : null
    };
    function callback(error, response, body){
        if (!error && 200 === response.statusCode) {
            const contentType = response.headers['content-type'];
            res.setHeader('Access-Control-Allow-Origin','*');
            res.setHeader('Content-Type', contentType);
            res.end(body);
        }
        else {
            console.error(response.statusCode)
        }
    }
    request.get(options, callback);
})
imgServer.listen(imgPort, hostname, () => {
    console.log(`开始图片代理 http://${hostname}:${imgPort}/`);
})

