////////// packages -----------------------------------------------
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const env = require('dotenv').config();
const cors = require('cors');
const path = require('path');
// creadentials pakcages imported

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose')
// var Contactapp = require('./routes/ContactAPI');
// mongoose connection is checked first

// App setup
const app = express();
app.use(
  express.urlencoded({ extended: true })
  );
  
  app.use(express.json());//we can assign the limits
  app.use(bodyparser.urlencoded({extended:true}));
  // Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'FrontEnd/build')));
  console.log(__dirname);
  // set up the cors for the ss events
  app.use(cors(
    {
  origin:['https://sodd-dash-board-4194.vercel.app'],
  methods:['GET', 'POST','PUT','DELETE'],
  credentials:true
}
));
// app.use(cors({
//   origin:['http://localhost:3000'],
//   methods:['GET', 'POST','PUT','DELETE'],
//   credentials:true
// }));

// Save the contact forms


// Making Creadentials

app.use(session({
  secret:process.env.SECRETKEY,
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());

var pass = process.env.PASS_DB;
mongoose.connect(pass,{
  useNewUrlParser:true
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  email:String,
  password:String,
  roles:[String],//rolls of every user
  name:String
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema);

passport.use(User.createStrategy())
// passport.serializeUser(
//   // (user, done) => {
//   // done(null, user.id);
// // }
// serializeUserr
// );
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.post('/login', function(req, res){
  // console.log(req.body);
  const user = new User({
      username: req.body.username,
      password: req.body.password
  });
  passport.authenticate('local',(err)=>{
    if(err){
      res.status(404).send({status:false,message:err.message});
    } else{
      req.login(user,function(err){
      if(err){
          console.log(err);
          res.status(400).send({status:false,message:err.message});
      }
        res.send({status:true});
  })
              res.send({status:true});
  });
  // req.login(user,function(err){
  //     if(err){
  //         console.log(err);
  //         res.send({status:false});
  //     } else{
  //         passport.authenticate('local')(req, res,()=>{
  //             res.send({status:true});
  //         });
  //     }
  // })
})

app.get('/logout', function(req, res){
  req.logout((err)=>{
    err ? 
    res.status(500).send({status:"Error",message:"logOut Failed"})
    :
    res.send({status:"Logged Out"});
  });
  // res.send({status:'logout'});
})

app.get('/secret',function(req, res){
  if(req.isAuthenticated()){
      res.send({status:true,user:req.user});
  } else{
      res.send({status:false});
  }
});

app.post('/register', function(req,res){
  User.register({username:req.body.username,name:req.body.name},req.body.password,function(err,user){
      if(err){
          console.log(err);
          res.send({status:false});
      } else{
          passport.authenticate("local")(req,res,()=>{
            res.send({status:true});
          })
      }
  })
})

app.get('/profile', function(req, res) {
  // Check if the user is authenticated
    User.find({})
    .then(data => res.send({data:data}))
    .catch(err => res.status(401).send({ status: false, message: 'Unauthorized' }))
});

app.put('/profile', async function(req, res) {
  try {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.id }, // Use the user's _id for identification
        { $set: { roles: req.body.roles } },
        { new: true }
      );

      if (updatedUser) {
        res.send({ status: true, updatedUser });
      } else {
        res.send({ status: false, message: 'User not found' });
      }
    } else {
      res.status(401).send({ status: false, message: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false });
  }
});


app.delete("/profile", (req, res, next) => {
  // res.send({data:req.body.id});
    User.deleteOne({_id:req.body.id})
    .then(deletedResult => {
      res.send({ status: "Success",message:deletedResult });
  })  
  .catch(error => {
      console.error("Error: ", error);
      res.status(500).send({ status: "Error", message: error.message });
  });
})




// contact form mongodb
const badResponceSchema = new mongoose.Schema({
    userInput1:String,
    botResponce1:String
  });
  
  // /bad responce
  const badResponse = mongoose.model("BadResponse", badResponceSchema);
  

  

app.get("/badAPI", function(req, res, next) {
    // res.send("you are doing right job")
    badResponse.find({})
    .then(data => {
        res.send(data);
      })
      .catch(error => {
        console.log(error);
      });
    })
   
// contacts
const contactEvent = new mongoose.Schema({
    name:String,
    number:String,
    event:String,
    place:String
  });
  
  // /bad responce
  const Contact = mongoose.model("ContactsEventWebSites", contactEvent);

  

app.get("/contactAPI", function(req, res, next) {
    // res.send("you are doing right job")
    Contact.find({})
    .then(data => {
        res.send(data);
      })
      .catch(error => {
        console.log(error);
      });
    })

    // feedback
    const feedbackSchema = new mongoose.Schema({
      Rating:Number,
      Catagory:String,
      feedText:String
    });
    
    const FeedBack = mongoose.model("FeedBack", feedbackSchema);
    
  
  app.get("/feedAPI", function(req, res, next) {
      // res.send("you are doing right job")
      FeedBack.find({})
      .then(data => {
          res.send(data);
        })
        .catch(error => {
          console.log(error);
        });
      })

      // good api
      const goodResponceSchema = new mongoose.Schema({
        userInput:String,
        botResponce:String
      });
      
    
      let goodResponse;
    try {
        goodResponse = mongoose.model("GoodResponse");
    } catch (error) {
        goodResponse = mongoose.model("GoodResponse", goodResponceSchema);
    }
    
    app.get("/goodAPI", function(req, res, next) {
        // res.send("you are doing right job")
        //   good responce
            goodResponse.find({})
            .then(data => {
                // eslint-disable-next-line no-const-assign
                res.send(data);
            })
            .catch(error => {
                console.log(error);
            });
        })

        // Students schema
        const studentSchema = new mongoose.Schema({
          name : String, //we can specify only true also  and [true,"check the entered data"] also like this
          whatsapp_no :{
            type : Number
          }, 
          email :String
        });
        
        const Student = mongoose.model("Student",studentSchema); 
        
      app.get("/studentAPI", function(req, res, next) {
          // res.send("you are doing right job")
          let studentData = null;
          Student.find({})
          .then(data => {
              res.send(data);
            })
            .catch(error => {
              console.log(error);
            });
            
          })

      //testimonials are imported
const TesmonialsSchema = new mongoose.Schema({
  name:String,
  comment:String
}
,{
  colllection:"TestimonialCollection"
});
const testmonial = mongoose.model("TestimonialCollection", TesmonialsSchema);

app.post("/testAPI", (req, res, next) => {
  try{
      const comm = new testmonial({
          name:req.body.name,
          comment:req.body.comment
      });
      comm.save();
      res.send({data:"stored"})
  } catch(err){
      res.send({status:"Error",data:err});
  }
})

app.delete("/testAPI", (req, res, next) => {
  // res.send({data:req.body.id});
    testmonial.deleteOne({_id:req.body.id})
    .then(deletedResult => {
      res.send({ status: "Success",message:deletedResult });
  })  
  .catch(error => {
      console.error("Error: ", error);
      res.status(500).send({ status: "Error", message: error.message });
  });
})

app.get("/testAPI", (req, res, next) => {
  try{
       testmonial.find({}).then(data => {
          res.send({status:"ok",data:data})
      })
  } catch(err){
      res.send({status:"Error",data:err});
  }
})

// wesites rich
const People = new mongoose.Schema({
  no:Number,
  date:Date
}
,{
  colllection:"PeopleCollectionEvent"
});

const count = mongoose.model("PeopleCollectionEvent", People);

app.get("/WebrichAPI", (req, res, next) => {
  count.find({})
  .then( data => res.send(data))
  .catch(err => res.send(err));
})

const collectionSchema = new mongoose.Schema({
  predictedQueNo : Number,
  accuracy:Number,
  userquestion:String
});

// wrong answers
const wrongAnswer = mongoose.model("WrongAnswer", collectionSchema);

app.get("/wrongAPI", function(req, res, next) {
  // res.send("you are doing right job")
  //   good responce
      wrongAnswer.find({})
      .then(data => {
          // eslint-disable-next-line no-const-assign
          res.send(data);
      })
      .catch(error => {
          console.log(error);
      });
  })

  app.get("/",function(req,res){
    res.send("You are rocking!!!!!!!!!!!!!!!!!!!!!")
  })
// app.get('/',(req,res)=>{
//     res.send("you are damn monster!");
// });
// Your API routes and other backend logic can go here

// // For any other route, serve the React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'FrontEnd/build/index.html'));
// });



app.listen(process.env.PORT || 500 , function() {
    console.log("Server started on port 500");
});
