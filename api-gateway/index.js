const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());

app.use('/books-api', createProxyMiddleware({ 
  target: 'http://book-service:5001', 
  changeOrigin: true
}));

app.use('/reviews-api', createProxyMiddleware({ 
	target: 'http://review-service:5002', 
	changeOrigin: true 
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));