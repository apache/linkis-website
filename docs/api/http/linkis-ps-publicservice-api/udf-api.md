---
title: UDF interface
sidebar_position: 0.1
---

## UDF handover

### Basic Information

**Path:** /api/rest_j/v1/udf/handover

**Method:** POST

**Interface description:**


### request parameters
**Headers**

| Parameter name | Parameter value | Required | Example | Remarks |
| ------------ | ------------ | ------------ | ------------ -- | ------------ |
| Content-Type | application/json | yes | | |

**Body**


<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead>
  <tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> handoverUser</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>handed over user</span></td><td key="5"></td></tr>
  </tbody>
</table>

## UDF modification

### Basic Information

**Path：** /api/rest_j/v1/udf/update

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name | parameter value | Is it necessary | example | Remark |
| ------------ | ------------ | ------------ | ------------ -- | ------------ |
| Content-Type | application/json | yes | | |

**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfUpdateVo</span></td><td key="1"><span>object</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> id</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Cannot modify</span></td><td key="5"></td></tr><tr key="0-0-2"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Cannot modify</span></td><td key="5"></td></tr><tr key="0-0-3"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> description</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-4"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> path</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>jartypeudf uploads by file path</span></td><td key="5"></td></tr><tr key="0-0-5"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> useFormat</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-6"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> registerFormat</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>
       
### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
   </tbody>
</table>

## UDF shared user list
### Basic Information

**Path：** /api/rest_j/v1/udf/getSharedUsers

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name  | parameter value  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | true  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>
       
### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> sharedUsers</span></td><td key="1"><span>string []</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item type: </span><span>string</span></p></td></tr><tr key="array-13"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> </span></td><td key="1"><span></span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

##UDF removal
### Basic Information
**Path：** /api/rest_j/v1/udf/delete/{id}

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name  | parameter value  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | true  |   |   |
**path parameter**

| parameter name | Example  | Remark  |
| ------------ | ------------ | ------------ |
| id |  100 |  udf id |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

## UDF new

### Basic Information

**Path：** /api/rest_j/v1/udf/add

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name  | parameter value  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | true  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfAddVo</span></td><td key="1"><span>object</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-2"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> description</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-3"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> path</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>jartypeudf uploads by file path</span></td><td key="5"></td></tr><tr key="0-0-4"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> shared</span></td><td key="1"><span>boolean</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>do not pass</span></td><td key="5"></td></tr><tr key="0-0-5"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> useFormat</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-6"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> expire</span></td><td key="1"><span>boolean</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>do not pass</span></td><td key="5"></td></tr><tr key="0-0-7"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> load</span></td><td key="1"><span>boolean</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-8"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> registerFormat</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-9"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> treeId</span></td><td key="1"><span>number</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>do not pass</span></td><td key="5"></td></tr><tr key="0-0-10"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> sys</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>System: temporarily both: "IDE"</span></td><td key="5"></td></tr><tr key="0-0-11"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> clusterName</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Cluster, temporarily "all"</span></td><td key="5"></td></tr><tr key="0-0-12"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> directory</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Primary Category of Personal Functions</span></td><td key="5"></td></tr>
               </tbody>
              </table>

         
### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

## UDF View source code

### Basic Information

**Path：** /api/rest_j/v1/udf/downloadUdf

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name  | parameter value  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | true  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> version</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
</table>

### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> method</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> status</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-2"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> message</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-3"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> data</span></td><td key="1"><span>object</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-3-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> content</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>udf content</span></td><td key="5"></td></tr>
       </tbody>
</table>
## UDF version release

### Basic Information

**Path：** /api/rest_j/v1/udf/publish

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name  | parameter value  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | true  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> version</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Released version：v000005</span></td><td key="5"></td></tr>
               </tbody>
              </table>

## UDF sharing

### Basic Information

**Path：** /api/rest_j/v1/udf/shareUDF

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name  | parameter value  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | true  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfInfo</span></td><td key="1"><span>object</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> id</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-2"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> sharedUsers</span></td><td key="1"><span>string []</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Shared user list</span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item type: </span><span>string</span></p></td></tr><tr key="array-14"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> </span></td><td key="1"><span></span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

## UDF management page
> Note: Only udfs created by the user themselves can be seen

### Basic Information

**Path：** /api/rest_j/v1/udf/managerPages

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name  | parameter value  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | true  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfName</span></td><td key="1"><span>string</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfType</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>A comma-separated string, such as: 0,1,2</span></td><td key="5"></td></tr><tr key="0-2"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> createUser</span></td><td key="1"><span>string</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-3"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> curPage</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>which page</span></td><td key="5"></td></tr><tr key="0-4"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> pageSize</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>number of records</span></td><td key="5"></td></tr>
               </tbody>
              </table>

### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> infoList</span></td><td key="1"><span>object []</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item type: </span><span>object</span></p></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> id</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> createUser</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>udf creator</span></td><td key="5"></td></tr><tr key="0-0-2"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-3"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-4"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> expire</span></td><td key="1"><span>boolean</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>whether udf expires</span></td><td key="5"></td></tr><tr key="0-0-5"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> shared</span></td><td key="1"><span>boolean</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>true is shared udf</span></td><td key="5"></td></tr><tr key="0-0-6"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> treeId</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-7"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> sys</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>system, eg: dss</span></td><td key="5"></td></tr><tr key="0-0-8"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> clusterName</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>cluster, temporarily all</span></td><td key="5"></td></tr><tr key="0-0-9"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> createTime</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-10"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> updateTime</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-11"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> path</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>The path of the last upload by the user, for display purposes</span></td><td key="5"></td></tr><tr key="0-0-12"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> registerFormat</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-13"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> useFormat</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-14"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> description</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-15"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> operationStatus</span></td><td key="1"><span>object</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Classification</span></td><td key="5"></td></tr><tr key="0-0-15-0"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canUpdate</span></td><td key="1"><span>boolean</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>can edit</span></td><td key="5"></td></tr><tr key="0-0-15-1"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canShare</span></td><td key="1"><span>boolean</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Can it be shared</span></td><td key="5"></td></tr><tr key="0-0-15-2"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canPublish</span></td><td key="1"><span>boolean</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Can it be published</span></td><td key="5"></td></tr><tr key="0-0-15-3"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canDelete</span></td><td key="1"><span>boolean</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Can it be deleted</span></td><td key="5"></td></tr><tr key="0-0-15-4"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canExpire</span></td><td key="1"><span>boolean</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Can it expire</span></td><td key="5"></td></tr><tr key="0-0-15-5"><td key="0"><span style={{paddingLeft:'40px'}}><span style={{color:'#8c8a8a'}}>├─</span> canHandover</span></td><td key="1"><span>boolean</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Can it be handed over</span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> totalPage</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>total pages</span></td><td key="5"></td></tr><tr key="0-2"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> field_1</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-3"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> total</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>total number</span></td><td key="5"></td></tr>
               </tbody>
              </table>

## UDF expired

### Basic Information

**Path：** /api/rest_j/v1/udf/setExpire

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name  | parameter value  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | true  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

## udf file download to local

### Basic Information

**Path：** /api/rest_j/v1/udf/downloadToLocal

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name  | parameter value  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | true  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> version</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

## Version list view

### Basic Information

**Path：** /api/rest_j/v1/udf/versionList

**Method：** GET

**Interface description：**


### request parameters
**Query**

| parameter name  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ |
| udfId | true  |  100 |   |

### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> versionList</span></td><td key="1"><span>object []</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item type: </span><span>object</span></p></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> id</span></td><td key="1"><span>number</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfId</span></td><td key="1"><span>number</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-2"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> path</span></td><td key="1"><span>string</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-3"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> bmlResourceId</span></td><td key="1"><span>string</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-4"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> bmlResourceVersion</span></td><td key="1"><span>string</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-5"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> isPublished</span></td><td key="1"><span>boolean</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-6"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> registerFormat</span></td><td key="1"><span>string</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-7"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> useFormat</span></td><td key="1"><span>string</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-8"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> description</span></td><td key="1"><span>string</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-9"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> createTime</span></td><td key="1"><span>number</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-10"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> expire</span></td><td key="1"><span>boolean</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-11"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> createUser</span></td><td key="1"><span>string</span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

## Version fallback

### Basic Information

**Path：** /api/rest_j/v1/udf/rollback

**Method：** POST

**Interface description：**


### request parameters
**Headers**

| parameter name  | parameter value  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | true  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> version</span></td><td key="1"><span>string</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Fallback version</span></td><td key="5"></td></tr>
               </tbody>
              </table>

## Get udf user list

### Basic Information

**Path：** /api/rest_j/v1/udf/allUdfUsers

**Method：** GET

**Interface description：**


### request parameters

### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfUsers</span></td><td key="1"><span>string []</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item type: </span><span>string</span></p></td></tr><tr key="array-15"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> </span></td><td key="1"><span></span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

## Get the first-level classification of the user's personal function

### Basic Information

**Path：** /api/rest_j/v1/udf/userDirectory

**Method：** GET

**Interface description：**


### request parameters
**Query**

| parameter name  |  Is it necessary | Example  | Remark  |
| ------------ | ------------ | ------------ | ------------ |
| category | true  |  udf |  truetrue"udf"or"function"represents the first-level classification of the udf function and the first-level classification of the method function, respectively |

### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">Is it necessary</th><th key="default">Defaults</th><th key="desc">Remark</th><th key="sub">other information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> userDirectory</span></td><td key="1"><span>string []</span></td><td key="2">true</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>list of taxonomy names</span></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item type: </span><span>string</span></p></td></tr><tr key="array-16"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> </span></td><td key="1"><span></span></td><td key="2">false</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody> </table>
            