---
title: Deploy Linkis with Kubernetes
authors: [jacktao]
tags: [github]
---

**1. Dependencies and versions**

kind github：https://github.com/kubernetes-sigs/kind

kind website：[kind.sigs.k8s.io/](https://kind.sigs.k8s.io/)

version:

kind 0.14.0

docker  20.10.17

node v14.19.3

Note:

1. Ensure that the front and back ends can compile properly

2. Ensure that the component depends on the version

3. Kind refers to the machine that uses docker container to simulate nodes. When the machine is restarted, the scheduler does not work because the container is changed.

 

**2.Install the docker**

（1）Install the tutorial

```
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

sudo sed -i 's+download.docker.com+mirrors.aliyun.com/docker-ce+' /etc/yum.repos.d/docker-ce.repo

sudo yum makecache fast

sudo yum -y install docker-ce

systemctl start docker

systemctl enable docker
```



（2）setting image mirrors

```
vi /etc/docker/daemon.json

{

"registry-mirrors": ["http://hub-mirror.c.163.com"],

"insecure-registries": ["https://registry.mydomain.com","http://hub-mirror.c.163.com"]

}
```



**3.install the kind**

（1）Manually download the Kind binary

https://github.com/kubernetes-sigs/kind/releases

（2）Install kind binary

```
chmod +x ./kind

mv kind-linux-amd64 /usr/bin/kind
```



**4.Install the JDK and Maven**

（1）Refer to the general installation tutorial to install the following components

jdk 1.8

mavne 3.5+

**5.Install the NodeJS**

（1）version

node v14.19.3

（2）install the nvm

```
export http_proxy=http://10.0.0.150:7890

export https_proxy=http://10.0.0.150:7890

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```



（3）install the nodejs

```
nvm ls-remote

nvm install v14.19.3
```



（4）setting NPM

```
npm config set registry https://registry.npmmirror.com

npm config set sass_binary_site https://registry.npmmirror.com/binary.html?path=node-sass/
```



（5）Compiler front-end

```
npm install -g yarn

yarn

yarn build

yarn 
```



**6.Compile linkis**

```
# 1. When compiling for the first time, execute the following command first

./mvnw -N install

# 2. make the linkis distribution package

# - Option 1: make the linkis distribution package only

./mvnw clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true

# - Option 2: make the linkis distribution package and docker image

./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true

# - Option 3: linkis distribution package and docker image (included web)

./mvnw clean install -Pdocker -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dlinkis.build.web=true
```





**7.Create the cluster**

```
dos2unix ./linkis-dist/helm/scripts/*.sh

./linkis-dist/helm/scripts/create-test-kind.sh
```





**8.install the helm charts**

```
 ./scripts/install-charts.sh linkis linkis-demo
```





**9.Visit the Linkis page**

```
kubectl port-forward -n linkis  --address=0.0.0.0 service/linkis-demo-web 8087:8087

http://10.0.2.101:8087
```





**10.Test using the Linkis client**

```
kubectl -n linkis exec -it linkis-demo-ps-publicservice-77d7685d9-f59ht -- bash
./linkis-cli -engineType shell-1 -codeType shell -code "echo \"hello\" "  -submitUser hadoop -proxyUser hadoop
```



**11.install the kubectl**

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

kubectl config view  
kubectl config get-contexts  
kubectl cluster-info  
```

