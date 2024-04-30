const express = require('express');
const app = express();
const port = 8080; //8080, 3000, 5000 등 으로 시작할 수도 있음

const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://jubi:RlKk9z6CrmlBpCOH@cluster0.azxhkaj.mongodb.net/';
const client = new MongoClient(url);
//mongodb+srv://jubi:RlKk9z6CrmlBpCOH@cluster0.azxhkaj.mongodb.net/

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// const connetDB = async ()=> {
//   try{
//   await client.connect()
//   console.log('DB연결');
//   const db = client.db('todo')
//   await db.collection('posts').insertOne({_id: 11, name: '홍길동', date:'2024-04-29'})
//   console.log('DB 추가 확인');}catch(error){
//     console.error(error)
//   }
// }
// connetDB()

app.get('/', (req, res) => {
  //   res.send('서버개발시작');
  //   res.sendFile(__dirname + '/index.html');
  res.render('index');
});
app.get('/list', (req, res) => {
  // res.sendFile(__dirname + 'list');
  res.render('list')
});
app.get('/detail', (req, res) => {
  // res.sendFile(__dirname + 'detail');
  res.render('detail');
});


app.post('/add', async (req, res)=>{
// console.log('req----',req.body);
// const title = req.body.title
// const dateOfGoals = req.body.dateOfGoals
// console.log(res);
const {title, dateOfGoals} = req.body
console.log(title);
console.log(dateOfGoals);
const connetDB = async ()=> {
  try{
  await client.connect()
  console.log('DB연결');
  const db = client.db('todo')
  await db.collection('posts').insertOne({title, dateOfGoals})
  console.log('DB 추가 확인');
}catch(error){
    console.error(error)
  }
  // res.send('post 요청확인')
  res.redirect('/list')
}
connetDB()
})
app.listen(port, () => {
  console.log(`서버실행중... ${port}`);
});
