
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { fetch{{domainName}}s, pageChanged, sorted } from "./{{domainCamelCase}}sSlice";
import { fetch{{domainName}} } from "./{{domainCamelCase}}Slice";
import { useNavigate } from "react-router-dom";

function {{domainName}}List() {
  const dispatch = useDispatch();

  const {
    entities: {{domainCamelCase}}s,
    perPage,
    first,
    totalRecords,
    page,
    sortField,
    sortOrder,
  } = useSelector((state) => state.{{domainCamelCase}}s);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetch{{domainName}}s());
  }, [dispatch]);

  function on{{domainName}}sChangePage({ first, rows, page }) {
    dispatch(pageChanged({ first, rows, page }));
    dispatch(fetch{{domainName}}s());
  }

  function onSort({ sortField, sortOrder }) {
    dispatch(sorted({ sortField, sortOrder }));
    dispatch(fetch{{domainName}}s());
  }

  function buttonClicked(event) {
    const id = event.target.value;
    dispatch(fetch{{domainName}}("api/{{domainCamelCase}}/" + id));
    navigate("/{{domainCamelCase}}");
  }

  function actionTemplate(rowData, column) {
    return (
      <Button
        id={rowData.{{idAttribute}} }
        value={rowData.{{idAttribute}} }
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
        paginator={true} value={ {{domainCamelCase}}s}
        lazy={true} rows={10}
        totalRecords={totalRecords}
        onPage={on{{domainName}}sChangePage}
        selectionMode="single"
        responsiveLayout="stack"
        breakpoint="960px"
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}>
        {{#each attributes}}
        <Column field="{{this.attributeName}}" header="{{this.attributeName}}" sortable />
        {{/each}}
        <Column body={actionTemplate} />
      </DataTable>
    </div>
  );
}

export default {{domainName}}List;
