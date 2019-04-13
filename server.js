const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mysql = require('mysql2');
app.use (bodyparser.json());

//create database connection
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'api',
});

//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('mysql connected');
});

//api to show all products
app.get('/api/products',(req,res)=>{
    let sql="select *from product";
    let query= conn.query(sql,(err,results) =>{
       if(err) throw err;
       res.send(Json.stringify({"status":200,"error":null, "response":results}));
    });
});
//show single product
app.get('/api/products/:id',(req,res)=>{
    let sql ="select * from product where product_id="+req.params.id;
    let query = conn.query(sql,(err,reults)=>{
        if(err) throw err;
        res.send(Json.stringify({"status":200,"error":null,"response":results}));

    });
});
app.post('/api/products',(req, res) => {
    let data = {product_name: req.body.product_name, product_price: req.body.product_price};
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
 
  app.listen(3002,() =>{
    console.log('Server started on port 3002...');
  });
