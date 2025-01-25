
export interface {{domainName}} {
    {{#each attributes}}
    {{this.attributeName}}: {{this.dataType}},
    {{/each}}
}