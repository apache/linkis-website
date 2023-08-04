---
title: [Installation and Deployment] Linkis1.3.0+DSS1.1.1 Ansible Single Machine One Click Installation Script
authors: [wubolive]
tags: [blog,linkis1.3.0,ansible]
---
### 一、Brief Introduction

To solve the tedious deployment process and simplify the installation steps, this script provides a one click installation of the latest version of DSS+Linkis environment; The software in the deployment package adopts my own compiled installation package and is the latest version: DSS1.1.1+Linkis1.3.0.

#### Version Introduction
The following version and configuration information can be found in the [all: vars] field of the installation program hosts file.

| Software Name    | Software version  | Application Path      | Test/Connect Command                      |
|------------------|-------------------|-----------------------|-------------------------------------------|
| MySQL            | mysql-5.6         | /usr/local/mysql      | mysql -h 127.0.0.1 -uroot -p123456        |
| JDK              | jdk1.8.0_171      | /usr/local/java       | java -version                             |
| Python           | python 2.7.5      | /usr/lib64/python2.7  | python -V                                 |
| Nginx            | nginx/1.20.1      | /etc/nginx            | nginx -t                                  |
| Hadoop           | hadoop-2.7.2      | /opt/hadoop           | hdfs dfs -ls /                            |
| Hive             | hive-2.3.3        | /opt/hive             | hive -e "show databases"                  |
| Spark            | spark-2.4.3       | /opt/spark            | spark-sql -e "show databases"             |
| dss              | dss-1.1.1         | /home/hadoop/dss      | http://<Server IP>:8085                   |
| links            | linkis-1.3.0      | /home/hadoop/linkis   | http://<Server IP>:8188                   |
| zookeeper        | 3.4.6             | /usr/local/zookeeper  | 无                                         |
| DolphinScheduler | 1.3.9             | /opt/dolphinscheduler | http://<Server IP>:12345/dolphinscheduler |
| Visualis         | 1.0.0             | /opt/visualis-server  | http://<Server IP>:9088                   |
| Qualitis         | 0.9.2             | /opt/qualitis         | http://<Server IP>:8090                   |
| Streamis         | 0.2.0             | /opt/streamis         | http://<Server IP>:9188                   |
| Sqoop            | 1.4.6             | /opt/sqoop            | sqoop                                     |
| Exchangis        | 1.0.0             | /opt/exchangis        | http://<Server IP>:8028                   |


### 二、Pre deployment considerations

Ask：
- This script has only been tested on CentOS 7 systems. Please ensure that the installed server is CentOS 7.
- Install only DSS+Linkis server memory of at least 16GB, and install all service memory of at least 32GB.
- Before installation, please close the server firewall and SELinux, and use root user for operation.
- The installation server must have smooth access to the internet, and the script requires downloading some basic software using yum.
- Ensure that the server does not have any software installed, including but not limited to Java, MySQL, nginx, etc., preferably a brand new system.
- It is necessary to ensure that the server has only one IP address, except for the lo: 127.0.1 loopback address, which can be tested using the echo $(hostname - I) command.


### 三、Deployment method

The deployment host IP for this case is 192.168.1.52. Please change the following steps according to your actual situation.

#### 3.1 Pre installation settings
```
### Install ansible
$ yum -y install epel-release
$ yum -y install ansible

### Configure password free
$ ssh-keygen -t rsa
$ ssh-copy-id root@192.168.1.52

### Configure password free shutdown firewall and SELinux
$ systemctl stop firewalld.service && systemctl disable firewalld.service
$ sed -i 's/^SELINUX=enforcing$/SELINUX=disabled/' /etc/selinux/config && setenforce 0
```

#### 3.2 Deploy linkis+dss
```
### Obtain installation package
$ git clone https://github.com/wubolive/dss-linkis-ansible.git
$ cd dss-linkis-ansible

### Catalog Description
dss-linkis-ansible
├── ansible.cfg    # ansible profile
├── hosts          # Host and variable configuration for hosts
├── playbooks      # Playbooks script
├── README.md      # documentation
└── roles          # Role Configuration

### Configure the deployment host (note: the value of ansible_ssh_host cannot be set to 127.0.0.1)
$ vim hosts
[deploy]
dss-service ansible_ssh_host=192.168.1.52 ansible_ssh_port=22

### Download the installation package to the download directory (if the download fails, you can manually download and place it in that directory)
$ ansible-playbook playbooks/download.yml

### One click installation of Linkis+DSS
$ ansible-playbook playbooks/all.yml
......
TASK [dss : Print access information] *****************************************************************************************
ok: [dss-service] => {
    "msg": [
        "*****************************************************************", 
        "              访问 http://192.168.1.52 View access information     ", 
        "*****************************************************************"
    ]
}
```
After execution, you can access: http://192.168.1.52 View the information page, which records the access addresses and account passwords of all services.
![](/static/Images/blog/view-information-page.png)

#### 3.3 Deploy other services
```
# Install dolphinscheduler
$ ansible-playbook playbooks/dolphinscheduler.yml
### Note: To install the following services, priority must be given to installing the Dolphinscheduler scheduling system
# Install visualis
$ ansible-playbook playbooks/visualis.yml 
# Install qualitis
$ ansible-playbook playbooks/qualitis.yml
# Install streamis
$ ansible-playbook playbooks/streamis.yml
# Install exchangis
$ ansible-playbook playbooks/exchangis.yml
```
#### 3.4 Maintenance Guidelines
```
### View real-time logs
$ su - hadoop
$ tail -f ~/linkis/logs/*.log ~/dss/logs/*.log

### Start the DSS+Linkis service (if the server restarts, you can use this command to start it)
$ ansible-playbook playbooks/all.yml -t restart
# Launch zookeeper
$ sh /usr/local/zookeeper/bin/zkServer.sh start
# Start other services
$ su - hadoop
$ cd /opt/dolphinscheduler/bin &&  sh start-all.sh 
$ cd /opt/visualis-server/bin && sh start-visualis-server.sh
$ cd /opt/qualitis/bin/ && sh start.sh
$ cd /opt/streamis/streamis-server/bin/ && sh start-streamis-server.sh
$ cd /opt/exchangis/sbin/ && ./daemon.sh start server
```

Please visit the official QA document for usage issues：https://docs.qq.com/doc/DSGZhdnpMV3lTUUxq