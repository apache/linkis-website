---
title: 快速启动
sidebar_position: 2
---

>启动脚本需要在安装完成之后执行

## 1 启动服务 
  
  在安装目录执行以下命令，启动所有服务：    

```bash  
  ./bin/start-all.sh > start.log 2>start_error.log
```
        
## 2 查看是否启动成功
    
  可以在Eureka界面查看服务启动成功情况，查看方法：
    
  使用http://${EUREKA_INSTALL_IP}:${EUREKA_PORT}, 在浏览器中打开，查看服务是否注册成功。
    
  如果您没有在config.sh指定EUREKA_INSTALL_IP和EUREKA_INSTALL_IP，则HTTP地址为：http://127.0.0.1:20303
    
  如下图，如您的Eureka主页出现以下微服务，则表示服务都启动成功，可以正常对外提供服务了：
    
  ![Eureka](../images/ch1/Eureka_homepage.png)

## 3 快速使用Linkis
      
  请参考[快速使用Linkis](quick-deploy#5-快速使用linkis)