import React from 'react';

import '../styles/SidePanel.scss';
import CasesHighlights from './CasesHighlights';

const SidePanel = () => {
    return(
        <div className="side-panel">
            <CasesHighlights />
        </div>
    );
}

export default SidePanel;
