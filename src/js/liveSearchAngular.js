(function(){
	var app = angular.module("rsvpLiveSearch", []);

	app.controller("mySearchController", ['$http', '$scope', function($http, $scope){

		$scope.searchTerm = '';
		$scope.oldTerm = '';
    $scope.nameFormatter = {
  				pfxPrimary: true,
  				pfxWith: false,
  				snmWith: true,
  				andChar: '&',
  				withChar: 'with'
  			},
		$scope.csrf = "";
		$scope.guests = [];
		$scope.invitations = {};
		$scope.filtered = [];
		$scope.showHallo = false;
		$scope.reservationChosen = false;
		$scope.reservation = {
			inviteId: 0,
			inviteName: '',
			inviteGuestsAllowed: 0,
			guestsAttending: false,
			people: [],
			guests: [],
			wishes: '',
		};
		$scope.submitted = false;

		$scope.liveSearch = function(term, oldTerm){
			if (term.length < 3) {//input too short.
				$scope.filtered = []; return; }
      var searchterms = term.trim().split(' '),
			scoreInvitation = function(invitation){
				var score = 0,
        //array of false booleans of lenght search terms.
        matchedTerms = _.map(searchterms, function(term){return false;});
				for (var i = 0; i < invitation.guests.length; i++) {
					for (var j = 0; j < matchedTerms.length; j++) {
						if (invitation.guests[i].first.startsWith(searchterms[j]) || invitation.guests[i].last.startsWith(searchterms[j])){
							matchedTerms[j] = true;
						}
					}
				}
        //The score is the number of "true"s in matchedTerms array.
				return _.reduce(matchedTerms, function(mem, val){if (val){ return mem+1;} return mem;}, 0);
			},
      // calculate value of the best match.
			topscore = scoreInvitation(_.max($scope.invitations, scoreInvitation));
      // if there is no match:
      if (topscore === 0){$scope.filtered = []; return;}
      // otherwise put all the best matches in scope.filtered.
			$scope.filtered = _.filter($scope.invitations, function(invitation){
				if(scoreInvitation(invitation) === topscore){
          invitation.name = getInvitationName($scope.nameFormatter, invitation.guests);
          return true;
        }
			});
		};


		$scope.init = function(){
			//Set up the $scope.invitations object, which allows us to sort by
			//group rather than by individual.
			var keys = _.uniq(_.map($scope.guests, function(person){return person.invitation;}));
			_.each(keys, function(key){
				$scope.invitations[key] = {name: "", guests: _.where($scope.guests, {invitation: key})};
			});
		};
		$scope.init();
	}]);

})();
window.ctLiveAppReady = true;
