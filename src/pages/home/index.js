import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import config from './config';
import systemConfiguration from '../../js/sysConfig';

export default function() {
  const isBrowser = useIsBrowser();

  const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
  const dataSource = config?.[language];

  let _paq = [];
  isBrowser && (window._paq = []);
  isBrowser && (_paq = window._paq);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://apachelinkis.matomo.cloud/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d = isBrowser && document;
    var g = isBrowser && d.createElement('script'), s = isBrowser && d.getElementsByTagName('script')[0];
    isBrowser && (g.async=true); 
    isBrowser && (g.src='//cdn.matomo.cloud/apachelinkis.matomo.cloud/matomo.js'); 
    isBrowser && (s.parentNode.insertBefore(g,s));
  })();

  return (
   <div>
     <div className="home-page slogan">
       <div className="ctn-block">
         <div className="banner text-center">
           <h1 className="home-title"><span className="apache">Apache</span> <span className="linkis">Linkis</span> <span className="badge">Incubating</span></h1>
           <p className="home-desc">{dataSource.home.banner.slogan}</p>
           <div className="botton-row center">
              {
                 language === 'en' &&  <a href="/docs/latest/deployment/quick-deploy" className="corner-botton blue-fill">{dataSource.common.getStart}</a>
              }
              {
                 language === 'zh-CN' &&<a href="/zh-CN/docs/latest/deployment/quick-deploy" className="corner-botton blue-fill">{dataSource.common.getStart}</a>
              }
             <a href={systemConfiguration.github.projectUrl}  target="_blank"  className="corner-botton blue">
             <img className="button-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABkvfSiAAAE2klEQVRIDa1WSyykWRQ+qrwf8YzQ3iTKWyrxmoWoWJHMoqIRKWErs7AYk1jIWDS9YCdshQWxQMsIYUE6Wm1qiJAIimjSqPaI8hrEu+Z8d9xKVak2mDnJrfvXueee79zzuteFXkApKSlqNzc3rYuLSz6PCN7y7nHbd4vFYrq/v9fz+GN5eXn+39S5PCeQmppaykAfGUT1nJxcY9BVHr8vLS0NSp7j7BQwIyMjjgX7FApFHoM57nn2P5+Y7u7uDN7e3rqZmZlNR+En2tRqdQELfXp4eAiGsASUM3hQCnLkST7W2Fizq6vr+9nZ2S/4L0kpPzA/gk2wsG9iYiJ5eXnR1dUVMbgYUhZAGOBLEPz39fWlmJgY8vHxodPTU29eq4yLi5ve2dn5Zt0rP3JycuJub29ncTJsampqgpW0uLhI/f39tLu7SxxP8vPzI3aXADs/P6eLiwsBymGgkpISio+Pp/X1daqvrxfyHFMz68seGRkR7nWVgJeXl32sMJj9TwkJCaRSqcjT05PS0tIoPT2dVldXKTo6moKCgkipVAoQNpD29vbIbDZTbm4uRUQggUl4BqeEd1g2+OvXr33M/glrAvAxG/PAgIvc3d3tXAVAANvGDLIgGIY9jmvwxvX1tZDhWOZpNJrSqampQQU4bMVHscI/2Mj+J1hvS44Kn1vDyTAkwSP7+/sCQ5GVlaVmhqgzWArLuNDFLDe8doY7MzMz7RKN9aqqq6vVCg6qVipE/CIjI0mr1Yo4SP5r5/DwcKqoqCB2pRUUp1xZWdEq+FT5UiEAOY2twZf8t8woKwBDp6Sbm5t8Bcfmn9RiLsogNDRUzFLorXNAQAAFBgZakw96gIWkkY1Y6EYx/x/EobK600bfO5GlkgGwk5MTZ4JS5MUzGgIaA7xmQxbE8LtkYBGFjLL4r3RwcECHh4d2gIy1C3iTVI6SWFtbI4PBIFlvmlHw4+PjdHZ2JroSlKDkPDw8TAoG0UutKG7OJOrt7SXu8pL9qhmxGxoaosnJSSsYFICfnJysVxYXF59ub2/XwJ0hISHCBSaTiTBQR2FhYbDsRaBbW1s0MDAgBlxqGz8chGvzV3Efcq80snIVijUqKooGBwdpc3NTNAHUE1smeiZ3JdHQbdER87m5OXFD8E1P3Kjp+PjYVkTUIpfJql6vTxL3YUFBwR5fP+UIMpq0RqMhbAYorIZCNPTCwsInTRrZ2NLSQqxMeIVvHQEmey9ih+JnT/4yPT29LAD58bPMV0/R0dFRJDK0qKhItDYYgJaEi7WyslJ0ITvT+Q/uRhiE6wsgckg5lFpsbKyhs7PzN/Cs9yG7U9fT0zNrNBqD5+fnRT9FE4d7kHVwpzNCnNDCnBFOx43cXFtbqxsdHRUi1ifGxMTEiU6n+3NjY6OShxIlIu9BJBNaFZLIGfFjiRYWFuzcDTDWcVtTU/NzWVnZgtz35BHV2NhYMDw8/ImFg/39/eUzgTo6OigpKUnus5vb29upu7tbAMqYcRjMdXV178vLy+0eUXZ9B1qam5u/VFVVZfPbxYB3DLIQsURa/4gAAkJy4OLmzDY0NDRkO4L9aL+V39raWsqZaeRnhIUfU6zXObW1tVn49BZ2nbGrq6vUquCtH2NjY2rO3g8M95nHKo+/Hge+P3PtfYDMS/T/DaQGbM8QvzFuAAAAAElFTkSuQmCC" alt="github"/><span>GitHub</span></a>
           </div>
         </div>
       </div>
     </div>
     <div className="home-page introduce">
       <div className="ctn-block">
         <h1 className="home-block-title text-center">{dataSource.home.introduce.title}</h1>
         <div className="concept home-block">
           <div className="concept-item before">
             <h3 className="concept-title">{dataSource.home.introduce.before}</h3>
             <div className="concept-ctn">
               <p className="home-paragraph">{dataSource.home.introduce.beforeText}</p>
               <div className="before-image">
                 {
                    language === 'en' && <img src={useBaseUrl('/home/before_linkis_en.png')} alt="before" className="concept-image"/>
                 }
                 {
                    language === 'zh-CN' && <img src={useBaseUrl('/home/before_linkis_zh.png')} alt="before" className="concept-image"/>
                 }
               </div>
             </div>
           </div>
           <div className="concept-item after">
             <h3 className="concept-title">{dataSource.home.introduce.after}</h3>
             <div className="concept-ctn">
               <p className="home-paragraph">{dataSource.home.introduce.afterText}</p>
                 {
                   language === 'en' && <img src={useBaseUrl('/home/after_linkis_en.png')} alt="before" className="concept-image"/>
                 }
                 {
                   language === 'zh-CN' &&<img src={useBaseUrl('/home/after_linkis_zh.png')} alt="before" className="concept-image"/>
                 }

             </div>
           </div>
         </div>
       </div>
     </div>
     <div className="home-page">
      <div className="ctn-block description">
        <h1 className="home-block-title text-center">{dataSource.common.description}</h1>
        <div className="home-block" style={{position:'relative'}}>
            <div className="top-desc">
              <h3 className="home-paragraph-title">{dataSource.home.description.standardizedInterfaces}</h3>
              <p className="home-paragraph">{dataSource.home.description.paragraph1}</p>
            </div>
            <div className="bold-dot" style={{top: '64px', left:'416px'}}></div>
            <div className="bold-dot" style={{top: '728px',left:'240px'}}></div>
            <img src={useBaseUrl('/home/description.png')} alt="description" className="description-image"/>
            <svg width="860" height="860" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="49.8" className="dotted" />
            </svg>
            <div className="top-desc">
              <h3 className="home-paragraph-title">{dataSource.home.description.computationGovernance}</h3>
              <p className="home-paragraph">{dataSource.home.description.paragraph2}</p>
            </div>
            <div className="botton-row center">

                {
                   language === 'en' && <a href="/docs/latest/introduction" className="corner-botton blue-fill">{dataSource.common.learnMore}</a>
                }
                {
                   language === 'zh-CN' && <a href="/zh-CN/docs/latest/introduction" className="corner-botton blue-fill">{dataSource.common.learnMore}</a>
                }
            </div>
        </div>
      </div>
    </div>
    <div className="home-page feature">
      <div className="ctn-block">
        <h1 className="home-block-title text-center">{dataSource.common.coreFeatures}</h1>
        <div className="features home-block text-center">
          <div className="feature-item connectivity">
            <h3 className="item-title">{dataSource.common.connectivity}</h3>
            <p className="item-desc">{dataSource.home.core.connectivity}</p>
          </div>
          <div className="feature-item scalability">
            <h3 className="item-title">{dataSource.common.scalability}</h3>
            <p className="item-desc">{dataSource.home.core.scalability}</p>
          </div>
          <div className="feature-item controllability">
            <h3 className="item-title">{dataSource.common.controllability}</h3>
            <p className="item-desc">{dataSource.home.core.controllability}</p>
          </div>
          <div className="feature-item orchestration">
            <h3 className="item-title">{dataSource.common.orchestration}</h3>
            <p className="item-desc">{dataSource.home.core.orchestration}</p>
          </div>
          <div className="feature-item reusability">
            <h3 className="item-title">{dataSource.common.reusability}</h3>
            <p className="item-desc">{dataSource.home.core.reusability}</p>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}
