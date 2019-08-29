const API_URL = 'https://us-central1-brook-tech.cloudfunctions.net';
const TEXT_QUERY = '/textQuery';
const HELLO = '/hello';

export async function textQuery (text) {
    const request = await fetch(`${ API_URL }${ TEXT_QUERY }?text=${ text }`, {
        method: 'POST',
        mode: 'cors'
    });
    return await request.json();
}

export async function hello () {
    const request = await fetch(`${ API_URL }${ HELLO }`, {
        method: 'POST',
        mode: 'cors'
    });
    return await request.text();
}
