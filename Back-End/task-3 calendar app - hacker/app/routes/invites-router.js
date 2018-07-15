const router = require('express').Router();

const invite = require('../controllers/invite-controller.js');

//routes for /invites
//render the invite form
router.get('/:user/create', invite.createForm)

//register a new invite
router.post('/:user/create', invite.createInvite)

//display all invites
router.get('/:user', invite.displayInvites)

//for future development purposes
  // //render edit form
  // router.get('/:user/edit/:id',invite.editForm)
  //
  // //editing a appointemnt
  // router.post('/:user/edit/:id',invite.editinvite)
  //
  // //delete invite
  // router.delete('/:user/edit/:id',invite.deleteinvite)


module.exports = router
