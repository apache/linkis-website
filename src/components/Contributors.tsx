import React, { useState, useEffect } from 'react';

export default (props) => {
    const [contributers, setContributers] = useState([]);
    useEffect(() => {
        const repo = props.repo ?? 'apache/incubator-linkis';

        if (!contributers || contributers.length === 0) {
            fetch(`https://api.github.com/repos/${repo}/contributors?page=1&per_page=10000`).then(function (response) {
                return response.json();
            }).then((res) => {
                setContributers(res);
            });
        }
    });
    let html = '<table>';
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
    html += '</table>';
    return <div style={{width:'1300px'}} dangerouslySetInnerHTML={{ __html: html }}/>;
}
