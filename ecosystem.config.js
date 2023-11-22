module.exports = {
  apps: [
    // {
    //   name: "nextjs-app",
    //   script: "npm",
    //   args: "start",
    //   cwd: "./web/",
    //   watch: true,
    //   ignore_watch: ["node_modules"],
    // },
    {
      name: "rails-app",
      script: "start-rails.sh",
      interpreter: "bash",
      cwd: "./api/",
      watch: true,
      ignore_watch: ["tmp/*", "log/*"],
    },
  ],
};
