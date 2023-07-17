module.exports = {
  apps : [{
    name: "app",
    script: "./src/server.js", /*aonde ele precisa executar*/
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
