import express, { json, urlencoded, Request } from 'express';
// @ts-ignore
import cors from 'cors'; // Импортируем cors
import dollsRoutes from './routes/dolls/index.js';
import authRoutes from './routes/auth/index.js';
import ordersRoutes from './routes/orders/index.js';
import serverless from 'serverless-http';

const port = 3001;
const app = express();

// Настройка CORS
app.use(
  cors({
    origin: ['http://localhost:8081/', 'exp://172.20.10.4:8081'], // Разрешить запросы со всех доменов (для разработки)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
    credentials: true, // Если нужно передавать куки
  })
);

// Настройки Express
app.use(urlencoded({ extended: false }));
app.use(
  json({
    verify: (req: Request, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Роуты
app.use('/dolls', dollsRoutes);
app.use('/auth', authRoutes);
app.use('/orders', ordersRoutes);

if (process.env.NODE_ENV === 'dev') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
