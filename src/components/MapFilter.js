import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
    background: transparent;
    border-radius: 4px;
    border: 2px solid #d14f69;
    color: #d14f69;
    width: 50%;
    height: 2.5rem;
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    opacity: 0.5;
    cursor: pointer;
    pointer-events: all;
    margin: 0.35em 0.25em 0.35em;

    @media (min-width: 768px) {
        width: 33%;
    }

    @media (min-width: 1024px) {
        width: 33%;
    }

    /* "down" effect on click */
    &:active {
        transform: translateY(1px);
        filter: saturate(150%);
    }

    /* inverse colors on mouse-over */
    &:hover,
    &:focus {
        color: #e63c5e;
        border-color: #e63c5e;
        background: rgba(209,79,105,0.2);
        opacity: 1;
    }

    ${props => props.isActive && css`
        background: rgba(209,79,105,0.2);
        color: #d14f69;
        opacity: 1;
    `}
`
const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 0.5em 0.25em 0.35em;
    position: fixed;
    top: 50px;
    width: 50%;
    margin-right: 25%;
    margin-left: 25%;
    background: #191919;
    opacity: 1;
    border-radius: 4px;

    @media (min-width: 768px) {
        margin: 0 auto;
        width: 420px;
        right: auto;
        left: 15px;
        top: 50px;
        background: #121212;
        border-radius: 4px 4px 0 0;
    }

    @media (min-width: 1024px) {
        margin: 0 auto;
        width: 420px;
        right: auto;
        left: 15px;
        top: 50px;
        background: #121212;
        border-radius: 4px 4px 0 0;
    }
`

const MapFilter = ({ mapIsIndia, setMapIsIndia }) => {
    return(
        <Container>
            <Button
                onClick={() => setMapIsIndia(true)}
                isActive={mapIsIndia}>India
            </Button>
            <Button
                onClick={() => setMapIsIndia(false)}
                isActive={!mapIsIndia}>World
            </Button>
        </Container>
    );
};

export default MapFilter;
