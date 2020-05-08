import React from 'react';

import SidePanel from './SidePanel';
import CoronaMap from './CoronaMap';
import '../styles/App.scss';

const App = () => {
    return(
        <div className="App">
            <CoronaMap />
            <SidePanel />
        </div>
    );
}

export default App;
