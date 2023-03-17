---
title: Task Fixed EngineConn Execution
sidebar_position: 0.3
---

## 1. Requirement Background
Now when Linksi tasks are submitted, they are created or reused based on the tags of EngineConn (hereinafter referred to as EC), and the ECs between multiple tasks are random. However, for the existence of multi-tasks that need to be able to meet the dependencies of the tasks, execution on the same EC cannot be well supported. Add a new EngineConnInstanceLabel to multi-tasks to fix the same EC for multiple tasks.

## 2. Instructions for use
1. The management console adds a specific label, and the adding path is as follows: login to the control panel -> ECM management -> click on an ECM instance name -> edit the EC to be fixed -> add a label of type FixdEngineConnLabel.
![](/Images/feature/ecm.png)
![](/Images/feature/ec.png)
![](/Images/feature/label.png)
2. To submit the task execution, you need to add: FixdEngineConnLabel label and submit it to the fixed instance
```json
"labels": {
    "engineType": "spark-2.4.3",
    "userCreator": "hadoop-IDE",
    "fixedEngineConn": "idvalue"
}
```
## 3. Precautions
1. For the first task, you can choose to obtain the list of EC instances for selection, or you can directly submit the task for creation

2. If the EC is not idle and available, a new EC instance will be created to execute the task. If you need to avoid this situation, you can call the EC instance query interface when the task is submitted to determine whether the corresponding EC exists and status before submitting.