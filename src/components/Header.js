import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';

const Styles = styled.div`
    .header {
        margin: 10px;
        background: transparent;
        position: absolute;
        z-index: 1000;
        height: 32px;
        width: 100%;
        pointer-events: none;
        display: flex;
        padding: 8px 8px 8px 13px;

        .header-headline {
            margin-left: auto;
            display: inline-block;
            position: relative;
            color: #d14f69;
            font-size: 1.3rem;
            font-weight: 600;
      }

        .header-social {
            margin-left: auto;
            margin-right: 10%;
            padding-left: 8px;
            cursor: pointer;
            pointer-events: all;
        }

        .header-link {
            color: #d14f69;
        }

    }
`

const Header = () => {
    return(
        <Styles>
            <div className="header">
                <div className="header-headline">
                    India Coronavirus Monitor
                </div>
                <div className="header-social">
                    <a href="https://github.com/pulakchakraborty/c19-india-map"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Github"
                        className="header-link">
                            <GitHubIcon />
                    </a>
                </div>
            </div>
        </Styles>
    );
};

export default Header;
