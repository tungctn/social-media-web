module.exports = {
  apps: [
    {
      name: "flask-app",
      script: "python3",
      args: "main.py",
      cwd: "./AI/moderate/",
      watch: true,
    },
  ],
};
