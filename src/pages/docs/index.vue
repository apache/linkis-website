<template>
    <div class="ctn-block reading-area">
        <main class="main-content">
            <router-view></router-view>
        </main>
        <div class="side-bar">
            <router-link :to="doc.link" class="bar-item" v-for="(doc,index) in jsonData.list" :key="index">{{doc.title}}
                <router-link :to="children.link" class="bar-item" v-for="(children,cindex) in doc.children"
                             :key="cindex">{{children.title}}
                </router-link>
            </router-link>
        </div>
    </div>
</template>
<script >
    import utils  from "../../js/utils";
    import  list_en from "./docsdata_en.js";
    import  list_zh from "./docsdata_zh.js";

    export default {
        data() {
            return {
                utils,
                "jsonData": null
            }
        },
        created() {
            const lang = localStorage.getItem('locale');
            if (lang === "en") {
                this.jsonData = list_en;
            } else {
                this.jsonData = list_zh;
            }
        }

    }
</script>



<!--<script setup>-->
<!--    const docs = [-->
<!--        {-->
<!--            title: '部署文档',-->
<!--            link: '/docs/deploy/linkis',-->
<!--            children: [{-->
<!--                title: '快速部署 Linkis1.0',-->
<!--                link: '/docs/deploy/linkis',-->
<!--            }, {-->
<!--                title: '快速安装 EngineConnPlugin 引擎插件',-->
<!--                link: '/docs/deploy/engins',-->
<!--            }, {-->
<!--                title: 'Linkis1.0 分布式部署手册',-->
<!--                link: '/docs/deploy/distributed',-->
<!--            }, {-->
<!--                title: 'Linkis1.0 安装包目录层级结构详解',-->
<!--                link: '/docs/deploy/structure',-->
<!--            }]-->
<!--        },-->

<!--        //   - [用户手册](User_Manual/README.md)-->
<!--        //   - [Linkis1.0 使用的几种方式](User_Manual/How_To_Use_Linkis.md)-->
<!--        //   - [Linkis1.0 用户使用文档](User_Manual/Linkis1.0用户使用文档.md)-->
<!--        // - [Linkis1.0 管理台使用文档](User_Manual/Linkis_Console_User_Manual.md)-->

<!--        {-->
<!--            title: '用户手册',-->
<!--            link: '/docs/manual/UserManual',-->
<!--            children: [-->
<!--                {-->
<!--                    title: '用户使用文档',-->
<!--                    link: '/docs/manual/UserManual',-->
<!--                }, {-->
<!--                    title: '使用的几种方式',-->
<!--                    link: '/docs/manual/HowToUse',-->
<!--                }, {-->
<!--                    title: '管理台使用文档',-->
<!--                    link: '/docs/manual/ConsoleUserManual',-->
<!--                }, {-->
<!--                    title: 'Linkis-Cli使用文档',-->
<!--                    link: '/docs/manual/CliManual',-->
<!--                }]-->


<!--        },-->
<!--        {-->
<!--            title: '架构文档',-->
<!--            link: '/docs/architecture/DifferenceBetween1.0&0.x',-->
<!--            children: [-->
<!--                {-->
<!--                    title: 'Linkis1.0与Linkis0.X的区别简述',-->
<!--                    link: '/docs/architecture/DifferenceBetween1.0&0.x',-->
<!--                },-->
<!--                {-->
<!--                    title: 'Job提交准备执行流程',-->
<!--                    link: '/docs/architecture/JobSubmission',-->
<!--                }, {-->
<!--                    title: 'EngineConn新增流程',-->
<!--                    link: '/docs/architecture/AddEngineConn',-->
<!--                }]-->


<!--        }-->
<!--    ]-->
<!--</script>-->
