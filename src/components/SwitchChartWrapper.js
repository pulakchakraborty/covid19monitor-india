import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const Styles = styled.div`
    font-size: 0.9rem;
    margin-bottom: 0;
    padding: 0.1em 15px;
    display: flex;
    justify-content: center;
    color: #808080;
    background: #191919;
    font-weight: 700;
`

const SwitchChartWrapper = ({ newInfectionsChart, setNewInfectionsChart }) => {

    return(
        <Styles>
            <FormGroup>
                <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Total</Grid>
                <Grid item>
                    <Switch
                        checked={newInfectionsChart}
                        onChange={() => setNewInfectionsChart(newInfectionsChart => !newInfectionsChart)}
                    />
                </Grid>
                <Grid item>Cumulative</Grid>
                </Grid>
            </FormGroup>
        </Styles>
    );
}

export default SwitchChartWrapper;
