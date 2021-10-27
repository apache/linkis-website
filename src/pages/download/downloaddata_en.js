import  systemConfiguration from "../../js/config"
const data = {
    info: {
        desc: "Use the links below to download the Apache Linkis (Incubating) Releases. See all Linkis releases in <a class=\"desc-link\" href=\""+systemConfiguration.github.projectReleaseUrl+"\">Github release page</a></p>"
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
