import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import etc from '../img/etc.jpeg';
import { LINKS } from '../config/constants';

const markdownWithHtml = `<h2 style="text-align: center">About</h2>\n\nWelcome to my coding playground. This website is an outlet for learning and experimenting with different technologies. It's also a way to showcase my programming skills, or lack thereof. Your results may vary. If you have any thoughts, suggestions, criticisms, email me at <a href="mailto: jerrolb@gmail.com">jerrolb@gmail.com</a>. View source code on <a href="${ LINKS.GITHUB }" target="_blank">GitHub</a>.\n<hr style="width: 80%; color: lightgray;">\n<h2 style="text-align: center">Info</h2>\n\n* Bootstrapped with \`create-react-app\`\n* State managed and persisted across sessions with \`Redux\`\n* Designed with \`AntD\`\n\n<hr style="width: 80%; color: lightgray;"><h2 style="text-align: center">Links</h2>\n\n* <a href="${ LINKS.REACT }" target="_blank">React</a>\n* <a href="${ LINKS.REDUX }" target="_blank">Redux</a>\n* <a href="${ LINKS.ANTD }" target="_blank">Ant Design</a>\n\n<hr style="width: 80%; color: lightgray;"><h2 style="text-align: center">TODO\n\n* &bull;User authentication\n* &bull;Express API calls\n* &bull;Chess app\n* &bull;Tic-Tac-Toe character selection\n* &bull;File conversions\n* &bull;C++ integration\n<p style="text-align: center; margin-top: 20px;"><img src=${ etc } alt="etc..." width="250px" height="250px"></p>
`;

const containerStyles = {
    width: '50%',
    padding: '60px',
    fontSize: 'larger',
    textAlign: 'left'
};

const About = () => {
    return (
        <div id="container" style={ containerStyles }>
            <div id="about">
                <ReactMarkdown source={ markdownWithHtml } escapeHtml={ false } />
            </div>
        </div>
    );
};

export default About;
