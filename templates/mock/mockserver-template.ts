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
      const paginated{{domainName}}s = {{domainCamelCase}}s.slice(start, end);

      return {
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
  }
] as MockMethod[];
