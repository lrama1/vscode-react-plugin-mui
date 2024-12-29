
import React from "react";
import { TextField, Button, Grid, Container, Box } from "@mui/material";
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
    const { name, value } = event.target;
    dispatch(edited({ name, value }));
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4}>        
          <form>
            <Grid container spacing={2}>
            {{#each attributes}}
            <Grid item xs={12}>
              <TextField
                id="{{this.attributeName}}"
                name="{{this.attributeName}}"
                label="{{this.attributeName}}"
                value={selected{{../domainName}}.{{this.attributeName}} }
                onChange={onEdit{{../domainName}} }
                fullWidth
              />
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
