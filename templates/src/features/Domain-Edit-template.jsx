
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { edited, saveDriver } from "./domain-Slice";

function DriverEdit() {
  const dispatch = useDispatch();

  const selectedDriver = useSelector((state) => state.driver.entity);

  function buttonEventHandler(event) {
    dispatch(saveDriver(selectedDriver));
    event.preventDefault();
  }

  function onEditDriver(event) {
    const { name, value } = event.target;
    dispatch(edited({ name, value }));
  }

  return (
    <div className="p-grid">
      <form>
        <div className="p-col-4">
          <label htmlFor="id">id</label>
          <InputText id="id" name="id" value={selectedDriver.id}
            onChange={onEditDriver} />
        </div>
        <div className="p-col-4">
          <label htmlFor="name">name</label>
          <InputText id="name" name="name" value={selectedDriver.name}
            onChange={onEditDriver} />
        </div>
        <div className="p-col-4">
          <label htmlFor="title">title</label>
          <InputText id="title" name="title" value={selectedDriver.title}
            onChange={onEditDriver} />
        </div>

        <Button id="saveButton" onClick={buttonEventHandler}>Save</Button>
      </form>
    </div>
  );
}

export default DriverEdit;
