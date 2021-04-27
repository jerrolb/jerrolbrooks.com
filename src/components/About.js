import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { LINKS, WIDTHS } from '../config/constants';

const markdownWithHtml = `<hr style="width: 95%; color: lightgray;"><h2 style="text-align: center">Info</h2>\n\n* Bootstrapped with \`create-react-app\`\n* State managed and persisted across sessions with \`Redux\`\n* Designed with \`AntD\`\n* Chess Engine: \`Bluefever Software\`\n\n<hr style="width: 95%; color: lightgray;"><h2 style="text-align: center">Links</h2>\n\n* <a href="${ LINKS.REACT }" target="_blank">React</a>\n* <a href="${ LINKS.REDUX }" target="_blank">Redux</a>\n* <a href="${ LINKS.ANTD }" target="_blank">Ant Design</a>\n* <a href="${ LINKS.BLUEFEVER }" target="_blank">Bluefever Software</a>\n\n<hr style="width: 95%; color: lightgray;">
`;

const checkWidth = () => {
    if (window.innerWidth < WIDTHS.md) {
        return '95%';
    } else if (
        window.innerWidth > WIDTHS.md
        && window.innerWidth < WIDTHS.xl
    ) {
        return '75%';
    } else {
        return '55%';
    }
};

const containerStyles = {
    width: checkWidth(),
    margin: '0 auto',
    padding: '45px',
    fontSize: 'larger',
    textAlign: 'left'
};

window.addEventListener('resize', () => {
    if (document.getElementById('aboutContainer')) {
        document.getElementById('aboutContainer').style.width = checkWidth();
    }
});

const About = () => {
    return (
        <div id="aboutContainer" style={ containerStyles }>
            <div id="about">
                <ReactMarkdown source={ markdownWithHtml } escapeHtml={ false } />
            </div>
        </div>
    );
};

export default About;
