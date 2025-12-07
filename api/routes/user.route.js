
import express from 'express';
import {test} from '../controller/user.controller.js'


// it doesnt matter if create route need call in index.js


const router = express.Router();

// router.get('/test',(req,res)=>{
//     res.send("hello world");
// })


router.get('/test',test);

export default router;
