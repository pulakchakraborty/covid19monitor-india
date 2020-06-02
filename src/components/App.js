import React, { Fragment, Suspense, lazy } from 'react';
import styled from 'styled-components';

//import WidgetWrapper from './WidgetWrapper';
//import Header from './Header';
import GlobalStyle, { PlaceholderText } from '../styles/global';
import Spinner from './Spinner';

const Header = lazy(() => import('./Header'));

const WidgetWrapper = lazy(() => import('./WidgetWrapper'));

const AppStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;

  @media (min-width: 768px) {
    overflow-y: none;
  }

  @media (min-width: 1024px) {
    overflow-y: none;
  }
`;

const AppPlaceholder = styled.div`
  position: fixed;
  display: flex;
  background: black;
  justify-content: center;
  opacity: 0.85;
  width: 100%;
  height: 100%;
`;
const renderLoader = () => (
  <AppPlaceholder>
    <Spinner />
  </AppPlaceholder>
);

const App = () => {
  return (
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
};

export default App;
