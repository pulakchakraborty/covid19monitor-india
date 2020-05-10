import React from 'react';
import { getCurrentTimestamp } from '../helpers';
import '../styles/CasesHighlights.scss';

const CasesHighlights = () => {
    return(
        <div className="cases-highlights-wrapper">
            <div className="cases-highlights-header">
                <div className="highlights-header-title">Coronavirus Cases in India</div>
                <div className="highlights-header-timestamp">
                    <strong>As of:</strong> {getCurrentTimestamp()}
                </div>
            </div>
            <div className="cases-highlights-stats">
                <div className="highlights-stats-confirmed">
                    <div className="highlights-stats-number">1000000</div>
                    <div className="highlights-stats-type">confirmed</div>
                </div>
                <div className="highlights-stats-recovered">
                    <div className="highlights-stats-number">500000</div>
                    <div className="highlights-stats-type">recovered</div>
                </div>
                <div className="highlights-stats-dead">
                    <div className="highlights-stats-number">100000</div>
                    <div className="highlights-stats-type">dead</div>
                </div>
            </div>
        </div>
    );
};

export default CasesHighlights;
