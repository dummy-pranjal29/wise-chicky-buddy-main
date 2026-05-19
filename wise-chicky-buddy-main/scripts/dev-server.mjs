import { createServer } from "vite";

const args = process.argv.slice(2);

const getArg = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const host = getArg("host", "127.0.0.1");
const port = Number(getArg("port", "5173"));

const server = await createServer({
  server: {
    host,
    port,
    strictPort: false,
  },
});

await server.listen();
server.printUrls();
