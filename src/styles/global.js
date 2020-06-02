import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #root {
        width: 100%;
        height: 100%;
    }

    body {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    /* Tooltip code */
    .mapboxgl-popup {
        font-size: 10px;
        padding: 0;
        margin: 0;
        color: #424242;
    }

    .mapboxgl-popup-content {
        padding: 1rem;
        margin: 0;

        > * {
        margin: 0 0 0.5rem;
        padding: 0;
        }

        p {
            border-bottom: 1px solid rgba(black, 0.2);

            b {
                font-size: 1.3rem;
                color: #212121;
                padding: 0 5px;
            }
        }

        img {
            width: 2rem;
            height: 2rem;
        }
    }

`;

export const PlaceholderText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #d14f69;
  justify-content: center;
  text-align: center;
  top: 50%;
  position: relative;
`;

export default GlobalStyle;
