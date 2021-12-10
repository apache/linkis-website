import React, { useState }  from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import config from "./config.json";
import Layout from '@theme/Layout';
import './index.less';

export default function() {
    const isBrowser = useIsBrowser();

    const [p1Animation, setP1Animation] = useState(false);
    const [p2Animation, setP2Animation] = useState(false);

    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const dataSource = config?.[language];

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
                    <li className="character-item text-center">
                      <img className="character-avatar" src={item.avatarUrl} alt={item.name}/>
                      <div className="character-desc">
                        <h3 className="character-name">{item.name}</h3>
                      </div>
                    </li>
                </a>
              ))
          }
        </ul>
      </div>
      </Layout>
    );
}
