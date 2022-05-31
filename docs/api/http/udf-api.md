---
title: UDF接口
sidebar_position: 0.1
--- 

## UDF移交

### 基本信息

**Path：** /api/rest_j/v1/udf/handover

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead>
  <tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> handoverUser</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>被移交用户</span></td><td key="5"></td></tr>
  </tbody>
</table>

## UDF修改

### 基本信息

**Path：** /api/rest_j/v1/udf/update

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfUpdateVo</span></td><td key="1"><span>object</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> id</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>不能修改</span></td><td key="5"></td></tr><tr key="0-0-2"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>不能修改</span></td><td key="5"></td></tr><tr key="0-0-3"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> description</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-4"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> path</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>jar类型udf采用文件路径方式上传</span></td><td key="5"></td></tr><tr key="0-0-5"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> useFormat</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-6"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> registerFormat</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>
       
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
   </tbody>
</table>

## UDF共享用户列表
### 基本信息

**Path：** /api/rest_j/v1/udf/getSharedUsers

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>
       
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> sharedUsers</span></td><td key="1"><span>string []</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item 类型: </span><span>string</span></p></td></tr><tr key="array-13"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> </span></td><td key="1"><span></span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

## UDF删除
### 基本信息

**Path：** /api/rest_j/v1/udf/delete/{id}

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**

| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ |
| id |  100 |  udf id |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

## UDF新增

### 基本信息

**Path：** /api/rest_j/v1/udf/add

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfAddVo</span></td><td key="1"><span>object</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-2"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> description</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-3"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> path</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>jar类型udf采用文件路径方式上传</span></td><td key="5"></td></tr><tr key="0-0-4"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> shared</span></td><td key="1"><span>boolean</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>不用传</span></td><td key="5"></td></tr><tr key="0-0-5"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> useFormat</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-6"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> expire</span></td><td key="1"><span>boolean</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>不用传</span></td><td key="5"></td></tr><tr key="0-0-7"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> load</span></td><td key="1"><span>boolean</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-8"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> registerFormat</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-9"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> treeId</span></td><td key="1"><span>number</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>不用传</span></td><td key="5"></td></tr><tr key="0-0-10"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> sys</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>系统：暂时均为：“IDE”</span></td><td key="5"></td></tr><tr key="0-0-11"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> clusterName</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>集群，暂时均为“all”</span></td><td key="5"></td></tr><tr key="0-0-12"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> directory</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>个人函数的一级分类目录</span></td><td key="5"></td></tr>
               </tbody>
              </table>

         
### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

## UDF查看源码

### 基本信息

**Path：** /api/rest_j/v1/udf/downloadUdf

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> version</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
</table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> method</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> status</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-2"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> message</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-3"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> data</span></td><td key="1"><span>object</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-3-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> content</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>udf内容</span></td><td key="5"></td></tr>
       </tbody>
</table>

## UDF版本发布

### 基本信息

**Path：** /api/rest_j/v1/udf/publish

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> version</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>发布的版本：v000005</span></td><td key="5"></td></tr>
               </tbody>
              </table>

## UDF共享

### 基本信息

**Path：** /api/rest_j/v1/udf/shareUDF

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfInfo</span></td><td key="1"><span>object</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> id</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-2"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> sharedUsers</span></td><td key="1"><span>string []</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>被共享用户列表</span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item 类型: </span><span>string</span></p></td></tr><tr key="array-14"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> </span></td><td key="1"><span></span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

## UDF管理页面
>注：只能看到用户自己创建的udf

### 基本信息

**Path：** /api/rest_j/v1/udf/managerPages

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfName</span></td><td key="1"><span>string</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfType</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>逗号分割的字符串，如：0,1,2</span></td><td key="5"></td></tr><tr key="0-2"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> createUser</span></td><td key="1"><span>string</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-3"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> curPage</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>第几页</span></td><td key="5"></td></tr><tr key="0-4"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> pageSize</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>记录个数</span></td><td key="5"></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> infoList</span></td><td key="1"><span>object []</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item 类型: </span><span>object</span></p></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> id</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> createUser</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>udf创建者</span></td><td key="5"></td></tr><tr key="0-0-2"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-3"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-4"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> expire</span></td><td key="1"><span>boolean</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>udf是否过期</span></td><td key="5"></td></tr><tr key="0-0-5"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> shared</span></td><td key="1"><span>boolean</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>是否为共享udf</span></td><td key="5"></td></tr><tr key="0-0-6"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> treeId</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-7"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> sys</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>系统，例如：dss</span></td><td key="5"></td></tr><tr key="0-0-8"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> clusterName</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>集群，暂时为all</span></td><td key="5"></td></tr><tr key="0-0-9"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> createTime</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-10"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> updateTime</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-11"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> path</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>用户上一次上传的路径，作展示用</span></td><td key="5"></td></tr><tr key="0-0-12"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> registerFormat</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-13"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> useFormat</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-14"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> description</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-15"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> operationStatus</span></td><td key="1"><span>object</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>分类</span></td><td key="5"></td></tr><tr key="0-0-15-0"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canUpdate</span></td><td key="1"><span>boolean</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>可否编辑</span></td><td key="5"></td></tr><tr key="0-0-15-1"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canShare</span></td><td key="1"><span>boolean</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>可否共享</span></td><td key="5"></td></tr><tr key="0-0-15-2"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canPublish</span></td><td key="1"><span>boolean</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>可否发布</span></td><td key="5"></td></tr><tr key="0-0-15-3"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canDelete</span></td><td key="1"><span>boolean</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>可否删除</span></td><td key="5"></td></tr><tr key="0-0-15-4"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canExpire</span></td><td key="1"><span>boolean</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>可否过期</span></td><td key="5"></td></tr><tr key="0-0-15-5"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canHandover</span></td><td key="1"><span>boolean</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>可否移交</span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> totalPage</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>总页数</span></td><td key="5"></td></tr><tr key="0-2"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> field_1</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-3"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> total</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>总条数</span></td><td key="5"></td></tr>
               </tbody>
              </table>

## UDF过期

### 基本信息

**Path：** /api/rest_j/v1/udf/setExpire

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

## udf文件下载到本地

### 基本信息

**Path：** /api/rest_j/v1/udf/downloadToLocal

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> version</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

## 版本列表查看

### 基本信息

**Path：** /api/rest_j/v1/udf/versionList

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| udfId | 是  |  100 |   |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> versionList</span></td><td key="1"><span>object []</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item 类型: </span><span>object</span></p></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> id</span></td><td key="1"><span>number</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfId</span></td><td key="1"><span>number</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-2"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> path</span></td><td key="1"><span>string</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-3"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> bmlResourceId</span></td><td key="1"><span>string</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-4"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> bmlResourceVersion</span></td><td key="1"><span>string</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-5"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> isPublished</span></td><td key="1"><span>boolean</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-6"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> registerFormat</span></td><td key="1"><span>string</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-7"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> useFormat</span></td><td key="1"><span>string</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-8"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> description</span></td><td key="1"><span>string</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-9"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> createTime</span></td><td key="1"><span>number</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-10"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> expire</span></td><td key="1"><span>boolean</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-11"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> createUser</span></td><td key="1"><span>string</span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

## 版本回退

### 基本信息

**Path：** /api/rest_j/v1/udf/rollback

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> version</span></td><td key="1"><span>string</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>回退版本</span></td><td key="5"></td></tr>
               </tbody>
              </table>

## 获取udf用户列表

### 基本信息

**Path：** /api/rest_j/v1/udf/allUdfUsers

**Method：** GET

**接口描述：**


### 请求参数

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfUsers</span></td><td key="1"><span>string []</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item 类型: </span><span>string</span></p></td></tr><tr key="array-15"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> </span></td><td key="1"><span></span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

## 获取用户个人函数的一级分类

### 基本信息

**Path：** /api/rest_j/v1/udf/userDirectory

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| category | 是  |  udf |  必须是"udf"或"function"，分别代表获取udf函数的一级分类和方法函数的一级分类 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">名称</th><th key="type">类型</th><th key="required">是否必须</th><th key="default">默认值</th><th key="desc">备注</th><th key="sub">其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> userDirectory</span></td><td key="1"><span>string []</span></td><td key="2">必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>分类名组成的列表</span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item 类型: </span><span>string</span></p></td></tr><tr key="array-16"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> </span></td><td key="1"><span></span></td><td key="2">非必须</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody> </table>
            