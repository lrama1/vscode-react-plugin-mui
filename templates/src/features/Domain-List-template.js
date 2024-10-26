
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { fetchDrivers, pageChanged, sorted } from "./driversSlice";
import { fetchDriver } from "./driverSlice";
import { useHistory } from "react-router-dom";

function DriverList() {
  const dispatch = useDispatch();

  const {
    entities: drivers,
    perPage,
    first,
    totalRecords,
    page,
    sortField,
    sortOrder,
  } = useSelector((state) => state.drivers);

  const history = useHistory();

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  function onDriversChangePage({ first, rows, page }) {
    dispatch(pageChanged({ first, rows, page }));
    dispatch(fetchDrivers());
  }

  function onSort({ sortField, sortOrder }) {
    dispatch(sorted({ sortField, sortOrder }));
    dispatch(fetchDrivers());
  }

  function buttonClicked(event) {
    const id = event.target.value;
    dispatch(fetchDriver("driver/" + id));
    history.push({ pathname: "/driver" });
  }

  function actionTemplate(rowData, column) {
    return (
      <Button
        id={rowData.id}
        value={rowData.id}
        onClick={buttonClicked}
      >
        Edit
      </Button>
    );
  }
  return (
    <div className="layout-dashboard">
      <div>
        <Button>Add New</Button>
      </div>
      <DataTable className="p-datatable-products" first={first}
        paginator={true} value={drivers}
        lazy={true} rows={10}
        totalRecords={totalRecords}
        onPage={onDriversChangePage}
        selectionMode="single"
        responsiveLayout="stack"
        breakpoint="960px"
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}>
        <Column field="id" header="ID" sortable />
        <Column field="name" header="NAME" sortable />
        <Column field="title" header="TITLE" sortable />
        <Column body={actionTemplate} />
      </DataTable>
    </div>
  );
}

export default DriverList;
