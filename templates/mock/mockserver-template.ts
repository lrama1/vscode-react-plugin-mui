import { url } from 'inspector';
import { MockMethod } from 'vite-plugin-mock';

const {{domainCamelCase}}s = Array.from({ length: 15 }, (_, index) => ({
    {{#each attributes}}
        "{{this.attributeName}}" : `Sample-{{this.attributeName}}-${index}`,
    {{/each}}
}));

export default [
  {
    url: '/api/{{domainCamelCase}}s',
    method: 'post',
    response: ({query}) => {
      const page = parseInt(query.page, 10) || 1;
      const pageSize = parseInt(query.per_page, 10) || 10;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
     
      const sortField = query.sort_by || '{{idAttribute}}';
      const sortOrder = query.order || 'asc';

      const sorted{{domainName}}s = {{domainCamelCase}}s.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      const paginated{{domainName}}s = sorted{{domainName}}s.slice(start, end);

      return {
        page: page,
        code: 0,
        rows: paginated{{domainName}}s,
        totalRecords: {{domainCamelCase}}s.length,
      };
    },
  },
  {
    url: '/api/{{domainCamelCase}}/:id',
    method: 'get',
    response: ({query}) => {
      const {{domainCamelCase}} = {{domainCamelCase}}s.find((item) => item.{{idAttribute}} === query.id);

      return {{domainCamelCase}};
    },
  },
  {
    url: '/api/{{domainCamelCase}}/:id',
    method: 'put',
    response: ({query, body}) => {
      const {{domainCamelCase}} = {{domainCamelCase}}s.find((item) => item.{{idAttribute}} === query.id);
      Object.assign({{domainCamelCase}}, body);

      return {{domainCamelCase}};
    },
  },
  {
    url: '/api/{{domainCamelCase}}/:id',
    method: 'delete',
    response: ({query}) => {
      const index = {{domainCamelCase}}s.findIndex((item) => item.{{idAttribute}} === query.id);
      {{domainCamelCase}}s.splice(index, 1);

      return true;
    },
  },
  {
    url: '/api/{{domainCamelCase}}',
    method: 'post',
    response: ({body}) => {
      const {{domainCamelCase}} = {
       ...body, {{idAttribute}}: 'Sample-{{idAttribute}}-' + ({{domainCamelCase}}s.length + 1)
      };
      {{domainCamelCase}}s.push({{domainCamelCase}});

      return {{domainCamelCase}};
    },
  }
] as MockMethod[];
