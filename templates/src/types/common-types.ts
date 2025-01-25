
export interface {{domainName}} {
    {{#each attributes}}
    {{this.attributeName}}: {{ lowercase this.dataType }},
    {{/each}}
}