describe('The Invitation object type', function(){
  var inviteGuests = [
    { pfx: 'Mr.',
      first: 'Mitchell',
      last: 'Stoutin',
      plusOnes: 0,
      orderer: 0,
      invitation: 2
    },
    { pfx: 'Mrs.',
      first: 'Jaqueline',
      last: 'Stoutin',
      plusOnes: 0,
      orderer: 1,
      invitation: 2
    }
  ],

  statusGuests = [{
		pfx: "Dr.",
		first: "Marv",
		last: "Kym",
		orderer: 1,
		plusOne: 0,
    status: 1
	},
	{
		pfx: "Mrs.",
		first: "Cyndy",
		last: "Kym",
		orderer: 2,
		plusOne: 0,
    status: 1
	},
	{
		pfx: "Ms.",
		first: "Rachel",
		last: "Kym",
		orderer: 3,
		plusOne: 0,
    status: 2
	},
	{
		pfx: "Mr.",
		first: "Brian",
		last: "Kym",
		orderer: 4,
		plusOne: 0,
    status: 2
	},];

  it('counts guests without status as outstanding', function(){
    var a = new Invitation (inviteGuests);
    expect(a.attendance.outstanding).toEqual(2);
  });

  it('sets right ID for guests', function(){
    var a = new Invitation(inviteGuests);
    expect(a.id).toEqual(2);
  });

  it('can set its name just in time for display', function(){
    var a = new Invitation(inviteGuests);
    expect(a.name).toBeUndefined();
    a.setName();
    expect(a.name).toBe('Mr. & Mrs. Mitchell & Jaqueline Stoutin');
  });

  it('counts and names non-attending guests', function(){
    var a = new Invitation(statusGuests);
    expect(a.attendance.notAttending).toEqual(2);
    a.setStatusNames();
    expect(a.notAttendingName).toBe('Ms. Rachel Kym with Brian Kym');
  });

  it('counts and names attending guests', function(){
    var a = new Invitation(statusGuests);
    expect(a.attendance.attending).toEqual(2);
    a.setStatusNames();
    expect(a.attendingName).toBe('Dr. & Mrs. Marv & Cyndy Kym');
    expect(a.attendance.outstanding).toBeFalsy();
  });

});
