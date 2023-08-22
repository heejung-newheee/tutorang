import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`

${reset}
    // 적용시킬 css 입력
    *{
        box-sizing: border-box;
    }    
    body{
        line-height: 1.4;
        font-family: 'Noto Sans KR', sans-serif;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p,
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    a{
        text-decoration: none;
        color: inherit;
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
