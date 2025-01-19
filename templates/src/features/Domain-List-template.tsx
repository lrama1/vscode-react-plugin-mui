import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Button, Paper, TablePagination } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch{{domainName}}s, pageChanged, sorted } from "./{{domainCamelCase}}sSlice";
import { fetch{{domainName}}, new{{domainName}} } from "./{{domainCamelCase}}Slice";
import { useNavigate } from "react-router-dom";

function {{domainName}}List() {
  const dispatch = useDispatch();

  const {
    entities: {{domainCamelCase}}s,
    perPage,
    totalRecords,
    page,
    sortField,
    sortOrder,
  } = useSelector((state: any) => state.{{domainCamelCase}}s);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetch{{domainName}}s());
  }, [dispatch]);

  function on{{domainName}}sChangePage(_, newPage) {
    dispatch(pageChanged({ page:newPage, perPage }));
    dispatch(fetch{{domainName}}s());
  }

  function onSort(_, property) {
    const isAsc = sortField === property && sortOrder === 'asc';
    dispatch(sorted({ sortField: property, sortOrder: isAsc ? 'desc' : 'asc' }));
    dispatch(fetch{{domainName}}s());
  }

  function buttonClicked(event) {
    const id = event.currentTarget.value;
    dispatch(fetch{{domainName}}("api/{{domainCamelCase}}/" + id));
    navigate("/{{domainCamelCase}}");
  }

  function onAddNew() {
    dispatch(new{{domainName}}());
    navigate("/{{domainCamelCase}}");
  }

  return (
    <div className="layout-dashboard">
      <div className="button-container-right">
        <Button variant="contained" color="primary" onClick={onAddNew}>Add New</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          <TableRow>
          {{#each attributes}}
            <TableCell sortDirection={sortField === '{{this.attributeName}}' ? sortOrder : false}>
                <TableSortLabel
                  active={sortField === '{{this.attributeName}}'}
                  direction={sortField === '{{this.attributeName}}' ? sortOrder : 'asc'}
                  onClick={(event) => onSort(event, '{{this.attributeName}}')}
                >
                  {{this.attributeName}}
                </TableSortLabel>
            </TableCell>            
          {{/each}}
            <TableCell>Actions</TableCell>
          </TableRow>
          </TableHead>
          
          <TableBody>
          { {{domainCamelCase}}s.map(({{domainCamelCase}}) => (  
            <TableRow key={ {{domainCamelCase}}.{{idAttribute}} }>
            {{#each attributes}}            
              <TableCell>
                {{#if (eq this.dataType "Boolean")}}
                  { {{../domainCamelCase}}.{{this.attributeName}} ? 'Y' : 'N' }
                {{else}}
                  { {{../domainCamelCase}}.{{this.attributeName}} }
                {{/if}}
              </TableCell>            
            {{/each}}
              <TableCell>
                  <Button variant="contained" color="primary" value={ {{domainCamelCase}}.{{idAttribute}} } onClick={buttonClicked}>
                    Edit
                  </Button>
                </TableCell>
            </TableRow>
            ))}
          </TableBody>          
        </Table>
        <TablePagination
            component= "div"
            count={totalRecords}
            page={page}
            onPageChange={on{{domainName}}sChangePage}
            rowsPerPage={perPage}
            onRowsPerPageChange={(event) => dispatch(pageChanged({ perPage: parseInt((event.target as HTMLInputElement).value, 10), page: 0 }))}
          />

      </TableContainer>
    </div>
  );
}

export default {{domainName}}List;
