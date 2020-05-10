import React from 'react';
import { getCurrentTimestamp } from '../helpers';
import '../styles/CasesHighlights.scss';

const CasesHighlights = (props) => {
    const { total, discharged, deaths } = props.summary;
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
                    <div className="highlights-stats-number">{total}</div>
                    <div className="highlights-stats-type">confirmed</div>
                </div>
                <div className="highlights-stats-recovered">
                    <div className="highlights-stats-number">{discharged}</div>
                    <div className="highlights-stats-type">recovered</div>
                </div>
                <div className="highlights-stats-dead">
                    <div className="highlights-stats-number">{deaths}</div>
                    <div className="highlights-stats-type">dead</div>
                </div>
            </div>
        </div>
    );
};

export default CasesHighlights;
