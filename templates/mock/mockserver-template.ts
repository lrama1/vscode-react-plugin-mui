import { MockMethod } from 'vite-plugin-mock';

const {{domainCamelCase}}s = Array.from({ length: 15 }, (_, index) => ({
    {{#each attributes}}
        "{{this.attributeName}}" : `Sample-{{this.attributeName}}-${index}`,
    {{/each}}
}));

export default [
  {
    url: '/api/{{domainCamelCase}}s',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {{domainCamelCase}}s,
      };
    },
  },
] as MockMethod[];
