import React from "react";
import { TextField, Button, Grid, Container, Box, Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { edited, save{{domainName}} } from "./{{domainCamelCase}}Slice";

function {{domainName}}Edit() {
  const dispatch = useDispatch();

  const selected{{domainName}} = useSelector((state) => state.{{domainCamelCase}}.entity);

  function buttonEventHandler(event) {
    dispatch(save{{domainName}}(selected{{domainName}}));
    event.preventDefault();
  }

  function onEdit{{domainName}}(event) {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    dispatch(edited({ name, value: newValue }));
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4}>        
          <form>
            <Grid container spacing={2}>
            {{#each attributes}}
            <Grid item xs={12}>
              {{#if (eq this.dataType 'Boolean')}}
              <FormControlLabel
                control={
                  <Checkbox
                    id="{{this.attributeName}}"
                    name="{{this.attributeName}}"
                    value={selected{{../domainName}}.{{this.attributeName}} }
                    checked={selected{{../domainName}}.{{this.attributeName}} }
                    onChange={onEdit{{../domainName}} }
                  />
                }
                label="{{this.attributeName}}"
              />
              {{else}}
              <TextField
                id="{{this.attributeName}}"
                name="{{this.attributeName}}"
                label="{{this.attributeName}}"
                value={selected{{../domainName}}.{{this.attributeName}} }
                onChange={onEdit{{../domainName}} }
                fullWidth
                {{#if (eq attributeName ../idAttribute)}}
                disabled
                {{/if}}
              />
              {{/if}}
            </Grid>
            {{/each}}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={buttonEventHandler}>
                Save {{domainName}}
              </Button>
            </Grid>
            </Grid>
          </form>        
      </Box>
    </Container>

  );
}

export default {{domainName}}Edit;
