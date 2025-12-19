---
title: 轻量化部署
sidebar_position: 4
---

本文档提供 Apache Linkis 轻量化部署方案，使用 S3 对象存储（如 MinIO）替代 HDFS，实现无 Hadoop 依赖的快速部署。

## 一、前期准备

### 1.1 准备材料

| 序号 | 项目 | 说明 |
|-----|------|------|
| 1 | Linkis 安装包 | apache-linkis-x.x.x-bin.tar.gz |
| 2 | MySQL 驱动包 | mysql-connector-java-8.x.x.jar |
| 3 | 部署服务器 | Linux 服务器，建议 CentOS 7/8 或 Ubuntu 18.04+ |
| 4 | MySQL 数据库 | MySQL 5.7+ 或 8.0+ |
| 5 | S3 对象存储 | MinIO 或兼容 S3 协议的对象存储服务 |

### 1.2 S3 连接信息

准备好以下 S3/MinIO 连接信息：

```properties
# S3 访问凭证
access.key=<your-access-key>
secret.key=<your-secret-key>

# S3 服务地址
endpoint=http://<your-s3-endpoint>:<port>

# S3 区域和 Bucket
region=<your-region>
bucket=<your-bucket-name>
```

> **注意**：如果 bucket 不存在，需要提前在 MinIO/S3 中创建。

### 1.3 数据库连接信息

```properties
# MySQL 连接信息
MYSQL_HOST=<your-mysql-host>
MYSQL_PORT=3306
MYSQL_DB=<your-database-name>
MYSQL_USER=<your-mysql-user>
MYSQL_PASSWORD=<your-mysql-password>
```

---

## 二、环境要求

### 2.1 硬件要求

| 资源 | 最低配置 | 推荐配置 |
|------|----------|----------|
| CPU | 4 核 | 8 核+ |
| 内存 | 8 GB | 16 GB+ |
| 磁盘 | 50 GB | 100 GB+ |

### 2.2 软件要求

| 软件 | 版本要求 |
|------|----------|
| JDK | 1.8.0_141+ |
| MySQL | 5.7+ 或 8.0+ |
| MinIO | 任意稳定版本 |
| Linux | CentOS 7/8, Ubuntu 18.04+ |

### 2.3 端口规划

| 服务组件 | 默认端口 | 说明 |
|---------|---------|------|
| linkis-mg-gateway | 9001 | 网关服务 |
| linkis-ps-publicservice | 9105 | 公共服务 |
| linkis-cg-linkismanager | 9101 | 引擎管理 |
| linkis-cg-entrance | 9104 | 任务入口 |
| linkis-cg-engineconnmanager | 9102 | 引擎连接管理 |

---

## 三、部署步骤

### 3.1 创建部署用户

```bash
# 创建部署用户（以 hadoop 为例）
sudo useradd hadoop -m -s /bin/bash
sudo passwd hadoop

# 配置 sudo 免密（可选）
sudo visudo
# 添加以下内容：
hadoop ALL=(ALL) NOPASSWD: ALL
```

### 3.2 安装包准备

```bash
# 切换到部署用户
su - hadoop

# 创建安装目录
mkdir -p ~/linkis-install
cd ~/linkis-install

# 上传并解压安装包
tar -xzf apache-linkis-x.x.x-bin.tar.gz
cd apache-linkis-x.x.x-bin
```

解压后的目录结构：
```
apache-linkis-x.x.x-bin/
├── bin/                    # 可执行脚本
│   └── install.sh         # 安装脚本
├── deploy-config/          # 部署配置
│   ├── db.sh              # 数据库配置
│   └── linkis-env.sh      # 环境变量配置
├── linkis-package/         # Linkis 核心包
│   ├── lib/               # 依赖库
│   ├── conf/              # 配置文件模板
│   └── sbin/              # 系统管理脚本
└── ...
```

### 3.3 配置数据库

编辑 `deploy-config/db.sh`：

```bash
vim deploy-config/db.sh
```

配置 MySQL 连接信息：

```bash
# Linkis 元数据数据库配置
MYSQL_HOST=<your-mysql-host>
MYSQL_PORT=3306
MYSQL_DB=<your-database-name>
MYSQL_USER=<your-mysql-user>
MYSQL_PASSWORD=<your-mysql-password>

# 数据库驱动类（MySQL 8.0 使用 cj 驱动）
MYSQL_JDBC_DRIVER=com.mysql.cj.jdbc.Driver
```

### 3.4 配置环境变量（去除 HDFS 依赖）

编辑 `deploy-config/linkis-env.sh`：

```bash
vim deploy-config/linkis-env.sh
```

**关键配置**：

```bash
# 部署用户
deployUser=hadoop

# Linkis 安装目录（安装脚本执行后的目标目录）
LINKIS_HOME=<your-linkis-install-path>

# JDK 路径
JAVA_HOME=<your-java-home>

# 注释掉或删除 Hadoop/HDFS 相关配置
# hadoop.config.dir=xxx
# hive.config.dir=xxx
# spark.config.dir=xxx

# 使用本地文件系统（轻量化模式）
wds.linkis.filesystem.root.path=file:///tmp/linkis/
wds.linkis.filesystem.hdfs.root.path=file:///tmp/linkis
```

### 3.5 执行安装脚本

```bash
# 执行安装
sh bin/install.sh
```

安装过程中的选项：
- 是否需要初始化数据库表：**首次部署选择 2（重建表）**
- 选择 1 表示不执行建表语句

安装脚本会自动完成：
- 数据库表初始化
- 配置文件生成
- 服务目录创建
- 环境变量设置

### 3.6 添加 MySQL 驱动包

**重要**：需要将 MySQL 驱动包复制到以下位置：

```bash
# 设置环境变量（根据实际安装路径）
export LINKIS_HOME=<your-linkis-install-path>

# 复制 MySQL 驱动到各服务模块
cp mysql-connector-java-8.x.x.jar ${LINKIS_HOME}/lib/linkis-spring-cloud-services/linkis-mg-gateway/
cp mysql-connector-java-8.x.x.jar ${LINKIS_HOME}/lib/linkis-commons/public-module/
```

### 3.7 配置 S3 存储

#### 3.7.1 修改全局配置

编辑 `$LINKIS_HOME/conf/linkis.properties`：

```bash
vim $LINKIS_HOME/conf/linkis.properties
```

添加 S3 配置：

```properties
# S3 文件系统配置
linkis.storage.s3.access.key=<your-access-key>
linkis.storage.s3.secret.key=<your-secret-key>
linkis.storage.s3.endpoint=http://<your-s3-endpoint>:<port>
linkis.storage.s3.region=<your-region>
linkis.storage.s3.bucket=<your-bucket-name>

# BML 使用 S3 存储
linkis.bml.filesystem.type=s3

# 禁用文件系统权限检查（S3 模式必须禁用，否则无法读取结果）
wds.linkis.workspace.filesystem.owner.check=false
wds.linkis.workspace.filesystem.path.check=false
```

#### 3.7.2 修改 Entrance 配置（关键）

编辑 `$LINKIS_HOME/conf/linkis-cg-entrance.properties`：

```bash
vim $LINKIS_HOME/conf/linkis-cg-entrance.properties
```

**⚠️ 重要：S3 路径格式必须使用三斜杠（`s3:///`）**

```properties
# 日志存储路径（使用 S3）
wds.linkis.entrance.config.log.path=s3:///log/

# 结果集存储路径（使用 S3）
wds.linkis.resultSet.store.path=s3:///resultset/
```

> **路径格式说明**：
> - ✅ **正确格式**：`s3:///log/`（三个斜杠，bucket 从配置读取）
> - ❌ **错误格式**：`s3://bucket-name/log/`（会导致路径解析错误）
>
> **原因**：S3FileSystem 从 `linkis.storage.s3.bucket` 配置中读取 bucket 名称，路径中不应包含 bucket 信息。

### 3.8 启动服务

```bash
cd ${LINKIS_HOME}/sbin

# 启动所有 Linkis 服务
sh linkis-start-all.sh
```

等待所有服务启动完成（约 1-2 分钟）。

### 3.9 验证服务状态

```bash
# 检查服务进程
jps

# 应该看到以下 6 个服务进程：
# - LinkisManagerApplication      (linkis-cg-linkismanager)
# - LinkisEntranceApplication     (linkis-cg-entrance)
# - EngineConnManagerApplication  (linkis-cg-engineconnmanager)
# - LinkisMGGatewayApplication    (linkis-mg-gateway)
# - PublicServiceApplication      (linkis-ps-publicservice)
# - LinkisConsumerApplication     (linkis-mg-eureka)
```

查看服务日志：

```bash
# 查看 Entrance 服务日志
tail -f ${LINKIS_HOME}/logs/linkis-cg-entrance.log

# 查看 Gateway 服务日志
tail -f ${LINKIS_HOME}/logs/linkis-mg-gateway.log
```

---

## 四、验证测试

### 4.1 验证 Shell 引擎

#### 4.1.1 提交测试任务

```bash
cd ${LINKIS_HOME}

# 提交简单的 Shell 测试任务
sh bin/linkis-cli \
  -submitUser <your-user> \
  -proxyUser <your-user> \
  -engineType shell-1 \
  -codeType shell \
  -code "echo 'Test S3 storage'; date; hostname"
```

#### 4.1.2 预期输出

```
JobId: xxx
TaskId: xxx
ExecId: xxx
[INFO] Job is successfully submitted!

============Result:================
TaskId: xxx
ExecId: xxx
User: xxx
Current job status: SUCCEED

============ RESULT SET 1 ============
Test S3 storage
<current date>
<hostname>
############Execute Success!!!########
```

### 4.2 验证 S3 文件写入

#### 4.2.1 安装 AWS CLI（如果未安装）

```bash
# CentOS/RHEL
sudo yum install -y awscli

# Ubuntu/Debian
sudo apt-get install -y awscli
```

#### 4.2.2 配置 AWS CLI 连接 S3/MinIO

```bash
# 配置 S3 凭证
export AWS_ACCESS_KEY_ID=<your-access-key>
export AWS_SECRET_ACCESS_KEY=<your-secret-key>
```

#### 4.2.3 查看 S3 中的文件

```bash
# 列出 bucket（替换为你的 S3 endpoint）
aws --endpoint-url http://<your-s3-endpoint>:<port> s3 ls

# 查看 bucket 内容
aws --endpoint-url http://<your-s3-endpoint>:<port> s3 ls s3://<your-bucket-name>/

# 查看日志和结果文件
aws --endpoint-url http://<your-s3-endpoint>:<port> s3 ls s3://<your-bucket-name>/log/result/ --recursive
```

### 4.3 访问 Web 管理台

浏览器访问：`http://<your-server-ip>:8088`

使用安装时配置的账号密码登录。

---

## 五、常见问题

### 5.1 启动失败：找不到 MySQL 驱动

**问题现象**：
```
java.lang.ClassNotFoundException: com.mysql.cj.jdbc.Driver
```

**解决方案**：
确保 MySQL 驱动包已复制到所有指定位置（见 3.6 节），并检查文件权限。

### 5.2 上传 BML 失败：Status 401

**问题现象**：
```
Upload BML resource failed, status: 401 Unauthorized
```

**解决方案**：
检查 token 配置是否一致：

```bash
# 1. 检查配置文件中的 token
grep "wds.linkis.bml.auth.token.value" ${LINKIS_HOME}/conf/linkis.properties

# 2. 检查数据库中的 token
# 查询 linkis_mg_gateway_auth_token 表中 token_name='BML-AUTH' 的记录

# 3. 确保两者一致
```

### 5.3 S3 路径权限错误

**问题现象**：
```
WorkSpaceException: the path should contain schema
```

**解决方案 1**：使用正确的 S3 路径格式

```properties
# 错误格式
wds.linkis.entrance.config.log.path=s3://bucket-name/log/

# 正确格式（三个斜杠）
wds.linkis.entrance.config.log.path=s3:///log/
```

**解决方案 2**：禁用路径权限检查

在 `linkis.properties` 中添加：

```properties
wds.linkis.workspace.filesystem.owner.check=false
wds.linkis.workspace.filesystem.path.check=false
```

### 5.4 执行 Shell 任务没有结果输出

**问题现象**：
任务显示成功，但返回结果为空。

**解决方案**：

1. 检查 S3 路径配置格式（必须使用 `s3:///` 三斜杠）
2. 修改后重启 entrance 服务：
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-entrance
```
3. 验证 S3 连接是否正常

### 5.5 BML 文件系统类型错误

**问题现象**：
BML 上传文件时使用了 HDFS 或 file 文件系统，而不是 S3。

**解决方案**：
在 `linkis.properties` 中添加：

```properties
linkis.bml.filesystem.type=s3
```

### 5.6 服务启动后立即退出

**检查步骤**：

1. 查看日志文件：
```bash
tail -100 ${LINKIS_HOME}/logs/linkis-cg-entrance.log
tail -100 ${LINKIS_HOME}/logs/linkis-mg-gateway.log
```

2. 检查端口占用：
```bash
netstat -tunlp | grep -E "9001|9104|9105|9101|9102"
```

3. 检查 JDK 版本：
```bash
java -version
# 确保是 JDK 1.8.0_141 或更高版本
```

---

## 六、服务管理

### 6.1 服务启停命令

```bash
cd ${LINKIS_HOME}/sbin

# 启动所有服务
sh linkis-start-all.sh

# 停止所有服务
sh linkis-stop-all.sh

# 启动单个服务
sh linkis-daemon.sh start cg-entrance

# 停止单个服务
sh linkis-daemon.sh stop cg-entrance

# 重启单个服务
sh linkis-daemon.sh restart cg-entrance
```

### 6.2 日志查看

```bash
# 实时查看日志
tail -f ${LINKIS_HOME}/logs/linkis-cg-entrance.log

# 查看最近 100 行日志
tail -100 ${LINKIS_HOME}/logs/linkis-cg-entrance.log

# 搜索错误日志
grep -i error ${LINKIS_HOME}/logs/linkis-cg-entrance.log

# 查看所有服务日志
ls -lht ${LINKIS_HOME}/logs/*.log
```

---

## 七、配置参考

### 7.1 完整的 S3 配置示例

`linkis.properties`：
```properties
# ==================== S3 存储配置 ====================
# S3 访问凭证
linkis.storage.s3.access.key=<your-access-key>
linkis.storage.s3.secret.key=<your-secret-key>

# S3 服务端点
linkis.storage.s3.endpoint=http://<your-s3-endpoint>:<port>

# S3 区域
linkis.storage.s3.region=<your-region>

# S3 Bucket 名称
linkis.storage.s3.bucket=<your-bucket-name>

# BML 使用 S3 文件系统
linkis.bml.filesystem.type=s3

# ==================== 文件系统配置 ====================
# 根路径（轻量化模式使用本地文件系统）
wds.linkis.filesystem.root.path=file:///tmp/linkis/
wds.linkis.filesystem.hdfs.root.path=file:///tmp/linkis

# BML 不使用 HDFS
wds.linkis.bml.is.hdfs=false
wds.linkis.bml.local.prefix=file:///tmp/linkis

# ==================== 权限配置 ====================
# 禁用文件系统权限检查（S3 模式必须禁用）
wds.linkis.workspace.filesystem.owner.check=false
wds.linkis.workspace.filesystem.path.check=false
```

`linkis-cg-entrance.properties`：
```properties
# ==================== 日志和结果集存储路径 ====================
# 注意：必须使用 s3:/// 三斜杠格式
wds.linkis.entrance.config.log.path=s3:///log/
wds.linkis.resultSet.store.path=s3:///resultset/

# ==================== 引擎复用配置 ====================
# 禁用 executeOnce 以启用引擎复用（可选）
linkis.entrance.execute.once=false
```

---

## 八、架构说明

### 8.1 轻量化架构特点

- **无 Hadoop 依赖**：不需要部署 Hadoop/HDFS 集群
- **S3 对象存储**：使用 MinIO 或其他 S3 兼容存储
- **本地文件系统**：临时文件使用本地文件系统
- **单机部署**：所有服务部署在一台机器上
- **快速启动**：安装配置简单，启动速度快

### 8.2 目录结构

```
${LINKIS_HOME}/
├── bin/                    # 客户端工具
│   └── linkis-cli         # 命令行客户端
├── conf/                   # 配置文件
│   ├── linkis.properties                    # 全局配置
│   ├── linkis-cg-entrance.properties        # Entrance 配置
│   ├── linkis-cg-linkismanager.properties   # Manager 配置
│   └── ...
├── lib/                    # 依赖库
│   ├── linkis-commons/
│   ├── linkis-computation-governance/
│   ├── linkis-public-enhancements/
│   └── linkis-spring-cloud-services/
├── logs/                   # 日志文件
│   ├── linkis-cg-entrance.log
│   ├── linkis-mg-gateway.log
│   └── ...
└── sbin/                   # 服务管理脚本
    ├── linkis-start-all.sh
    ├── linkis-stop-all.sh
    └── linkis-daemon.sh
```

### 8.3 存储目录结构（S3）

```
s3://<your-bucket>/
├── log/                    # 日志根目录
│   ├── <user>/            # 用户日志
│   │   └── log/
│   │       └── <creator>/
│   │           └── <date>/
│   │               └── <jobId>.log
│   └── result/            # 结果集目录
│       └── <date>/        # 按日期分目录
│           └── <creator>/ # 按 Creator 分目录
│               └── <user>/ # 按用户分目录
│                   └── <taskId>/ # 按任务 ID 分目录
│                       └── x_x.dolphin # 结果文件
```

---

## 九、后续扩展

### 9.1 添加其他引擎

Linkis 支持多种计算引擎，可以根据需要添加：

- **Spark**：大数据处理
- **Hive**：数据仓库
- **Python**：数据分析
- **JDBC**：数据库查询

引擎安装方法参考官方文档：[引擎使用指南](../engine-usage/overview.md)

### 9.2 集成数据源管理

可以配置多种数据源：
- MySQL
- PostgreSQL
- TiDB
- ClickHouse
- Oracle

### 9.3 Web UI 使用

通过 Web UI 可以：
- 在线编写和执行脚本
- 查看任务执行历史
- 管理资源和引擎
- 配置数据源

---

## 十、参考资料

- [Linkis 官方文档](https://linkis.apache.org/zh-CN/docs/latest/introduction)
- [Linkis GitHub](https://github.com/apache/linkis)
- [MinIO 文档](https://min.io/docs/minio/linux/index.html)
- [AWS CLI S3 命令](https://docs.aws.amazon.com/cli/latest/reference/s3/)

---

## 附录

### A. 快速命令速查表

```bash
# 服务管理
cd ${LINKIS_HOME}/sbin
sh linkis-start-all.sh                    # 启动所有服务
sh linkis-stop-all.sh                     # 停止所有服务
sh linkis-daemon.sh restart cg-entrance   # 重启 entrance

# 任务提交
cd ${LINKIS_HOME}
sh bin/linkis-cli -engineType shell-1 -codeType shell \
  -code "your command" -submitUser <user> -proxyUser <user>

# 日志查看
tail -f ${LINKIS_HOME}/logs/linkis-cg-entrance.log
grep -i error ${LINKIS_HOME}/logs/*.log

# 服务检查
jps                                 # 查看 Java 进程
netstat -tunlp | grep 9001         # 检查端口
```

### B. 关键配置项说明

| 配置项 | 配置文件 | 说明 |
|-------|---------|------|
| linkis.storage.s3.endpoint | linkis.properties | S3 服务地址 |
| linkis.storage.s3.bucket | linkis.properties | S3 Bucket 名称 |
| wds.linkis.entrance.config.log.path | linkis-cg-entrance.properties | 日志存储路径 |
| wds.linkis.resultSet.store.path | linkis-cg-entrance.properties | 结果集存储路径 |
| linkis.bml.filesystem.type | linkis.properties | BML 文件系统类型 |
