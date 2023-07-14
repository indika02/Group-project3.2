const router=require("express").Router();
let Account=require("../models/Account");

router.route("/add").post(async(req,res)=>{
   
    const index=req.body.index;
    const email=req.body.email;
    const usertype=req.body.usertype;
    const dpwd=req.body.dpwd;
    const accountstate=req.body.accountstate;
    
    try {
        const { index, email,  usertype, dpwd, accountstate } = req.body;
    
        const existingAccount = await Account.findOne({ index });
        if (existingAccount) {
          return res.status(400).json({ error: 'Index number already exists' });
        }
    const newAccount=new Account({
        
        index,
        email,
        usertype,
        dpwd,
        accountstate
      
    })

    await newAccount.save();

    res.status(200).json({ message: 'Account Created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error!' });
  }
});
router.route("/").get((req,res)=>{
    Account.find().then((Account)=>{
        res.json(Account)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;