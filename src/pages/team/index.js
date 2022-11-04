import React, { useState }  from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import config from "./config.json";
import Layout from '@theme/Layout';
import Contributors from '@site/src/components/Contributors';

export default function() {
    const isBrowser = useIsBrowser();

    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const dataSource = config?.[language];


    const sortToShowMentor = () =>{
          config.mentor.sort((a, b) =>{
            return a.publicName.localeCompare(b.publicName)
          })
          return  config.mentor.map((item, i) => (
               <tr>
                   <td align="left"><a href={'https://people.apache.org/committer-index.html#'+ item.apacheId} target="_blank" rel="noopener noreferrer">{item.apacheId}</a></td>
                   <td align="left">{item.githubId}</td>
                   <td align="left">{item.publicName}</td>
                </tr>
            ))
    }


    const sortToShowPPMC = () =>{
          config.ppmc.sort((a, b) =>{
            return a.publicName.localeCompare(b.publicName)
          })
          return  config.ppmc.map((item, i) => (
               <tr>
                   <td align="left"><a href={'https://people.apache.org/committer-index.html#'+ item.apacheId} target="_blank" rel="noopener noreferrer">{item.apacheId}</a></td>
                   <td align="left">{item.githubId}</td>
                   <td align="left">{item.publicName}</td>
                </tr>
            ))
    }


     const sortToShowCommitter = () =>{
          config.committer.sort((a, b) =>{
            return a.publicName.localeCompare(b.publicName)
          })

          return config.committer.map((item, i) => (
            <tr>
              <td align="left"><a href={'https://people.apache.org/committer-index.html#'+ item.apacheId} target="_blank" rel="noopener noreferrer">{item.apacheId}</a></td>
              <td align="left">{item.githubId}</td>
              <td align="left">{item.publicName}</td>
            </tr>
          ))
     }


    return (
     <Layout>
        <div className="ctn-block normal-page team-page">
        <h3 className="normal-title">Contributing</h3>
        <br/>
        <p className="normal-desc" dangerouslySetInnerHTML={{__html:dataSource.info.desc}}></p>
        <br></br>
        <h3 className="normal-title">PPMC({config.ppmc.length+config.mentor.length})</h3>
        <p className="normal-desc">{dataSource.info.tip}</p>

        <table>
           <thead>
              <tr>
                 <th align="left">Apache ID</th>
                 <th align="left">Github Username</th>
                 <th align="left">Public Name</th>
              </tr>
           </thead>
           <tbody>
           {
             sortToShowMentor()
            }

            {
             sortToShowPPMC()
            }
           </tbody>
        </table>

        <h3 className="normal-title">Committer({config.committer.length})</h3>
        <p className="normal-desc">{dataSource.info.tip}</p>

        <table>
           <thead>
              <tr>
                 <th align="left">Apache ID</th>
                 <th align="left">Github Username</th>
                 <th align="left">Public Name</th>
              </tr>
           </thead>
           <tbody>
              {
                 sortToShowCommitter()
              }
           </tbody>
        </table>

        <h3 className="normal-title">
          <a target="_blank" href="https://github.com/apache/incubator-linkis">Contributors of Apache Linkis</a>
        </h3>
        <Contributors repo="apache/incubator-linkis"/>

        <h3 className="normal-title">
         <a target="_blank" href="https://github.com/apache/incubator-linkis-website">Contributors of Apache Linkis WebSite</a>
         </h3>
        <Contributors repo="apache/incubator-linkis-website"/>

      </div>
      </Layout>
    );
}
