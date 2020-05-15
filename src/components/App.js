import React from 'react';

import WidgetWrapper from './WidgetWrapper';
import '../styles/App.scss';
import Header from './Header';

const App = () => {
    return(
        <div className="App">
            <Header />
            <WidgetWrapper />
        </div>
    );
}

export default App;
