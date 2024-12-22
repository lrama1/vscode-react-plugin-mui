
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
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
    <div className="p-grid">
      <form>
        {{#each attributes}}
        <div className="p-col-4">
            <label htmlFor="{{this.attributeName}}">{{this.attributeName}}</label>
            <InputText id="{{this.attributeName}}" name="{{this.attributeName}}" value={selected{{../domainName}}.{{this.attributeName}} }
              onChange={onEdit{{../domainName}} } />
          </div>
        {{/each}}

        <Button id="saveButton" onClick={buttonEventHandler}>Save</Button>
      </form>
    </div>
  );
}

export default {{domainName}}Edit;
