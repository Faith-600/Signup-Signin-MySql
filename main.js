import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
  origin:["http://localhost:5173"],
  methods:["POST","GET"],
  credentials:true
}));
app.use(express.json());
app.use(session({
  secret: '',          
  resave: false,                  
  saveUninitialized: true,           
  cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const namePattern = /^[a-zA-Z\s]{2,50}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
});


app.get('/',(req,res)=>{
  if(req.session.name){
return res.json({valid:true,name:req.session.name})
  }else{
    return res.json({valid:false})
  }
})

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie('connect.sid'); // This will clear the session cookie on the client
    return res.status(200).json({ message: "Logout successful" });
  });
});


app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

   // Validate name pattern
  if (!namePattern.test(name)) {
    return res.status(400).json({ error: 'Name must be 2-50 alphabetic characters long.' });
  }
   // Validate password pattern
   if (!passwordPattern.test(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const sql = "INSERT INTO users (name, email, password) VALUES (?)";
    const values = [name, email, password];
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({ message: 'Error inserting user', error: err });
      }
      return res.status(201).json({ message: "User registered successfully", result });
    });
  });
});

app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.json({ message: 'Error inside server' });
    }
    if (result.length > 0) {
      req.session.name = result[0].name;
      // console.log(req.session.name);
      
      return res.json({ Login: true, user: result[0] });  // Sending user data if needed
    } else {
      return res.json({ Login: false });
    }
  });
});

app.listen(3001, () => {
  console.log("Connected to backend");
});
