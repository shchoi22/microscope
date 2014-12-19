Template.postSubmit.events({
	'submit form': function(events) {
		events.preventDefault();

		var post = {
			url: $(events.target).find('[name=url]').val(),
			title: $(events.target).find('[name=title]').val()
		};

		Meteor.call('postInsert', post, function(error,result) {
			if (error) {
				return alert(error.reason);
			}

			if (result.postExists) {
				throwError('This Link has already been posted');
			}

			Router.go('postPage', {_id: result._id});
		});
	}
})