import React, { useState, useEffect } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import contributors from "./contributors.json";
import contributorsWebSite from "./contributors-website.json";



export default (props) => {
    const [contributers, setContributers] = useState([]);

    useEffect(() => {
       const repo = props.repo ?? 'apache/incubator-linkis';

 /*      if (!contributers || contributers.length === 0) {
                    fetch(`https://api.github.com/repos/${repo}/contributors?page=1&per_page=10000`)
                    .then(function (response) {
                        return response.json();
                    }).then((res) => {
                        setContributers(res);
                    }).catch((response) => {
                        //use local contributors data
                        console.log(contributors)
                        if(repo=="apache/incubator-linkis-website")
                         setContributers(contributorsWebSite)
                        else
                         setContributers(contributors)
                    });
        }
*/
      if(repo=="apache/incubator-linkis-website")
        setContributers(contributorsWebSite)
      else
        setContributers(contributors)

    });
    /*let html = '<table>';
    if (contributers && Array.isArray(contributers)) {
        contributers.forEach((c, i) => {
            if (i % 7 === 0) {
                if (i > 0) {
                    html += '</tr>';
                }
                html += '<tr>';
            }
            html += `<td>
                        <a href="${c.html_url}" target="_blank">
                            <img src="${c.avatar_url}" height="20" /> 
                            <span style={{ whiteSpace: 'nowrap' }}>@${c.login}</span>
                        </a>
                    </td>`;
            if (i === contributers.length - 1) {
                html += '</tr>';
            }
        });
    }
    html += '</table>';*/
    let element_arr = [];
    let new_contributers = [];
    let row = useIsBrowser() && Math.floor(window.innerWidth / 200);
    contributers.forEach((item, index) => {
        if((index + 1) % row === 0){
            element_arr.push(item);
            new_contributers.push([...element_arr]);
            element_arr = [];
        } else {
            element_arr.push(item);
        }
    })
    new_contributers.push([...element_arr]);
    return (
        <table>
            {new_contributers.map((item, index) => {

                return (
                    <tr>
                        {item.map((curv, i) => {
                            return (
                                <td>
                                    <a href={`${curv.html_url}`} target="_blank">
                                        <img src={`${curv.avatar_url}`} height="20" /> 
                                        <span style={{ whiteSpace: 'nowrap' }}>{curv.login}</span>
                                    </a>
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        
        </table>
    )
    /*return <div style={{width:'1300px'}} dangerouslySetInnerHTML={{ __html: html }}/>;*/

}


