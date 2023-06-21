---
title: remove json4s from linkis
sidebar_position: 0.2
---

## 1. Requirement Background
we need to bind specific json4s version and spark version, we need to reduce the dependency.
for example: spark2.4 use json4s v3.5.3, spark3.2 use json4s v3.7.0-M11

## 2. Instructions for use
no need to specific json4s versions when we specify different spark versions