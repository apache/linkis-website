CheckRuler架构设计
======

CheckRuler用于在Converter和Validator之前进行检查的规则，用于检验传递参数的的合法性和完整性，除了自带的几种必要的Ruler，其余可以根据用户自身需要进行实现。

**Convert阶段：**

| 类名                                     | 继承类               | 作用                    |
|------------------------------------------|----------------------|-------------------------|
| JobReqParamCheckRuler                    | ConverterCheckRulter | 校验提交的job参数完整性 |
| PythonCodeConverterCheckRuler            | ConverterCheckRulter | Python代码规范性检测    |
| ScalaCodeConverterCheckRuler             | ConverterCheckRulter | Scala代码规范检测       |
| ShellDangerousGrammarConverterCheckRuler | ConverterCheckRulter | Shell脚本代码规范性检测 |
| SparkCodeCheckConverterCheckRuler        | ConverterCheckRulter | Spark代码规范性检测     |
| SQLCodeCheckConverterCheckRuler          | ConverterCheckRulter | SQL代码规范性检测       |
| SQLLimitConverterCheckRuler              | ConverterCheckRulter | SQL代码长度检测         |
| VarSubstitutionConverterCheckRuler       | ConverterCheckRulter | 变量替换规则校验        |

**Validator阶段：**

| 类名                          | 继承类                 | 作用                |
|-------------------------------|------------------------|---------------------|
| LabelRegularCheckRuler        | ValidatorCheckRuler    | Job的标签合法性校验 |
| DefaultLabelRegularCheckRuler | LabelRegularCheckRuler | 实现类              |
| RouteLabelRegularCheckRuler   | LabelRegularCheckRuler | 实现类              |

如果需要自定义新的validator阶段的校验规则，自定义校验更多的标签类型，可以继承LabelRegularCheckRuler，重写customLabel值即可
