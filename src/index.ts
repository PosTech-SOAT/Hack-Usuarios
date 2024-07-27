import 'reflect-metadata';
import express from 'express';
import './infra/controllers/container';
import router from './presentation';

const app = express();
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`🔥 Server listening at http://localhost:${PORT}/api`);
	console.log(`Database Info:
        Host: ${process.env.DB_HOST},
        User: ${process.env.DB_USER},
        Password: ${process.env.DB_PASS},
        Database Name: ${process.env.DB_NAME}`);
});
