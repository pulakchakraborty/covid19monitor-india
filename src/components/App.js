import React, { Fragment, Suspense, lazy } from 'react';
import styled from 'styled-components';

//import WidgetWrapper from './WidgetWrapper';
//import Header from './Header';
import GlobalStyle, { PlaceholderText } from '../styles/global';

const Header = lazy(() =>
    import('./Header')
);

const WidgetWrapper = lazy(() =>
    import('./WidgetWrapper')
);

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

const AppPlaceholder = styled.div`
    position: fixed;
    background: black;
    color: #d14f69;
    justify-content: center;
    opacity: 0.85;
    width: 100%;
    height: 100%;
`

/*const PlaceholderText = styled.div`
    position: fixed;
    top: 50%;
    left: 48%;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
`
*/
const renderLoader = () => <AppPlaceholder><PlaceholderText>Loading...</PlaceholderText></AppPlaceholder>;

const App = () => {
    return(
        <Fragment>
            <GlobalStyle />
            <AppStyle>
                <Suspense fallback={renderLoader()}>
                    <Header />
                    <WidgetWrapper />
                </Suspense>
            </AppStyle>
        </Fragment>
    );
}

export default App;
