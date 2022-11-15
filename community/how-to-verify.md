---
title: How to Verify Release
sidebar_position: 4
---

# Verify the candidate version

For detailed check list, please refer to the official [check list](https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist)

## 1. Download the candidate version
 
> Download the candidate version to be released to the local environment
> Need to rely on gpg tool, if not, it is recommended to install gpg2

:::caution Note
If the network is poor, downloading may be time-consuming. The download is completed normally in about 20 minutes, please wait patiently.
:::
```shell
#If there is svn locally, you can clone to the local
$ svn co https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version}/
#or download the material file directly
$ wget https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version}/xxx.xxx

```
## 2. Verify that the uploaded version is compliant
> Start the verification process, which includes but is not limited to the following content and forms

### 2.1 Check whether the release package is complete
> The package uploaded to dist must include the source code package, and the binary package is optional

1. Whether to include the source code package
2. Whether to include the signature of the source code package
3. Whether to include the sha512 of the source code package
4. If the binary package is uploaded, also check the contents listed in (2)-(4)

### 2.2 Check gpg signature
First import the publisher's public key. Import KEYS from the svn repository to the local environment. (The person who releases the version does not need to import it again, the person who helps to do the verification needs to import it, and the user name is enough for the person who issued the version)

#### 2.2.1 Import public key
```shell
$ curl  https://downloads.apache.org/incubator/linkis/KEYS > KEYS # Download KEYS
$ gpg --import KEYS # Import KEYS to local
```
#### 2.2.2 Trust the public key
> Trust the KEY used in this version

```shell
$ gpg --edit-key xxxxxxxxxx #KEY user used in this version
gpg (GnuPG) 2.2.21; Copyright (C) 2020 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.
gpg> trust #trust
Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 5 #choose 5
Do you really want to set this key to ultimate trust? (y/N) y  #choose y
                                                            
gpg>
         
```
#### 2.2.3 Check the gpg signature

```shell
$ for i in *.tar.gz; do echo $i; gpg --verify $i.asc $i; done
#or
$ gpg --verify apache-linkis-${release_version}-src.tar.gz.asc apache-linkis-${release_version}-src.tar.gz
# If you upload a binary package, you also need to check whether the signature of the binary package is correct
$ gpg --verify apache-linkis-${release_version}-bin.tar.gz.asc apache-linkis-${release_version}-bin.tar.gz
```
check result

> If something like the following appears, it means the signature is correct. Keyword: **`Good signature`**

```shell
apache-linkis-xxx-incubating-src.tar.gz
gpg: Signature made XXXX
gpg: using RSA key XXXXX
gpg: Good signature from "xxx @apache.org>"
```

### 2.3 Check sha512 hash
> After calculating the sha512 hash locally, verify that it is consistent with the dist. If you upload a binary package, you also need to check the sha512 hash of the binary package

> macOS/Linux

```shell
$ for i in *.tar.gz; do echo $i; sha512sum --check  $i.sha512; done

#or
$ sha512sum --check apache-linkis-${release_version}-src.tar.gz.sha512
# If you upload a binary package, you also need to check whether the signature of the binary package is correct
$ sha512sum --check apache-linkis-${release_version}-bin.tar.gz.sha512

```


> Windows

```shell
$ certUtil -hashfile apache-linkis-${release_version}-incubating-xxx.tar.gz SHA512
#Compare the output content with the content of the apache-linkis-${release_version}-incubating-xxx.tar.gz.sha512 file
```


### 2.4. Check the file content of the source package

Unzip `apache-linkis-${release_version}-incubating-src.tar.gz` 
```text
$ tar -xvf apache-linkis-${release_version}-incubating-src.tar.gz

$ cd apache-linkis-${release_version}-incubating-src
```
#### 2.4.1 Asf license rat check
Mac OS/Linux
```shell
#normally can be executed within 5 minutes
$ ./mvnw -N install  
$ ./mvnw apache-rat:check

#Check all rat files after no exception
$ find ./ -name rat.txt -print0 | xargs -0 -I file cat file > merged-rat.txt
```
Window
```shell
#normally can be executed within 5 minutes
$ mvnw.cmd -N install
$ mvnw.cmd apache-rat:check
````

The whitelist file of rat check is configured in the apache-rat-plugin plugin configuration in the outer pom.xml.
Check all the license information in merged-rat.txt, and notice if the Binaries and Archives files are 0.
````text
Notes: 0
Binaries: 0
Archives: 0
0 Unknown Licenses
````
<font color="red">
If it is not 0, you need to confirm whether the source code has the license for the binary or compressed file. You can refer to the `linkis-engineconn-plugins/python/src/main/py4j/py4j- 0.10.7-src.zip`
</font>


#### 2.4.2 Project source code compilation verification
Mac OS/Linux
```shell
$ ./mvnw -N install
#If the performance of the machine where the compilation is located is relatively poor, this process will be time-consuming, usually about 30min
$  ./mvnw clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
````
Window 
```shell
$ mvnw.cmd -N install
#If the performance of the machine where the compilation is located is relatively poor, this process will be time-consuming, usually about 30min
$ mvnw.cmd clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
````
#### 2.4.3 Web source code compilation verification
> This will require node.js environment. It is recommended to use node v14 version.

First, install the packages:
```shell
npm install
```
Next, build the project：
```shell
npm run build
```
The console installation package `apache-linkis-${version}-incubating-web-bin.tar.gz` will be generated after the above command is successfully executed

:::caution
1.An error occured when running `npm install`:

`Error: Can't find Python executable "python", you can set the PYTHON env variable`

You can install the windows-build-tools (This requires administractor privileges)
```shell
$ npm install --global --production windows-build-tools
```
Install the node-gyp:
```shell
$ npm install --global node-gyp
```
2.If compilation fails, please clean up and re-execute as follows:
```shell
#Delete node_modules
$ rm -rf node_modules
#Delete package-lock.json
$ rm -rf package-lock.json
#Clean npm cache
$ npm cache clear --force
#Download packages again
$ npm install

```
:::
#### 2.4.4 Check related compliance items

and check as follows:

- [ ] Check whether the source package contains unnecessary files, which makes the tar package too large
- [ ] Folder contains the word `incubating`
- [ ] There are `LICENSE` and `NOTICE` files
- [ ] There is a `DISCLAIMER` or `DISCLAIMER-WIP` file
- [ ] The year in the `NOTICE` file is correct
- [ ] Only text files exist, not binary files
- [ ] All files have ASF license at the beginning
- [ ] Able to compile correctly
- [ ] Check for extra files or folders, such as empty folders, etc.
- [ ] .....

### 2.5 Check the binary package
> If the binary/web-binary package is uploaded, check the binary package. 

Unzip `apache-linkis-${release_version}-incubating-bin.tar.gz` 

```shell
$ mkdir apache-linkis-${release_version}-incubating-bin
$ tar -xvf  apache-linkis-${release_version}-incubating-bin.tar.gz -C  apache-linkis-${release_version}-incubating-bin
$ cd apache-linkis-${release_version}-incubating-bin
```
and check as follows:
- [ ] Folder contains the word `incubating`
- [ ] There are `LICENSE` and `NOTICE` files
- [ ] There is a `DISCLAIMER` or `DISCLAIMER-WIP` file
- [ ] The year in the `NOTICE` file is correct
- [ ] All text files have ASF license at the beginning
- [ ] Check the third-party dependent license:
- [ ] Compatible with third-party dependent licenses
- [ ] All third-party dependent licenses are named in the `LICENSE` file
- [ ] If you are relying on the Apache license and there is a `NOTICE` file, then these `NOTICE` files also need to be added to the version of the `NOTICE` file
- [ ] .....

You can refer to this article: [ASF Third Party License Policy](https://apache.org/legal/resolved.html)
 

## 3. Email reply

If you initiate a posting vote, you can refer to this response example to reply to the email after verification
<font color="red">
When replying to the email, you must bring the information that you have checked by yourself. Simply replying to `+1 approve` is invalid.

When PPMC votes in the dev@linkis.apache.org linkis community, Please bring the binding suffix to indicate that it has a binding vote for the vote in the linkis community, and it is convenient to count the voting results.

When IPMC votes in the general@incubator.apache.org incubator community. Please bring the binding suffix to indicate that the voting in the incubator community has a binding vote, which is convenient for counting the voting results.
</font>

:::caution note
If you have already voted on dev@linkis.apache.org, you can take it directly to the incubator community when you reply to the vote, such as:

```html
//Incubator community voting, only IPMC members have binding binding，PPMC needs to be aware of binding changes
Forward my +1 from dev@linkis (non-binding)
Copy my +1 from linkis DEV ML (non-binding)
````
:::


Non-PPMC/Non-IPMC member
```html
+1 (non-binding)
I checked:
     1. All download links are valid
     2. Checksum and signature are OK
     3. LICENSE and NOTICE are exist
     4. Build successfully on macOS(Big Sur)
     5.  
````

PPMC/IPMC member
```html
//Incubator community voting, only IPMC members have binding binding
+1 (binding)
I checked:
     1. All download links are valid
     2. Checksum and signature are OK
     3. LICENSE and NOTICE are exist
     4. Build successfully on macOS(Big Sur)
     5.  
````


## 4. Precautions
<font color="red">
If you have maven tools installed, you can replace ./mvnw or mvnw.cmd with your own mvn command

mvnw is short for Maven Wrapper. It can support running Maven projects without installing Maven and configuring environment variables. If it can't find it, it will download the corresponding Maven version according to the configuration file


</font>