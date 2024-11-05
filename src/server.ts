import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Serve the Angular build from the 'dist' folder
const angularDistPath = path.join(__dirname, '../frontend/dist/frontend/browser');

// Serve Angular static files
app.use(express.static(angularDistPath));

// Reverse proxy to an external Angular server or API
app.use(
  '/api', // Proxy requests starting with /api to the backend server
  createProxyMiddleware({
    target: 'http://backend-server-url:backend-port', // Replace with actual backend URL
    changeOrigin: true,
    ws: true, // Add this line for WebSocket support
    pathRewrite: {
        '^/api': '', // Remove /api from the request path
    }
  })
);

app.get('/env', (req: Request, res: Response) => {
    const envVariables = {
      API_URL: process.env.API_URL || 'some api url',
      WALLET_ADDRESS: process.env.WALLET_ADDRESS || 'wallet_address',
    };
    console.log({envVariables});
    
    res.json(envVariables);
  });
  
// Serve index.html for any other requests (Angular's routing)
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(angularDistPath, 'index.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
