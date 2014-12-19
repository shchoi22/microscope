Posts = new Mongo.Collection('posts');

Posts.allow({
	update: function(userId, post) { return ownsDocument(userId, post);},
	remove: function(userId, post) { return ownsDocument(userId, post);}
});

Posts.deny({
	update: function(userId, post, fieldNames) {
		if(_.without(fieldNames, 'url','title').length > 0) {
			return true;
		} 
		//else if (Posts.find({url:post.url, _id: {$not:post._id}}) && Posts.findOne({url:post.url})) {
			//return true;
		//}
	}
})

Meteor.methods({
	postInsert: function(postAttributes){
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		var postWithSameLink = Posts.findOne({url:postAttributes.url});
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user()
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
});