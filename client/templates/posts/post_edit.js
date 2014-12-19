Template.postEdit.events({
	'submit form': function(events) {
		events.preventDefault();

		var currentPostId = this._id;

		var postProperties = {
			url: $(events.target).find('[name=url]').val(),
			title: $(events.target).find('[name=title]').val()
		}

		Posts.update(currentPostId, {$set: postProperties}, function(error) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('postPage', {_id: currentPostId})
			}
		})
	},

	'click .delete': function(events) {
		events.preventDefault();

		if(confirm("Delete this post?")) {
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});