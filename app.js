import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const port = process.env.PORT;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
})


app.post('/blessings', async (req, res) => {
    try {
        const { event, age, type, tone, length } = req.body;
        const prompt = `כתוב לי ברכה ${length} ל${event} ${age ? `לגיל ${age}` : ''} בסגנון ${tone} כ${type} `;
        console.log(prompt)


        const response = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            max_tokens: 150,
            n: 3
        })
        if (!response || !response.choices || response.choices.length === 0) {
            throw new Error('Invalid response format');
        }
        const blessings = response.choices.map(c => c.message.content.trim());
        res.json({ blessings });
        console.log("res:", blessings);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'failed' })
    }

})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
