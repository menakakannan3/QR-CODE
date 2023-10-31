import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
import qr from "qr-image";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
});

app.post("/submit",(req,res)=>{
    const text = req.body.urlname;
    if (!text) {
        return res.status(400).json({ error: 'Missing text parameter' });
      }
    
      try {
        const qrCode = qr.image(text, { type: 'png' });
        res.setHeader('Content-type', 'image/png');
        qrCode.pipe(res);
      } catch (err) {
        res.status(500).json({ error: 'Failed to generate QR code' });
      }
});
app.listen(3000,()=>{
    console.log("logged");
});