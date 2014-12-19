Template.postEdit.events({
	'submit form': function(events) {
		events.preventDefault();

		var currentPostId = this._id;

		var postProperties = {
			url: $(events.target).find('[name=url]').val(),
			title: $(events.target).find('[name=title]').val()
		}

		var errors = validatePost(postProperties);
		if (errors.title || errors.url)
			return Session.set('postEditErrors', errors);

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

Template.postEdit.created = function() {
	Session.set('postEditErrors', {});
}

Template.postEdit.helpers({
	errorMessage: function(field) {
		return Session.get('postEditErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	}
});
