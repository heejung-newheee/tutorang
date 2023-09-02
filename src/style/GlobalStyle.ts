import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`

${reset}
    *{
        box-sizing: border-box;
        font-family: 'Noto Sans KR'; 
    }    
    
    body{
        line-height: 1.4;
        font-family: 'Noto Sans KR', sans-serif;
    }
    
    body::-webkit-scrollbar, div::-webkit-scrollbar {
        width: 8px;
    }

    body::-webkit-scrollbar-track, 
    div::-webkit-scrollbar-track  {
        background-color: #eaeaea;
    }

    body::-webkit-scrollbar-thumb {
        background-color: #a1a1a1;
        border-radius: 5px;
    }
    div::-webkit-scrollbar-thumb {
        background-color: #fe902f4f;
        border-radius: 5px;
    }

    body::-webkit-scrollbar-thumb:hover, div::-webkit-scrollbar-thumb:hover {
        background-color: #aaa;
    }

    html, body, div, span, h1, h2, h3, h4, h5, h6, p,
    a, dl, dt, dd, ol, ul, li, form, label, table{
        font-family: 'Noto Sans KR'; 
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    a{
        text-decoration: none;
        cursor: pointer;
        &:hover {
            cursor: pointer;
        }
    }
    a:link, a:focus, a:active, a:visited, a:hover  {
        color: inherit
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
    
`;

export default GlobalStyles;
