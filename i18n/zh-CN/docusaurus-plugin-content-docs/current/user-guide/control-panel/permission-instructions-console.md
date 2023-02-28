---
title: 管理台用户权限说明
sidebar_position: 10
---

## 1.角色类型

- 管理员（Admin）：能够查看所有菜单入口，管理员角色权限最大，包含了历史管理员权限
- 历史管理员（historyAdmin)：除了自己提交的任务之外，还可以查看其他历史任务
- 普通用户：查看自己提交的任务信息

## 2.功能角色权限图表说明

不同角色在功能中拥有的权限

| 功能名称| 管理员（Admin） | 历史管理员（historyAdmin) | 普通用户 |
| -------- | -------- | ----- |----- |
| 管理员视图（全局历史） | √ | √  | |
| 搜索栏（资源管理） | √ |  | |
| 参数配置 | √ |  | |
| 全局变量 | √ | √ | √ |
| ECM管理 |  √ |  | |
| 微服务管理 | √ |  | |
| 数据源管理 | √ | √ | √ |
| 数据源环境管理 | √ |  | |
| 数据源类型 | √ |  | |
| UDF管理 | √  | √  | √  |
| 函数管理 | √  | √  | √  |
| 租户标签管理 | √  |   |   |
| 白名单管理 | √  |  |  |
| 代码检索（管理员视图） | √  |   |   |
| 代码检索（其他功能） | √  | √  | √  |

## 3.功能权限区分

### 3.1 全局历史
管理员视图仅历史管理员or管理员可查看

![](/Images-zh/control-panel/qhgly-img.png)

### 3.2 资源管理

搜索栏仅管理员可见

![](/Images-zh/control-panel/sslkj-img.png)

### 3.3 参数配置

仅管理员可以编辑应用

![](/Images-zh/control-panel/glybj-img.png)

### 3.4 全局变量

皆可编辑

![](/Images-zh/control-panel/jksy-img.png)

### 3.5 ECM管理（Admin）

只有管理员才有权限

![](/Images-zh/control-panel/ecmgl-img.png)

### 3.6 微服务管理（Admin）

只有管理员才有权限

![](/Images-zh/control-panel/wfwgl-img.png)

### 3.7 数据源管理

#### 3.7.1 数据源管理

都有权限

![](/Images-zh/control-panel/sou-img.png)

#### 3.7.2 数据源环境管理（Admin）

只有管理员才有权限

![](/Images-zh/control-panel/hj-img.png)


#### 3.7.3 数据源类型（Admin）

只有管理员才有权限

![](/Images-zh/control-panel/pzx-img.png)

### 3.8 UDF管理

#### 3.8.1 UDF管理

都有权限

![](/Images-zh/control-panel/udfgl-img.png)

#### 3.8.2 函数管理

都有权限

![](/Images-zh/control-panel/fun-img.png)

### 3.9 基础数据管理（Admin）

#### 3.9.1 租户标签管理

只有管理员才有权限

![](/Images-zh/control-panel/zhbj-img.png)

#### 3.9.2 白名单管理

只有管理员才有权限

![](/Images-zh/control-panel/bmdgl-img.png)

### 3.10 代码检索

其中管理员视图仅管理员可查看

![](/Images-zh/control-panel/dmjs-img.png)
