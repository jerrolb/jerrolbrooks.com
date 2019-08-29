import React from 'react';
import { textQuery, hello } from './constants';
import { LINKS } from '../config/constants';

export const Api = () => {
    const callTextQuery = async () => {
        const text = document.getElementById('query').value;
        const result = await textQuery(text);
        const prettyResult = JSON.stringify(result, null, 2);
        document.getElementById('textQueryResponse').innerHTML = prettyResult;
    };

    const callHello = async () => {
        const result = await hello();
        document.getElementById('helloResponse').innerHTML = result;
    };

    const containerStyle = {
        textAlign: 'left',
        padding: '30px'
    };

    return (
        <div style={ containerStyle }>
            <p><strong>Making some simple RESTful API calls</strong>
                <ul>
                    <li><a href={ LINKS.API.HELLO } target={ '_blank' }>Hello</a></li>
                    <li><a href={ LINKS.API.TEXTQUERY_PASS } target={ '_blank' }>Success</a></li>
                    <li><a href={ LINKS.API.TEXTQUERY_FAIL } target={ '_blank' }>Fail</a></li>
                </ul>
            </p>
            <br />
            Query
            <input
                id="query"
                type="text"
            />
            <button onClick={ callTextQuery }>
                Submit
            </button>
            <p>Text query API call response:</p>
            <pre id="textQueryResponse">
                ...
            </pre>
            <br />

            <p>Hello API call response:
                <button onClick={ callHello }>
                    Submit
                </button>
            </p>
            <pre id="helloResponse">...</pre>
        </div>
    );
};

export default Api;
