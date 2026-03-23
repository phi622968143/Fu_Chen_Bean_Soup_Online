const express = require('express'); 
const menu = require('./menu.json');
const cors = require('cors');
const app = express(); 
app.use(cors());
app.use(express.json());
//front
app.get('/',(req,res)=>{
        res.json(menu);
}); //ok

let orders = [];
let nextId = 1;

app.post('/orders', (req, res) => {
  const { name, phone, items, total, note } = req.body;

  // 基本驗證
  if (!name || !phone || !items || items.length === 0) {
    return res.status(400).json({ message: '缺少必要欄位' });
  }

  const order = {
    id: nextId++,
    name,
    phone,
    items,        // [{ item_id, name, toppings: [], qty, price }]
    total,
    note: note || '',
    status: 'pending',
    created_at: new Date().toISOString()
  };

  orders.push(order);
  res.status(201).json(order);
});

// //back

app.get('/back', (req, res) => {
  res.json(orders);
});
// app.delete('/finished_orders');

app.listen(3000, () => {           // 啟動伺服器
  console.log('Server running');
});
