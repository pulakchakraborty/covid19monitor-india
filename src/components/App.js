import React, { Fragment } from 'react';
import styled from 'styled-components';

import WidgetWrapper from './WidgetWrapper';
import Header from './Header';
import GlobalStyle from '../styles/global';

const AppStyle = styled.div`
    width: 100%;
    height: 100%;
    position: sticky;
    overflow-y: scroll;

    @media (min-width: 768px) {
        overflow-y: none;
    }

    @media (min-width: 1024px) {
        overflow-y: none;
    }
`

const App = () => {
    return(
        <Fragment>
            <GlobalStyle />
            <AppStyle>
                <Header />
                <WidgetWrapper />
            </AppStyle>
        </Fragment>
    );
}

export default App;
