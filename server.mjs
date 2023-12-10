// const express = require('express');
// const { parse } = require('url');
// const proxy = require('http-proxy-middleware');
// const next = require('next');
import express from "express";
import next from "next";
import { createProxyMiddleware } from "http-proxy-middleware";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    "/api",
    createProxyMiddleware({
      target: `${process.env.API_HOST || "http://localhost:8080"}`,
      changeOrigin: true,
      // ws: true
    })
  );

  server.all("*", (req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

export {};