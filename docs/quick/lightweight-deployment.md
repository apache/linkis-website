---
title: Lightweight Deployment
sidebar_position: 4
---

This document provides a lightweight deployment guide for Apache Linkis, using S3 object storage (e.g., MinIO) instead of HDFS to achieve rapid deployment without Hadoop dependencies.

## 1. Prerequisites

### 1.1 Required Materials

| No. | Item | Description |
|-----|------|-------------|
| 1 | Linkis Package | apache-linkis-x.x.x-bin.tar.gz |
| 2 | MySQL Driver | mysql-connector-java-8.x.x.jar |
| 3 | Server | Linux server, CentOS 7/8 or Ubuntu 18.04+ recommended |
| 4 | MySQL Database | MySQL 5.7+ or 8.0+ |
| 5 | S3 Storage | MinIO or S3-compatible object storage service |

### 1.2 S3 Connection Information

Prepare the following S3/MinIO connection information:

```properties
# S3 access credentials
access.key=<your-access-key>
secret.key=<your-secret-key>

# S3 service address
endpoint=http://<your-s3-endpoint>:<port>

# S3 region and bucket
region=<your-region>
bucket=<your-bucket-name>
```

> **Note**: If the bucket does not exist, create it in MinIO/S3 beforehand.

### 1.3 Database Connection Information

```properties
# MySQL connection info
MYSQL_HOST=<your-mysql-host>
MYSQL_PORT=3306
MYSQL_DB=<your-database-name>
MYSQL_USER=<your-mysql-user>
MYSQL_PASSWORD=<your-mysql-password>
```

---

## 2. Environment Requirements

### 2.1 Hardware Requirements

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU | 4 cores | 8+ cores |
| Memory | 8 GB | 16+ GB |
| Disk | 50 GB | 100+ GB |

### 2.2 Software Requirements

| Software | Version |
|----------|---------|
| JDK | 1.8.0_141+ |
| MySQL | 5.7+ or 8.0+ |
| MinIO | Any stable version |
| Linux | CentOS 7/8, Ubuntu 18.04+ |

### 2.3 Port Planning

| Service Component | Default Port | Description |
|-------------------|--------------|-------------|
| linkis-mg-gateway | 9001 | Gateway service |
| linkis-ps-publicservice | 9105 | Public service |
| linkis-cg-linkismanager | 9101 | Engine manager |
| linkis-cg-entrance | 9104 | Task entrance |
| linkis-cg-engineconnmanager | 9102 | Engine connection manager |

---

## 3. Deployment Steps

### 3.1 Create Deployment User

```bash
# Create deployment user (using hadoop as example)
sudo useradd hadoop -m -s /bin/bash
sudo passwd hadoop

# Configure sudo without password (optional)
sudo visudo
# Add the following:
hadoop ALL=(ALL) NOPASSWD: ALL
```

### 3.2 Prepare Installation Package

```bash
# Switch to deployment user
su - hadoop

# Create installation directory
mkdir -p ~/linkis-install
cd ~/linkis-install

# Upload and extract package
tar -xzf apache-linkis-x.x.x-bin.tar.gz
cd apache-linkis-x.x.x-bin
```

Directory structure after extraction:
```
apache-linkis-x.x.x-bin/
├── bin/                    # Executable scripts
│   └── install.sh         # Installation script
├── deploy-config/          # Deployment configuration
│   ├── db.sh              # Database configuration
│   └── linkis-env.sh      # Environment variables
├── linkis-package/         # Linkis core package
│   ├── lib/               # Dependencies
│   ├── conf/              # Configuration templates
│   └── sbin/              # System management scripts
└── ...
```

### 3.3 Configure Database

Edit `deploy-config/db.sh`:

```bash
vim deploy-config/db.sh
```

Configure MySQL connection:

```bash
# Linkis metadata database configuration
MYSQL_HOST=<your-mysql-host>
MYSQL_PORT=3306
MYSQL_DB=<your-database-name>
MYSQL_USER=<your-mysql-user>
MYSQL_PASSWORD=<your-mysql-password>

# Database driver class (MySQL 8.0 uses cj driver)
MYSQL_JDBC_DRIVER=com.mysql.cj.jdbc.Driver
```

### 3.4 Configure Environment Variables (Remove HDFS Dependency)

Edit `deploy-config/linkis-env.sh`:

```bash
vim deploy-config/linkis-env.sh
```

**Key configuration**:

```bash
# Deployment user
deployUser=hadoop

# Linkis installation directory (target directory after installation script execution)
LINKIS_HOME=<your-linkis-install-path>

# JDK path
JAVA_HOME=<your-java-home>

# Comment out or remove Hadoop/HDFS related configuration
# hadoop.config.dir=xxx
# hive.config.dir=xxx
# spark.config.dir=xxx

# Use local filesystem (lightweight mode)
wds.linkis.filesystem.root.path=file:///tmp/linkis/
wds.linkis.filesystem.hdfs.root.path=file:///tmp/linkis
```

### 3.5 Execute Installation Script

```bash
# Execute installation
sh bin/install.sh
```

Installation options:
- Initialize database tables: **Select 2 (rebuild tables) for first deployment**
- Select 1 to skip table creation

The installation script will automatically:
- Initialize database tables
- Generate configuration files
- Create service directories
- Set environment variables

### 3.6 Add MySQL Driver

**Important**: Copy the MySQL driver to the following locations:

```bash
# Set environment variable (according to actual installation path)
export LINKIS_HOME=<your-linkis-install-path>

# Copy MySQL driver to service modules
cp mysql-connector-java-8.x.x.jar ${LINKIS_HOME}/lib/linkis-spring-cloud-services/linkis-mg-gateway/
cp mysql-connector-java-8.x.x.jar ${LINKIS_HOME}/lib/linkis-commons/public-module/
```

### 3.7 Configure S3 Storage

#### 3.7.1 Modify Global Configuration

Edit `$LINKIS_HOME/conf/linkis.properties`:

```bash
vim $LINKIS_HOME/conf/linkis.properties
```

Add S3 configuration:

```properties
# S3 filesystem configuration
linkis.storage.s3.access.key=<your-access-key>
linkis.storage.s3.secret.key=<your-secret-key>
linkis.storage.s3.endpoint=http://<your-s3-endpoint>:<port>
linkis.storage.s3.region=<your-region>
linkis.storage.s3.bucket=<your-bucket-name>

# BML uses S3 storage
linkis.bml.filesystem.type=s3

# Disable filesystem permission check (required for S3 mode)
wds.linkis.workspace.filesystem.owner.check=false
wds.linkis.workspace.filesystem.path.check=false
```

#### 3.7.2 Modify Entrance Configuration (Critical)

Edit `$LINKIS_HOME/conf/linkis-cg-entrance.properties`:

```bash
vim $LINKIS_HOME/conf/linkis-cg-entrance.properties
```

**⚠️ Important: S3 path format must use triple slashes (`s3:///`)**

```properties
# Log storage path (using S3)
wds.linkis.entrance.config.log.path=s3:///log/

# Result set storage path (using S3)
wds.linkis.resultSet.store.path=s3:///resultset/
```

> **Path format explanation**:
> - ✅ **Correct format**: `s3:///log/` (three slashes, bucket read from config)
> - ❌ **Wrong format**: `s3://bucket-name/log/` (causes path parsing errors)
>
> **Reason**: S3FileSystem reads the bucket name from `linkis.storage.s3.bucket` configuration. The path should not contain bucket information.

### 3.8 Start Services

```bash
cd ${LINKIS_HOME}/sbin

# Start all Linkis services
sh linkis-start-all.sh
```

Wait for all services to start (about 1-2 minutes).

### 3.9 Verify Service Status

```bash
# Check service processes
jps

# You should see these 6 service processes:
# - LinkisManagerApplication      (linkis-cg-linkismanager)
# - LinkisEntranceApplication     (linkis-cg-entrance)
# - EngineConnManagerApplication  (linkis-cg-engineconnmanager)
# - LinkisMGGatewayApplication    (linkis-mg-gateway)
# - PublicServiceApplication      (linkis-ps-publicservice)
# - LinkisConsumerApplication     (linkis-mg-eureka)
```

View service logs:

```bash
# View Entrance service log
tail -f ${LINKIS_HOME}/logs/linkis-cg-entrance.log

# View Gateway service log
tail -f ${LINKIS_HOME}/logs/linkis-mg-gateway.log
```

---

## 4. Verification Testing

### 4.1 Verify Shell Engine

#### 4.1.1 Submit Test Job

```bash
cd ${LINKIS_HOME}

# Submit a simple Shell test job
sh bin/linkis-cli \
  -submitUser <your-user> \
  -proxyUser <your-user> \
  -engineType shell-1 \
  -codeType shell \
  -code "echo 'Test S3 storage'; date; hostname"
```

#### 4.1.2 Expected Output

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

### 4.2 Verify S3 File Writing

#### 4.2.1 Install AWS CLI (if not installed)

```bash
# CentOS/RHEL
sudo yum install -y awscli

# Ubuntu/Debian
sudo apt-get install -y awscli
```

#### 4.2.2 Configure AWS CLI for S3/MinIO

```bash
# Configure S3 credentials
export AWS_ACCESS_KEY_ID=<your-access-key>
export AWS_SECRET_ACCESS_KEY=<your-secret-key>
```

#### 4.2.3 View Files in S3

```bash
# List buckets (replace with your S3 endpoint)
aws --endpoint-url http://<your-s3-endpoint>:<port> s3 ls

# View bucket contents
aws --endpoint-url http://<your-s3-endpoint>:<port> s3 ls s3://<your-bucket-name>/

# View log and result files
aws --endpoint-url http://<your-s3-endpoint>:<port> s3 ls s3://<your-bucket-name>/log/result/ --recursive
```

### 4.3 Access Web Console

Browser access: `http://<your-server-ip>:8088`

Log in with the credentials configured during installation.

---

## 5. Troubleshooting

### 5.1 Startup Failure: MySQL Driver Not Found

**Symptom**:
```
java.lang.ClassNotFoundException: com.mysql.cj.jdbc.Driver
```

**Solution**:
Ensure MySQL driver is copied to all specified locations (see section 3.6), and check file permissions.

### 5.2 BML Upload Failed: Status 401

**Symptom**:
```
Upload BML resource failed, status: 401 Unauthorized
```

**Solution**:
Check if token configuration is consistent:

```bash
# 1. Check token in config file
grep "wds.linkis.bml.auth.token.value" ${LINKIS_HOME}/conf/linkis.properties

# 2. Check token in database
# Query linkis_mg_gateway_auth_token table for token_name='BML-AUTH'

# 3. Ensure both are consistent
```

### 5.3 S3 Path Permission Error

**Symptom**:
```
WorkSpaceException: the path should contain schema
```

**Solution 1**: Use correct S3 path format

```properties
# Wrong format
wds.linkis.entrance.config.log.path=s3://bucket-name/log/

# Correct format (three slashes)
wds.linkis.entrance.config.log.path=s3:///log/
```

**Solution 2**: Disable path permission check

Add to `linkis.properties`:

```properties
wds.linkis.workspace.filesystem.owner.check=false
wds.linkis.workspace.filesystem.path.check=false
```

### 5.4 Shell Job Returns Empty Result

**Symptom**:
Job shows success but returns empty result.

**Solution**:

1. Check S3 path configuration format (must use `s3:///` triple slashes)
2. Restart entrance service after modification:
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-entrance
```
3. Verify S3 connection is working properly

### 5.5 BML Filesystem Type Error

**Symptom**:
BML uploads files using HDFS or local filesystem instead of S3.

**Solution**:
Add to `linkis.properties`:

```properties
linkis.bml.filesystem.type=s3
```

### 5.6 Service Exits Immediately After Start

**Troubleshooting steps**:

1. Check log files:
```bash
tail -100 ${LINKIS_HOME}/logs/linkis-cg-entrance.log
tail -100 ${LINKIS_HOME}/logs/linkis-mg-gateway.log
```

2. Check port usage:
```bash
netstat -tunlp | grep -E "9001|9104|9105|9101|9102"
```

3. Check JDK version:
```bash
java -version
# Ensure JDK 1.8.0_141 or higher
```

---

## 6. Service Management

### 6.1 Service Start/Stop Commands

```bash
cd ${LINKIS_HOME}/sbin

# Start all services
sh linkis-start-all.sh

# Stop all services
sh linkis-stop-all.sh

# Start single service
sh linkis-daemon.sh start cg-entrance

# Stop single service
sh linkis-daemon.sh stop cg-entrance

# Restart single service
sh linkis-daemon.sh restart cg-entrance
```

### 6.2 Log Viewing

```bash
# Real-time log viewing
tail -f ${LINKIS_HOME}/logs/linkis-cg-entrance.log

# View last 100 lines
tail -100 ${LINKIS_HOME}/logs/linkis-cg-entrance.log

# Search for error logs
grep -i error ${LINKIS_HOME}/logs/linkis-cg-entrance.log

# List all service logs
ls -lht ${LINKIS_HOME}/logs/*.log
```

---

## 7. Configuration Reference

### 7.1 Complete S3 Configuration Example

`linkis.properties`:
```properties
# ==================== S3 Storage Configuration ====================
# S3 access credentials
linkis.storage.s3.access.key=<your-access-key>
linkis.storage.s3.secret.key=<your-secret-key>

# S3 service endpoint
linkis.storage.s3.endpoint=http://<your-s3-endpoint>:<port>

# S3 region
linkis.storage.s3.region=<your-region>

# S3 Bucket name
linkis.storage.s3.bucket=<your-bucket-name>

# BML uses S3 filesystem
linkis.bml.filesystem.type=s3

# ==================== Filesystem Configuration ====================
# Root path (lightweight mode uses local filesystem)
wds.linkis.filesystem.root.path=file:///tmp/linkis/
wds.linkis.filesystem.hdfs.root.path=file:///tmp/linkis

# BML does not use HDFS
wds.linkis.bml.is.hdfs=false
wds.linkis.bml.local.prefix=file:///tmp/linkis

# ==================== Permission Configuration ====================
# Disable filesystem permission check (required for S3 mode)
wds.linkis.workspace.filesystem.owner.check=false
wds.linkis.workspace.filesystem.path.check=false
```

`linkis-cg-entrance.properties`:
```properties
# ==================== Log and Result Set Storage Paths ====================
# Note: Must use s3:/// triple slash format
wds.linkis.entrance.config.log.path=s3:///log/
wds.linkis.resultSet.store.path=s3:///resultset/

# ==================== Engine Reuse Configuration ====================
# Disable executeOnce to enable engine reuse (optional)
linkis.entrance.execute.once=false
```

---

## 8. Architecture Overview

### 8.1 Lightweight Architecture Features

- **No Hadoop Dependency**: No need to deploy Hadoop/HDFS cluster
- **S3 Object Storage**: Uses MinIO or other S3-compatible storage
- **Local Filesystem**: Temporary files use local filesystem
- **Single-node Deployment**: All services deployed on one machine
- **Quick Start**: Simple installation and configuration, fast startup

### 8.2 Directory Structure

```
${LINKIS_HOME}/
├── bin/                    # Client tools
│   └── linkis-cli         # Command line client
├── conf/                   # Configuration files
│   ├── linkis.properties                    # Global configuration
│   ├── linkis-cg-entrance.properties        # Entrance configuration
│   ├── linkis-cg-linkismanager.properties   # Manager configuration
│   └── ...
├── lib/                    # Dependencies
│   ├── linkis-commons/
│   ├── linkis-computation-governance/
│   ├── linkis-public-enhancements/
│   └── linkis-spring-cloud-services/
├── logs/                   # Log files
│   ├── linkis-cg-entrance.log
│   ├── linkis-mg-gateway.log
│   └── ...
└── sbin/                   # Service management scripts
    ├── linkis-start-all.sh
    ├── linkis-stop-all.sh
    └── linkis-daemon.sh
```

### 8.3 Storage Directory Structure (S3)

```
s3://<your-bucket>/
├── log/                    # Log root directory
│   ├── <user>/            # User logs
│   │   └── log/
│   │       └── <creator>/
│   │           └── <date>/
│   │               └── <jobId>.log
│   └── result/            # Result set directory
│       └── <date>/        # Organized by date
│           └── <creator>/ # Organized by creator
│               └── <user>/ # Organized by user
│                   └── <taskId>/ # Organized by task ID
│                       └── x_x.dolphin # Result file
```

---

## 9. Further Extensions

### 9.1 Adding Other Engines

Linkis supports various compute engines, which can be added as needed:

- **Spark**: Big data processing
- **Hive**: Data warehouse
- **Python**: Data analysis
- **JDBC**: Database queries

For engine installation, refer to the official documentation: [Engine Usage Guide](../engine-usage/overview.md)

### 9.2 Data Source Integration

Multiple data sources can be configured:
- MySQL
- PostgreSQL
- TiDB
- ClickHouse
- Oracle

### 9.3 Web UI Usage

Through the Web UI you can:
- Write and execute scripts online
- View task execution history
- Manage resources and engines
- Configure data sources

---

## 10. References

- [Linkis Official Documentation](https://linkis.apache.org/docs/latest/introduction)
- [Linkis GitHub](https://github.com/apache/linkis)
- [MinIO Documentation](https://min.io/docs/minio/linux/index.html)
- [AWS CLI S3 Commands](https://docs.aws.amazon.com/cli/latest/reference/s3/)

---

## Appendix

### A. Quick Command Reference

```bash
# Service management
cd ${LINKIS_HOME}/sbin
sh linkis-start-all.sh                    # Start all services
sh linkis-stop-all.sh                     # Stop all services
sh linkis-daemon.sh restart cg-entrance   # Restart entrance

# Job submission
cd ${LINKIS_HOME}
sh bin/linkis-cli -engineType shell-1 -codeType shell \
  -code "your command" -submitUser <user> -proxyUser <user>

# Log viewing
tail -f ${LINKIS_HOME}/logs/linkis-cg-entrance.log
grep -i error ${LINKIS_HOME}/logs/*.log

# Service check
jps                                 # View Java processes
netstat -tunlp | grep 9001         # Check ports
```

### B. Key Configuration Items

| Configuration | Config File | Description |
|---------------|-------------|-------------|
| linkis.storage.s3.endpoint | linkis.properties | S3 service address |
| linkis.storage.s3.bucket | linkis.properties | S3 Bucket name |
| wds.linkis.entrance.config.log.path | linkis-cg-entrance.properties | Log storage path |
| wds.linkis.resultSet.store.path | linkis-cg-entrance.properties | Result set storage path |
| linkis.bml.filesystem.type | linkis.properties | BML filesystem type |
