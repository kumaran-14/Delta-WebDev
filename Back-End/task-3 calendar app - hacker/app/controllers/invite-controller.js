const Invite = require('../models/Invite.js')
const User = require('../models/User.js')

function validateInput(req){
  let bool = (req.body.username && req.body.title && req.body.description && req.body.date &&
    req.body.starttime && req.body.endtime)
  return bool;
}
function inviteObject(req){
  return {
    username:req.body.username,
    fromuser:req.params.user,
    title:req.body.title,
    description:req.body.description,
    date:req.body.date,
    year:Number(req.body.date.split('-')[0]),
    month:Number(req.body.date.split('-')[1]),
    day:Number(req.body.date.split('-')[2]),
    starttime:req.body.starttime,
    endtime:req.body.endtime,
  }
}
//render invite form
exports.createForm = (req,res) => {
  res.render('invites/create_invite')
}

//create a invite and add it to database
exports.createInvite = (req,res) => {
  //checking for missing inputs
  if(validateInput(req)){
    //checking whether invitee exists
    User.find({username:req.body.username},(err,user) => {
      if(err) return console.log(err);
      if(user.length == 0) {
        console.log(req.body.username);
        return res.redirect('/invites/'+ req.params.user +'/create')
      }
      //if invitee exists
      let newInvite = new Invite(inviteObject(req))
      newInvite.save(err =>{
        if(err) console.log(err);
        res.redirect('/invites/'+ req.params.user +'')
      })
    })
  }else {
    return res.redirect('/invites/'+ req.params.user +'/create')
  }
}
//displaying all invites
exports.displayInvites = (req,res) => {
  Invite.find({username:req.params.user},(err,invites) => {
    if(err) return console.log(err);
    res.render('invites/display_invites',{invites:invites})
  })
}
