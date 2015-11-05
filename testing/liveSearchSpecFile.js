describe("The live search controller initializer", function(){
  //The magic words to get inside the Angular controller.
  beforeEach(module('rsvpLiveSearch'));
  var mySearchController, scope;
  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    mySearchController = $controller('mySearchController', {
      $scope: scope
    });

    scope.guests = guests; //load some test data
    scope.init();
  }));

  it("creates an invitations object on the scope.", function(){
    expect(Object.keys(scope.invitations).length > 0).toBeTruthy();
  });

  it("has the same number of guests inside invitation objects that it was passed", function(){
    var numGuests = _.reduce(scope.invitations, function(memo, invite){return memo + invite.guests.length;}, 0);
    expect(numGuests).toEqual(guests.length);
  });

});

describe("The live search function", function(){

  //The magic words to get inside the Angular controller.
  beforeEach(module('rsvpLiveSearch'));
  var mySearchController, scope;
  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    mySearchController = $controller('mySearchController', {
      $scope: scope
    });

    scope.guests = guests; //load some test data
    scope.init();
  }));

  it("doesn't filter results if search term is too short.", function(){
    scope.liveSearch('me', 'm');
    expect(scope.filtered.length).toEqual(0);
  });

  it("does filter results for valid search term.", function(){
    scope.liveSearch('Chris', 'Chri');
    expect(scope.filtered.length).not.toEqual(0);
  });

  it("does not over-prefer first-last name repetition", function(){
    scope.liveSearch('Chris', 'Chri');
    expect(scope.filtered.length).toEqual(2);
  });

  it("does not get results for nonsense terms", function(){
    scope.liveSearch('Nonsen', 'Nonse');
    expect(scope.filtered.length).toEqual(0);
  });

  it("does not over-rank people of same last name", function(){
    scope.liveSearch('Kim', 'Ki');
    expect(scope.filtered.length).toEqual(2);
  });

  it("does kick out people of same last name with more specific first", function(){
    scope.liveSearch('Brian Ki', "Brian K");
    expect(scope.filtered.length).toEqual(1);
  });

  it("assigns a name to invitations in the filtered list", function(){
    scope.liveSearch('Brian', 'Bria');
    expect(scope.filtered[0].name).not.toBe('');
  })


});
