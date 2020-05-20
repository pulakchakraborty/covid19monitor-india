import React from 'react';
import styled from 'styled-components';

import { getCurrentTimestamp } from '../helpers';

const Styles = styled.div`
.cases-highlights-wrapper {
    padding: 5px 15px;
    margin: 0 auto;
    padding-bottom: 5px !important;
}

.cases-highlights-header {
    margin-bottom: 5px;
    box-sizing: border-box;
}

.highlights-header-title {
    font-size: 1.3rem;
    font-weight: 400;
}

.highlights-header-timestamp {
    color: #b86b4a;
    background-color: #241f15;
    padding: 0 0.35em 0 0.25em;
    border-radius: 4px;
    margin-top: 0.25em;
    font-weight: 600;
    font-size: 0.9rem;
    display: inline-block;
}

.cases-highlights-stats {
    display: flex;
    justify-content: space-between;
    padding: 0.5em 0.25em 0.35em;

    .highlights-stats-confirmed {
        width: 32.5%;
        border-radius: 4px;
        font-family: 'Roboto Condensed', 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: center;
        /*background-color: rgba(209,79,105,0.2);
        color: #d14f69;*/
        background-color: rgba(255,7,58,0.1);
        color: #ff073a;
    }

    .highlights-stats-recovered {
        width: 32.5%;
        border-radius: 4px;
        font-family: 'Roboto Condensed', 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: center;
        /*background-color: rgba(129,255,202,0.3);
        color: #108d90;*/
        background-color: rgba(40,167,69,0.1);
        color: #28a745;
    }

    .highlights-stats-dead {
        width: 32.5%;
        border-radius: 4px;
        font-family: 'Roboto Condensed', 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: center;
        /*background-color: rgba(48,36,45,0.15);
        color: grey;*/
        background-color: rgb(63,59,59);
        color: black;
    }

}

.highlights-stats-number {
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: -0.02em;
}

.highlights-stats-type {
    font-size: 1rem;
    font-weight: 500;
}
`

const CasesHighlights = ({ summary, mapSummary }) => {
    const { confirmed, recovered, dead } = summary;
    return(
        <Styles>
            <div className="cases-highlights-wrapper">
                <div className="cases-highlights-header">
                    <div className="highlights-header-title">Coronavirus Cases in {mapSummary ? 'India' : 'the World'}</div>
                    <div className="highlights-header-timestamp">
                        <strong>As of:</strong> {getCurrentTimestamp()}
                    </div>
                </div>
                <div className="cases-highlights-stats">
                    <div className="highlights-stats-confirmed">
                        <div className="highlights-stats-number">{confirmed}</div>
                        <div className="highlights-stats-type">confirmed</div>
                    </div>
                    <div className="highlights-stats-recovered">
                        <div className="highlights-stats-number">{recovered}</div>
                        <div className="highlights-stats-type">recovered</div>
                    </div>
                    <div className="highlights-stats-dead">
                        <div className="highlights-stats-number">{dead}</div>
                        <div className="highlights-stats-type">dead</div>
                    </div>
                </div>
            </div>
        </Styles>
    );
};

export default CasesHighlights;
