module.exports = {
  bail: true, /*se um teste falhar, ele para a execução*/
  coverageProvider: "v8",
  testMatch: [
    "<rootDir>/**/*.spec.js" /*ele vai procurar dentro de src, qualquer pasta, algum arquivo q seja .spec.js*/
  ],
}
