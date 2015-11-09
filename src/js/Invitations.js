//Invitations.js
// defines the invitation object. Depends on weddingNames.js to make names.
// requires underscore.

// The invitation object will be shared across several apps that employ it.
// The unauthenticated "respond" app won't leak the attending/not attending status
// of guests.

function Invitation(guests){
  //guests is an array of guest objects.
  //formatConfig can be undefined, or else is a config object for invitation name maker.
  this.guests = guests;
  this.id = this.setId(this.guests);
  this.name = undefined;
  this.attendingName = undefined;
  this.decliningName = undefined;
  this.attendance = _.countBy(this.guests, function(val){
    if (val.status===0){return 'outstanding';}
    if (val.status===1){return 'attending';}
    if (val.status===2){return 'notAttending';}
  });

}

Invitation.prototype.setId = function(ga){
  if (ga.length === 0){return undefined;}
  if(!_.every(ga, function(val){
    return val.invitation == ga[0].invitation || val.invitation == undefined;})){
    console.error("can't make an group of guests who are not grouped on the server.");
  }
  return ga[0].invitation;
};

Invitation.prototype.getStatusName = function(ga, status, config){
  var a = _.filter(ga, function(val){return val.status == status;});
  return getInvitationName(a, config);
}
