"use strict";

const Hapi = require("@hapi/hapi");
const axios = require("axios");

const url = "https://teamtreehouse.com/jonathanwalz.json";

async function getUser(req, h) {
  try {
    const data = await axios.get(url);
    console.log(data);
    return h.response(data.data);
  } catch (err) {
    return h.err(err);
  }
}

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: "localhost"
  });

  server.route({
    method: "GET",
    path: "/",
    handler: getUser
  });

  await server.start();
  console.log("Server running on %ss", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
