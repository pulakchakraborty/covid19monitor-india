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
    color: black;
    background-color: rgb(63, 59, 59);
    font-weight: 700;
`

const SwitchWrapper = ({ switchChart }) => {
    const [state, setState] = useState({
        checked: true,
      });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        switchChart(state.checked);
    }, [switchChart, state.checked]);

    return(
        <Styles>
            <FormGroup>
                <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Total Counts</Grid>
                <Grid item>
                    <Switch checked={state.checked} onChange={handleChange} name="checked" />
                </Grid>
                <Grid item>New Infections</Grid>
                </Grid>
            </FormGroup>
        </Styles>
    );
}

export default SwitchWrapper;
