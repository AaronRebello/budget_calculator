const express = require("express");
const router = express.Router();


router.get('/', (req,res) =>{
    const greet="Manage your dept and balance in this Budget Manager";
    res.render('index',{
      greetMessage:greet
    });
  })
  
  router.get("/about",(req,res) =>{
   
    res.render("about");
  })
  
  
  // add income
 router.get("/calculator",(req,res) =>{
   res.render("passbook")
  });
  
  
 router.get("/edit/passbook/:id", (req, res) => {
    Budget.findOne({ _id: req.params.id })
      .then((data) => {
        res.render("passbook", {
          budget: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  
  
 router.get("/passbook", (req, res) => {
   
    Budget.find({}).then((data) => {
      //block scope
      let creditTotal=0;
      let leftTotal=0;
      let debitTotal=0;
      let title;
  
      // let debitTotal=0;
      // here res will be in array
      data.forEach((value) => {
        title=value.title;
        if(value.type === "+"){
         creditTotal = creditTotal += value.amount;
         leftTotal = leftTotal += value.amount;
        //  console.log(creditTotal);
        }
       if(value.type === "-"){
         debitTotal = debitTotal -= value.amount;
         leftTotal = leftTotal -= value.amount;
        //  console.log(title);
       }
        
      })
      res.render("passbook",{
        title,
        debitTotal,
       creditTotal,
       leftTotal,
       budget:data,
      
      })
   
    });
  });
  
  
  
  //post method
  
 router.post("/calculate",(req,res) =>{
    
    const Allbudget = {
        title:req.body.title,
        amount: req.body.amount,
        type: req.body.type,
        
      };
      const budget = new Budget(Allbudget);
      budget 
      .save()
        .then((data) => {
          res.redirect("/passbook")
        })
        .catch((err) => console.log(err));
    
  });
  
  
  
    //edit tasks @get
    // app.get("/edit/passbook/:id",(req,res) =>{
    //   Budget.findOne({ _id: req.params.id })
    //     .then((data) => {
    //       res.render("edit", {
    //       budget:data
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // });
  
  router.put("/passbook/:id", (req, res) => {
    Budget.findOne({_id: req.params.id })
      .then((data) => {
       
        data.title = req.body.title;
        data.amount = req.body.amount;
        data
          .save()
          .then((data) => {
            res.redirect("/passbook");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  module.exports = router