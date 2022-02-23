import React, { useState }  from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import config from './config';
import img from './img';
import Layout from '@theme/Layout';

export default function() {
  const isBrowser = useIsBrowser();

  const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
  const dataSource = config?.[language];

  return (
  <Layout>
   <div>
     <div className="home-page" style={{padding:"10px 0 30px"}}>
       <div className="ctn-block">
         <h1 className="home-block-title text-center" style={{'marginBottom':"5px"}}>{dataSource.common.ourUsers}</h1>
         <div  style={{'fontSize':'18px','textAlign': 'center'}} dangerouslySetInnerHTML={{__html:dataSource.common.tip}}>
           {/* 下列公司已经在使用Linkis
           <br/>如果你也在使用?
           <a href="https://github.com/apache/incubator-linkis-website/edit/dev/src/pages/user/data.json" target="_blank" rel="noopener">
             <u>可以在这里添加</u>
           </a> */}
           {/* {dataSource.common.tip} */}
         </div>
         <div className="show-case home-block">
            {
              img.map((item, i) => (
               <div  key={i} index={i} className="case-item"><img src={useBaseUrl('/home/user/'+item.url)} alt="name"/></div>
              ))
           }
         </div>
       </div>
     </div>
   </div>
   </Layout>
  );
}
