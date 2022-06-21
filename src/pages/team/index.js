import React, { useState }  from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import config from "./config.json";
import Layout from '@theme/Layout';
import Contributors from '@site/src/components/Contributors';

export default function() {
    const isBrowser = useIsBrowser();

    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const dataSource = config?.[language];

    const sortToShowCommitter = () =>{
      dataSource.committer.sort((a, b) =>{
        return a.name.localeCompare(b.name)
      })

      return dataSource.committer.map((item, i) => (
        <a href={'https://github.com/'+ item.githubId} key={i} target="_blank">
            <li className="character-item text-center" style={{'listStyle':'none', lineHeight: '42px', padding: 0}}>
              <div className="character-desc">
                <h3 className="character-name" style={{margin: 0, padding: '20px'}}>{item.name}</h3>
              </div>
            </li>
        </a>
      ))
    }

    return (
     <Layout>
        <div className="ctn-block normal-page team-page">
        <h3 className="normal-title">Contributing</h3>
        <br/>
        <p className="normal-desc" dangerouslySetInnerHTML={{__html:dataSource.info.desc}}></p>
        <br></br>
        <h3 className="normal-title">PPMC</h3>
        <p className="normal-desc">{dataSource.info.tip}</p>
        <ul  className="character-list">
          {
              dataSource.list.map((item, i) => (
                <a href={'https://github.com/'+ item.githubId} key={i} target="_blank">
                    <li className="character-item text-center" style={{'listStyle':'none'}}>
                      <img className="character-avatar" src={item.avatarUrl} alt={item.name}/>
                      <div className="character-desc">
                        <h3 className="character-name">{item.name}</h3>
                      </div>
                    </li>
                </a>
              ))
          }
        </ul>
        <h3 className="normal-title">Committer</h3>
        <p className="normal-desc">{dataSource.info.committerTip}</p>
        <ul  className="character-list">
          {
              sortToShowCommitter()
          }
        </ul>
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
