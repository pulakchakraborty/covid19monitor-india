import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
    background: transparent;
    border-radius: 4px;
    border: 2px solid #d14f69;
    color: #d14f69;
    width: 25%;
    height: 2.5rem;
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    opacity: 0.5;
    cursor: pointer;
    pointer-events: all;

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
    width: 100%;
    background: transparent;
    opacity: 1;

    @media (min-width: 768px) {
        width: 420px;
        right: auto;
        left: 15px;
        top: 50px;
        background: black;
        border-radius: 4px;
        opacity: 0.85;
    }

    @media (min-width: 1024px) {
        width: 420px;
        right: auto;
        left: 15px;
        top: 50px;
        background: black;
        border-radius: 4px;
        opacity: 0.85;
    }
`

const MapFilter = ({ isMapIndia }) => {
    const [ buttons, setButtons ] = useState({
        isIndiaActive: true,
        isWorldActive: false
    });

    useEffect(() => {
        if (buttons.isIndiaActive) {
            isMapIndia(true);
        } else {
            isMapIndia(false);
        }
    }, [buttons]);

    return(
        <Container>
            <Button
                onClick={() => setButtons({ isIndiaActive: true, isWorldActive: false })}
                isActive={buttons.isIndiaActive}>India
            </Button>
            <Button
                onClick={() => setButtons({ isIndiaActive: false, isWorldActive: true })}
                isActive={buttons.isWorldActive}>World
            </Button>
        </Container>
    );
};

export default MapFilter;
