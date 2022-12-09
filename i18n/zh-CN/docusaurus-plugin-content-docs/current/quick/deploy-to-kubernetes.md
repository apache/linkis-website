---
title: 容器化部署
sidebar_position: 2
---

这篇文章介绍一下如何在就 Kind 的 Kubernetes 的环境中部署 Linkis 服务，以方便更轻量化的学习使用和调试。

## 1. 依赖版本
- kind github：https://github.com/kubernetes-sigs/kind  
- kind官网：[kind.sigs.k8s.io/](https://kind.sigs.k8s.io/)

### 1.1 版本:
- kind 0.14.0
- docker 20.10.17
- centos 7.6
- helm 3.x

### 1.2 注意：
- 1.确保组件依赖版本
- 2.kind 是用 docker 容器模拟节点的，机器重启回来容器都变了，调度器就不工作了，这个是kind的limitation ，官方文档有详细说明。

## 2.安装docker
### 2.1 安装教程
```
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sudo sed -i 's+download.docker.com+mirrors.aliyun.com/docker-ce+' /etc/yum.repos.d/docker-ce.repo
sudo yum makecache fast
sudo yum -y install docker-ce
systemctl start docker
systemctl enable docker
```

### 2.2 设置国内镜像
```
vi /etc/docker/daemon.json
{
"registry-mirrors": ["http://hub-mirror.c.163.com"],
"insecure-registries": ["https://registry.mydomain.com","http://hub-mirror.c.163.com"]
}
```

## 3. 安装 kind
###  3.1 手工下载kind二进制
```
https://github.com/kubernetes-sigs/kind/releases
```
### 3.2 安装kind二进制
```
chmod +x ./kind
mv kind-linux-amd64 /usr/bin/kind
```
## 4. 安装linkis
### 4.1 下载或自行编译 linkis1.3.1 部署包
使用版本：dev-1.3.1 分支编译版本
```
apache-linkis-1.3.1-incubating-bin.tar.gz
```
### 4.2 创建目录
```
mkdir -p /opt/data/common/extendlib
```
### 4.3 拷贝驱动

拷贝 mysql 驱动到 /opt/data/common/extendlib
```
curl https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.28/mysql-connector-java-8.0.28.jar -o /opt/data/common/extendlib/[mysql-connector-java-8.0.28.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.28/mysql-connector-java-8.0.28.jar)
```
### 4.4 重置kind（非必要）
```
./bin/install-linkis-to-kubernetes.sh reset
```
### 4.5 拉取镜像
```
./bin/install-linkis-to-kubernetes.sh pull -mghcr.dockerproxy.com
```
### 4.6 安装linkis到kind中
```
./bin/install-linkis-to-kubernetes.sh install -l -mghcr.dockerproxy.com
```
### 4.7 使用命令查看服务，等待全部启动成功
```
kubectl get pods -A
```
![](/Images/deployment/kubernetes/pods.jpg)


### 4.8 拷贝 ldh 环境到 linkis
```
./helm/scripts/prepare-for-spark.sh
```
### 4.9 开启端口映射
```
./helm/scripts/remote-proxy.sh start
```
### 4.10 访问系统
```
linkis-web: http://10.0.2.101:8088/
eureka: http://10.0.2.101:20303/
```

![](/Images/deployment/kubernetes/eureka.png)

### 4.11 执行 linkis-cli 执行任务
```
进入容器
./helm/scripts/login-pod.sh cg-engineconnmanager
执行shell测试
sh ./bin/linkis-cli -engineType shell-1 -codeType shell -code "echo "hello" "  -submitUser hadoop -proxyUser hadoop
执行hive测试
sh ./bin/linkis-cli -engineType hive-2.3.3 -codeType hql -code "show tables"  -submitUser hadoop -proxyUser hadoop
执行spark测试
sh ./bin/linkis-cli -engineType spark-2.4.3 -codeType sql -code "show tables"  -submitUser hadoop -proxyUser hadoop
执行python测试
sh ./bin/linkis-cli -engineType python-python2 -codeType python -code "print(\"hello\")"  -submitUser hadoop -proxyUser hadoop  -confMap  python.version=python
```

![](/Images/deployment/kubernetes/linkis.jpg)
