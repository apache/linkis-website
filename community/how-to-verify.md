---
title: How to Verify release
sidebar_position: 4
---

# Verify Apache Release
To verify the release, the following checklist can be used to reference:
- [ ] Download links are valid.
- [ ] Checksums and PGP signatures are valid.
- [ ] DISCLAIMER-WIP(DISCLAIMER) is included.
- [ ] Source code artifacts have correct names matching the current release.
- [ ] LICENSE and NOTICE files are correct for the repository.
- [ ] All files have license headers if necessary.
- [ ] No compiled archives bundled in source archive.
- [ ] Building is OK.

For a detailed checklist, please refer to [check list](https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist), here we introduce how to do the verification.

## 1. Download the release package to be verified to the local environment
> Use the following command to download all artifacts, replace "${release_version}-${rc_version}" with the version ID of the version to be released:
```shell
svn co https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version}/
Or download all the material files of the version directly
wget https://dist.apache.org/repos/dist/dev/incubator/linkis/${release_version}-${rc_version}/xxx.xxx
```

## 2. Verify signature and hash
> Start the verification process, which includes but is not limited to the following content and verification methods.
> GnuPG is recommended, which can install by yum install gnupg or apt-get install gnupg.

### 2.1 Check if the release package is complete
The package to release must check:
- Whether to include the source code package
- Whether to include the signature of the source code package
- Whether to include the sha512 of the source code package
- (if include) Check the binary package, also check the contents listed in (2)-(4)

### 2.2 Verify signature and hash
GnuPG is recommended, which can install by yum install GnuPG or apt-get install GnuPG.
- Import public key
```shell
  curl https://dist.apache.org/repos/dist/dev/incubator/linkis/KEYS > KEYS # Download KEYS
  gpg --import KEYS # Import KEYS to local
```
- Trust the public key
> Trust the KEY used in this version
```shell
    gpg --edit-key xxxxxxxxxx                           # KEY used in this version
    gpg (GnuPG) 2.2.21; Copyright (C) 2020 Free Software Foundation, Inc.
    This is free software: you are free to change and redistribute it.
    There is NO WARRANTY, to the extent permitted by law.
    Secret key is available.
    gpg> trust                                          # Trust the KEY
   
    Please decide how far you trust this user to correctly verify other users' keys
    (by looking at passports, checking fingerprints from different sources, etc.)
    
      1 = I don't know or won't say
      2 = I do NOT trust
      3 = I trust marginally
      4 = I trust fully
      5 = I trust ultimately
      m = back to the main menu
    
    Your decision? 5                                                    # select 5
    Do you really want to set this key to ultimate trust? (y/N) y       # select y

    gpg> 
         
```
- Check signature and hash
```shell
  for i in *.tar.gz; do echo $i; gpg --verify $i.asc $i ; done
  # or
  gpg --verify apache-linkis-${release_version}-src.tar.gz.asc apache-linkis-${release_version}-src.tar.gz
  # Attention: if you upload a binary package, you also need to check whether the signature of the binary package is correct
  gpg --verify apache-linkis-${release_version}-bin.tar.gz.asc apache-linkis-${release_version}-bin.tar.gz
 ```
- Confirm result
> If something similar to the following appears, it means that the signature is correct, and the keywords: **`Good signature`**

```shell
apache-linkis-xxx-incubating-src.tar.gz
gpg: Signature made XXXX
gpg:                using RSA key XXXXX
gpg: Good signature from "xxx @apache.org>"
```

### 2.3 Verify sha512 hash
> Calculate the sha512 hash locally, and verify that it is consistent with the one on dist
```shell
for i in *.tar.gz; do echo $i; gpg --print-md SHA512 $i; done
# or
gpg --print-md SHA512 apache-linkis-${release_version}-src.tar.gz
# If include a binary package, you also need to check the sha512 hash of the binary package
gpg --print-md SHA512 apache-linkis-${release_version}-bin.tar.gz
# or
for i in *.tar.gz.sha512; do echo $i; sha512sum -c $i; done
```

### 2.4. Check the file content of the source package
Unzip `apache-linkis-${release_version}-src.tar.gz` and check as follows:
- [ ] DISCLAIMER-WIP file exists and the content is correct.
- [ ] LICENSE and NOTICE files are correct for the repository.
- [ ] All files have ASF license headers if necessary.
- [ ] The source code can be compiled normally.
- [ ] The single test can run through.
- [ ] Building is OK.
- [ ] ....

### 2.5 Check the binary package (if the binary package is included)
  Unzip `apache-linkis-${release_version}-src.tar.gz`, check as follows:
- [ ] DISCLAIMER-WIP file exists and the content is correct.
- [ ] LICENSE and NOTICE files are correct for the repository.
- [ ] The deployment can be successful
- [ ] Deploy a test environment to verify whether production and consumption can run normally.
- [ ] Verify what you think might go wrong.
- [ ] ....
