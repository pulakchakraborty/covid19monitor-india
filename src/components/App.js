import React from 'react';

import SidePanel from './SidePanel';
import CoronaMap from './CoronaMap';
import '../styles/App.scss';
import Header from './Header';

const App = () => {
    return(
        <div className="App">
            <Header />
            <CoronaMap />
            <SidePanel />
        </div>
    );
}

export default App;
