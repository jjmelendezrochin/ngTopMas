// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  servidor: {
    TAG_IDEMPRESA: 0,
    //TAG_SERVIDOR: "http://localhost:4200/TopMas",
    TAG_SERVIDOR: 'https://www.topmas.mx/TopMas',
    TAG_SERVIDOR_W: "https://www.topmas.mx",
    //TAG_SERVIDOR_W: "http://localhost:4200"
  },
};
