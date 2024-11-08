// api/v1.js
import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
  target: "https://parkdemeer-afde952e3fef.herokuapp.com",
  changeOrigin: true,
});
