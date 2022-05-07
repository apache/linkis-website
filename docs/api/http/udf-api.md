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
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead>
  <tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{ color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2"> Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td>< td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}}><span style ={{color:'#8c8a8a'}}></span> handoverUser</span></td><td key="1"><span>string</span></td><td key=" 2">Must</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}> be handed over to the user</span ></td><td key="5"></td></tr>
  </tbody>
</table>

## UDF modification

### Basic Information

**Path:** /api/rest_j/v1/udf/update

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
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfUpdateVo</span></td><td key="1"><span>object</span></td><td key= "2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span>< /td><td key="5"></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px' }}><span style={{color:'#8c8a8a'}}>├─</span> id</span></td><td key="1"><span>number</span>< /td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'} }></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style= {{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span >string</span></td><td key="2">required</td><td key="3"></td><td key="4"><span style={{whiteSpace :'pre-wrap'}}>Cannot modify</span></td><td key="5"></td></tr><tr key="0-0-2"><td key ="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span> </td><td key="1"><span>number</span></td><td key="2">required</td><td key="3"></td>< td key="4"><span style={{whiteSpace:'pre-wrap'}}>cannot be modified</span></td><td key="5"></td></tr>< tr key="0-0-3"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─ </span> description</span></td><td key="1"><span>string</span></td><td key="2">required</td><td key= "3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></span> td></tr><tr key="0-0-4"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'# 8c8a8a'}}>├─</span> path</span></td><td key="1"><span>string</span></td><td key="2">must< /td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>jar type udf is uploaded by file path</span ></td><td key="5"></td></tr><tr key="0-0-5"><td key="0"><span style={{paddingLeft:' 20px'}}><span style={{color:'#8c8a8a'}}>├─</span> useFormat</span></td><td key="1"><span>string</span ></td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap '}}></span>< /td><td key="5"></td></tr><tr key="0-0-6"><td key="0"><span style={{paddingLeft:'20px' }}><span style={{color:'#8c8a8a'}}>├─</span>registerFormat</span></td><td key="1"><span>string</span>< /td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'} }></span></td><td key="5"></td></tr>
               </tbody>
              </table>
       
### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
   </tbody>
</table>

## UDF shared user list
### Basic Information

**Path:** /api/rest_j/v1/udf/getSharedUsers

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
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key="2">Required</td><td key="3"></td><td key="4"> <span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>
       
### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> sharedUsers</span></td><td key="1"><span>string []</span></td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span ></td><td key="5"><p key="4"><span style={{fontWeight:'700'}}>item type: </span><span>string</span> </p></td></tr><tr key="array-13"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{ color:'#8c8a8a'}}>├─</span> </span></td><td key="1"><span></span></td><td key="2"> Optional</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td> <td key="5"></td></tr>
               </tbody>
              </table>

##UDF removal
### Basic Information

**Path:** /api/rest_j/v1/udf/delete/{id}

**Method:** POST

**Interface description:**


### request parameters
**Headers**

| Parameter name | Parameter value | Required | Example | Remarks |
| ------------ | ------------ | ------------ | ------------ -- | ------------ |
| Content-Type | application/json | yes | | |

**path parameters**

| Parameter name | Example | Remarks |
| ------------ | ------------ | ------------ |
| id | 100 | udf id |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

## UDF new

### Basic Information

**Path:** /api/rest_j/v1/udf/add

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
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfAddVo</span></td><td key="1"><span>object</span></td><td key= "2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span>< /td><td key="5"></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px' }}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span>string</span>< /td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'} }></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style= {{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span></td><td key="1"><span >number</span></td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace :'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-2"><td key=" 0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> description</spa n></td><td key="1"><span>string</span></td><td key="2">required</td><td key="3"></td ><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>< tr key="0-0-3"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─ </span> path</span></td><td key="1"><span>string</span></td><td key="2">required</td><td key= "3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>jar type udf is uploaded by file path</span></td><td key="5"></td></tr><tr key="0-0-4"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> shared</span></td><td key="1"><span>boolean</span></td><td key="2">Not required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Do not pass </span></td><td key="5"></td></tr><tr key="0-0-5"><td key="0"><span style={{ paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> useFormat</span></td><td key="1"><span>string </span></td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:' pre-wrap'}}></span></t d><td key="5"></td></tr><tr key="0-0-6"><td key="0"><span style={{paddingLeft:'20px'} }><span style={{color:'#8c8a8a'}}>├─</span> expire</span></td><td key="1"><span>boolean</span></ td><td key="2">Not required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'} }>Don't pass</span></td><td key="5"></td></tr><tr key="0-0-7"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> load</span></td><td key="1"> <span>boolean</span></td><td key="2">required</td><td key="3"></td><td key="4"><span style={ {whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-8"><td key ="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> registerFormat</span></td><td key="1"><span>string</span></td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span ></td><td key="5"></td></tr><tr key="0-0-9"><td key="0"><span style={{paddingLeft:' 20px'}}><span style={{color:'#8c8a8a'}}>├─</span> treeId</span></td><td key="1"><span>number</span ></td><td key="2">Not required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre- wrap'}}>Don't pass</span></td><td key="5"></td></tr><tr key="0-0-10"><td key="0" ><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> sys</span></td><td key=" 1"><span>string</span></td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>System: temporarily: "IDE"</span></td><td key="5"></td></tr><tr key ="0-0-11"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</ span> clusterName</span></td><td key="1"><span>string</span></td><td key="2">required</td><td key="3 "></td><td key= "4"><span style={{whiteSpace:'pre-wrap'}}>clusters, all are "all" temporarily</span></td><td key="5"></td></ tr><tr key="0-0-12"><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}} >├─</span> directory</span></td><td key="1"><span>string</span></td><td key="2">required</td>< td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>first-level category of personal functions</span></td> <td key="5"></td></tr>
               </tbody>
              </table>

         
### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

## UDF View source code

### Basic Information

**Path:** /api/rest_j/v1/udf/downloadUdf

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
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key= "2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span>< /td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}} ><span style={{color:'#8c8a8a'}}></span> version</span></td><td key="1"><span>string</span></td>< td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></td> span></td><td key="5"></td></tr>
               </tbody>
</table>

### return data

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> method</span></td><td key="1"><span>string</span></td><td key= "2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span>< /td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}} ><span style={{color:'#8c8a8a'}}></span> status</span></td><td key="1"><span>number</span></td>< td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></td> span></td><td key="5"></td></tr><tr key="0-2"><td key="0"><span style={{paddingLeft:'0px '}}><span style={{color:'#8c8a8a'}}></span> message</span></td><td key="1"><span>string</span></ td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}} ></span></td><td key="5"></td></tr><tr key="0-3"><td key="0"><span style={{paddingLeft :'0px'}}><span style={{color:'#8c8a8a'}}></span> data</span></td><td key="1"><span> object</span></td><td key="2">must</td><td key="3"></td><td key="4"><span style={{whiteSpace: 'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-3-0"><td key="0 "><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> content</span></td><td key= "1"><span>string</span></td><td key="2">Required</td><td key="3"></td><td key="4">< span style={{whiteSpace:'pre-wrap'}}>udf content</span></td><td key="5"></td></tr>
       </tbody>
</table>

## UDF version release

### Basic Information

**Path:** /api/rest_j/v1/udf/publish

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
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfId</span></td><td key="1"><span>number</span></td><td key= "2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span>< /td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'}} ><span style={{color:'#8c8a8a'}}></span> version</span></td><td key="1"><span>string</span></td>< td key="2">must be published</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}> Version: v000005</span></td><td key="5"></td></tr>
               </tbody>
              </table>

## UDF sharing

### Basic Information

**Path:** /api/rest_j/v1/udf/shareUDF

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
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfInfo</span></td><td key="1"><span>object</span></td><td key= "2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span>< /td><td key="5"></td></tr><tr key="0-0-0"><td key="0"><span style={{paddingLeft:'20px' }}><span style={{color:'#8c8a8a'}}>├─</span> id</span></td><td key="1"><span>number</span>< /td><td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'} }></span></td><td key="5"></td></tr><tr key="0-0-1"><td key="0"><span style= {{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfName</span></td><td key="1"><span >string</span></td><td key="2">required</td><td key="3"></td><td key="4"><span style={{whiteSpace :'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-0-2"><td key=" 0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> udfType</span></td><td key="1"><span>number</span></td><td key="2">must</td><td key="3"></td><td key="4" ><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-1" ><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> sharedUsers</span></td ><td key="1"><span>string []</span></td><td key="2">required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>shared user list</span></td><td key="5"><p key="4"> <span style={{fontWeight:'700'}}>item type: </span><span>string</span></p></td></tr><tr key="array-14" ><td key="0"><span style={{paddingLeft:'20px'}}><span style={{color:'#8c8a8a'}}>├─</span> </span></span> td><td key="1"><span></span></td><td key="2">optional</td><td key="3"></td><td key ="4"><span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr>
               </tbody>
              </table>

## UDF management page
> Note: Only udfs created by the user themselves can be seen

### Basic Information

**Path:** /api/rest_j/v1/udf/managerPages

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
      <th key="name">name</th><th key="type">type</th><th key="required">required</th><th key="default">default </th><th key="desc">Notes</th><th key="sub">Other Information</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key="0-0"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> udfName</span></td><td key="1"><span>string</span></td><td key= "2">Not required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}></span> </td><td key="5"></td></tr><tr key="0-1"><td key="0"><span style={{paddingLeft:'0px'} }><span style={{color:'#8c8a8a'}}></span> udfType</span></td><td key="1"><span>string</span></td> <td key="2">Required</td><td key="3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Comma Split string, such as: 0,1,2</span></td><td key="5"></td></tr><tr key="0-2"><td key= "0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> createUser</span></td><td key= "1"><span>string</span></td><td key="2">optional</td><td key="3"></td><td key="4"> <span style={{whiteSpace:'pre-wrap'}}></span></td><td key="5"></td></tr><tr key="0-3"> <td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}></span> curPage</sp an></td><td key="1"><span>number</span></td><td key="2">required</td><td key="3"></td ><td key="4"><span style={{whiteSpace:'pre-wrap'}}>page</span></td><td key="5"></td></ tr><tr key="0-4"><td key="0"><span style={{paddingLeft:'0px'}}><span style={{color:'#8c8a8a'}}>< /span> pageSize</span></td><td key="1"><span>number</span></td><td key="2">required</td><td key=" 3"></td><td key="4"><span style={{whiteSpace:'pre-wrap'}}>Number of records</span><
  