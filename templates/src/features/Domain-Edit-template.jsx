
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { edited, save{{domainName}} } from "./domain-Slice";

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
        <div className="p-col-4">
          <label htmlFor="id">id</label>
          <InputText id="id" name="id" value={selected{{domainName}}.id}
            onChange={onEdit{{domainName}} } />
        </div>
        <div className="p-col-4">
          <label htmlFor="name">name</label>
          <InputText id="name" name="name" value={selected{{domainName}}.name}
            onChange={onEdit{{domainName}} } />
        </div>
        <div className="p-col-4">
          <label htmlFor="title">title</label>
          <InputText id="title" name="title" value={selected{{domainName}}.title}
            onChange={onEdit{{domainName}} } />
        </div>

        <Button id="saveButton" onClick={buttonEventHandler}>Save</Button>
      </form>
    </div>
  );
}

export default {{domainName}}Edit;
