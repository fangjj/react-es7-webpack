# react-webpack-es6-route

##功能介绍
  * 解析es6语法<br />
  * 修改保存文件的同时，浏览器热更新<br />
  * 对css文件、第三方js库文件，业务js文件分别打包。<br />
  
##使用方法
  * 安装<br />
  
    <code>cd react-webpack-es6-route</code><br />
    
    <code>npm install</code><br />
  * 开发模式，启动本地服务。修改文件，自动编译（不会打包输出到build文件夹，知识保存在内存），浏览器自动刷新<br />
  
     <code>npm run dev</code>
     
  * 文件打包，在build文件夹下生成main.css、vendor.js、main.js<br />
  
     <code>npm run build</code>
