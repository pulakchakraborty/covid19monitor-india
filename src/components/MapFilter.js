import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
background: transparent;
    border-radius: 4px;
    border: 2px solid #d14f69;
    color: #d14f69;
    /*margin: 0.5em 1em;*/
    /*padding: 0.25em 1em;*/
    width: 25%;
    height: 2.5rem;
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    opacity: 0.5;
    cursor: pointer;
    pointer-events: all;

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
