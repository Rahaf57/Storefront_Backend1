import express, { Request, Response } from 'express';

import routes from './routes';


const app = express();
app.use(express.json())
const port = 3000;
app.use('/api', routes);

app.get('/', (req:Request , res:Response) =>{
  res.json({
    massage: 'Hello in Store'
  })
})
app.listen(port , () => {
  console.log(`Server is starting at prot:${port}`)
})





export default app;


