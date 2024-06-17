import app from './app';
function start() {
  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`✅ Server is listening on: http://localhost:${PORT}`);
  });
}

start();

