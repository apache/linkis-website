import  systemConfiguration from "../../js/config"
const data = {
    info: {
        desc: "使用下方列表中的链接下载所需要的Apache Linkis (Incubating) 版本。 可以在 <a class=\"link\" href=\""+systemConfiguration.github.projectReleaseUrl+"\">Github发布页</a>查看所有的历史发布版本</p>"
    },
    list: [
        {
            "version":"1.0.2",
            "releaseDate":"2021-09-02",
            "releaseDesc":"This release mainly introduces Flink-support into Linkis ecosystem.",
            "newFeatures":"6",
            "enhancement":"5",
            "bugFixs":"5",
            "changeLogUrl":"https://github.com/apache/incubator-linkis/releases/tag/1.0.2",
            "downloadUrl":"https://github.com/apache/incubator-linkis/archive/refs/tags/1.0.2.zip"
        }
    ]
}
export default data
