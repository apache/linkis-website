---
title: 发布版本验证
sidebar_position: 4
---
# 验证候选版本

详细检查列表请参考官方的[check list](https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist)

## 1. 下载要发布的候选版本到本地环境
:::caution 注意
如果网络较差，下载可能会比较耗时。正常完成下载大约20分钟左右，请耐心等待。
:::
```shell
#如果本地有svn，可以clone到本地 
svn co https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version}/
#或则 直接下载物料文件
wget https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version}/xxx.xxx

```
## 2. 验证上传的版本是否合规
> 开始验证环节，验证包含但不局限于以下内容和形式

### 2.1 查看发布包是否完整
> 上传到dist的包必须包含源码包，二进制包可选

1. 是否包含源码包
2. 是否包含源码包的签名
3. 是否包含源码包的sha512
4. 如果上传了二进制包，则同样检查(2)-(4)所列的内容

### 2.2 检查gpg签名
首先导入发布人公钥。从svn仓库导入KEYS到本地环境。（发布版本的人不需要再导入，帮助做验证的人需要导入，用户名填发版人的即可）

- 导入公钥
```shell
curl https://dist.apache.org/repos/dist/dev/incubator/linkis/KEYS > KEYS # 下载KEYS
gpg --import KEYS # 导入KEYS到本地
```
- 信任公钥
> 信任此次版本所使用的KEY
```shell
    gpg --edit-key xxxxxxxxxx #此次版本所使用的KEY用户
    gpg (GnuPG) 2.2.21; Copyright (C) 2020 Free Software Foundation, Inc.
    This is free software: you are free to change and redistribute it.
    There is NO WARRANTY, to the extent permitted by law.
    
    Secret key is available.
    gpg> trust #信任
    Please decide how far you trust this user to correctly verify other users' keys
    (by looking at passports, checking fingerprints from different sources, etc.)
    
      1 = I don't know or won't say
      2 = I do NOT trust
      3 = I trust marginally
      4 = I trust fully
      5 = I trust ultimately
      m = back to the main menu
    
    Your decision? 5 #选择5
    Do you really want to set this key to ultimate trust? (y/N) y #选择y
                                                                
    gpg> 
         
```
- 使用如下命令检查签名
```shell
  for i in *.tar.gz; do echo $i; gpg --verify $i.asc $i ; done
  #或者
  gpg --verify apache-linkis-${release_version}-src.tar.gz.asc apache-linkis-${release_version}-src.tar.gz
  # 如果上传二进制包，则同样需要检查二进制包的签名是否正确
  gpg --verify apache-linkis-${release_version}-bin.tar.gz.asc apache-linkis-${release_version}-bin.tar.gz
```
- 检查结果

> 出现类似以下内容则说明签名正确，关键字：**`Good signature`**
```shell
    apache-linkis-xxx-incubating-src.tar.gz
    gpg: Signature made XXXX
    gpg:                using RSA key XXXXX
    gpg: Good signature from "xxx @apache.org>"
```

### 2.3 检查sha512哈希
> 本地计算sha512哈希后，验证是否与dist上的一致，如果上传二进制包，则同样需要检查二进制包的sha512哈希

> Mac OS/Linux

```shell
for i in *.tar.gz; do echo $i; gpg --print-md SHA512 $i; done
#或者
for i in *.tar.gz; do echo $i; shasum -a 512  $i; done

#并将输出内容与 apache-linkis-${release_version}-xxx.tar.gz.sha512文件内容作对比

```


> Windows

```shell
$ certUtil -hashfile apache-linkis-${release_version}-xxx.tar.gz SHA512
#并将输出内容与 apache-linkis-${release_version}-xxx.tar.gz.sha512文件内容作对比
```


### 2.4. 检查源码包的文件内容

解压缩`apache-linkis-${release_version}-src.tar.gz`，进行如下检查:

- [ ] 检查源码包是否包含由于包含不必要文件，致使tar包过于庞大
- [ ] 文件夹包含单词`incubating`
- [ ] 存在`LICENSE`和`NOTICE`文件
- [ ] 存在`DISCLAIMER`或`DISCLAIMER-WIP`文件
- [ ] `NOTICE`文件中的年份正确
- [ ] 只存在文本文件，不存在二进制文件
- [ ] 所有文件的开头都有ASF许可证
- [ ] 能够正确编译
- [ ] 检查是否有多余文件或文件夹，例如空文件夹等
- [ ] .....

### 2.5 检查二进制包(如果上传了二进制包)
解压缩`apache-linkis-${release_version}-src.tar.gz`，进行如下检查:

- [ ] 文件夹包含单词`incubating`
- [ ] 存在`LICENSE`和`NOTICE`文件
- [ ] 存在`DISCLAIMER`或`DISCLAIMER-WIP`文件
- [ ] `NOTICE`文件中的年份正确
- [ ] 所有文本文件开头都有ASF许可证
- [ ] 检查第三方依赖许可证：
- [ ] 第三方依赖的许可证兼容
- [ ] 所有第三方依赖的许可证都在`LICENSE`文件中声名
- [ ] 如果依赖的是Apache许可证并且存在`NOTICE`文件，那么这些`NOTICE`文件也需要加入到版本的`NOTICE`文件中
- [ ] .....

详细的检查项，可以参考此文章：[ASF第三方许可证策](https://apache.org/legal/resolved.html)
 
## 3.邮件回复 
如果发起了发布投票，验证后，可以参照此回复示例进行邮件回复

```html
+1 (xxxx)

I  checked:
    1. All download links are valid
    2. Checksum and signature are OK
    3. LICENSE and NOTICE are exist
    4. Build successfully on macOS(Big Sur) 
    5. ....
```