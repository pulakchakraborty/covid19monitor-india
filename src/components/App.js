import React, { Fragment } from 'react';
import styled from 'styled-components';

import WidgetWrapper from './WidgetWrapper';
//import '../styles/App.scss';
import Header from './Header';
import GlobalStyle from '../styles/global';

const AppStyle = styled.div`
    width: 100%;
    height: 100%;
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
