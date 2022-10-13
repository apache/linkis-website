---
title: 如何进行 Kubernetes 部署
authors: [jacktao]
tags: [github]
---

## 1. 依赖版本

- kind github：https://github.com/kubernetes-sigs/kind

- kind官网：[kind.sigs.k8s.io/](https://kind.sigs.k8s.io/)

版本:

- kind 0.14.0
- docker  20.10.17
- node v14.19.3

注意：

- 1.先确保前后端能够正常编译

- 2.确保组件依赖版本

- 3.kind是用docker容器模拟节点的 机器重启回来容器都变了 调度器就不工作了 这个是kind的limitation,官方文档有详细说明。

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



## 3. 安装kind

（1）手工下载kind二进制

https://github.com/kubernetes-sigs/kind/releases

（2）安装kind二进制

```
chmod +x ./kind

mv kind-linux-amd64 /usr/bin/kind
```



## 4. 安装JDK 和 Maven 

（1）参考通用安装教程，安装如下组件

jdk 1.8

mavne 3.5+

## 5. 安装NodeJS

（1）安装版本

node v14.19.3

（2）安装nvm

```
export http_proxy=http://10.0.0.150:7890

export https_proxy=http://10.0.0.150:7890

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```



（3）安装nodejs

```
nvm ls-remote

nvm install v14.19.3
```



（4）配置NPM

```
npm config set registry https://registry.npmmirror.com

npm config set sass_binary_site https://registry.npmmirror.com/binary.html?path=node-sass/
```



（5）编译前端

```
npm install -g yarn

yarn

yarn build

yarn 
```



## 6. 编译linkis

```
\# 1. When compiling for the first time, execute the following command first

./mvnw -N install

\# 2. make the linkis distribution package

\# - Option 1: make the linkis distribution package only

./mvnw clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true

\# - Option 2: make the linkis distribution package and docker image

./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true

\# - Option 3: linkis distribution package and docker image (included web)

./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dlinkis.build.web=true
```





## 7. 创建集群 
```
dos2unix ./linkis-dist/helm/scripts/*.sh

./linkis-dist/helm/scripts/create-test-kind.sh
```





## 8. 安装helm charts

```
 ./scripts/install-charts.sh linkis linkis-demo
```





## 9.访问linkis页面

```
kubectl port-forward -n linkis  --address=0.0.0.0 service/linkis-demo-web 8087:8087

http://10.0.2.101:8087
```





## 10.使用Linkis客户端测试

```
kubectl -n linkis exec -it linkis-demo-ps-publicservice-77d7685d9-f59ht -- bash
./linkis-cli -engineType shell-1 -codeType shell -code "echo \"hello\" "  -submitUser hadoop -proxyUser hadoop
```



## 11.安装kubectl

```
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

yum install -y --nogpgcheck kubectl

kubectl config view  查看集群信息
kubectl config get-contexts  得到所有集群context对象信息
kubectl cluster-info  查看当前集群情况
```

