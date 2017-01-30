'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Vote = new Schema({
    ip: {type: String, default: null},
    user_id: {type: String, default: null},
    created: {
        type: Date, 
        default: Date.now
    }
});

var Option = new Schema({
    name: { type: String, required: true },
    votes: [Vote]
});

var Poll = new Schema({
    name: { type: String, required: true },
    user_id: String,
    deleted: { type: Boolean, default: false},
    created: {
        type: Date, 
        default: Date.now
    },
    options: [Option]
});

var _checkMatchVote = function(add, saved) {
    if(add.user_id) {
        return add.user_id == saved.user_id;
    }
    return add.ip == saved.ip;
};
var _checkVoted = function(poll, vote) {
    for(var optKey  in poll.options) {
        var option = poll.options[optKey];
        for (var voteKey in option.votes ) {
            if (_checkMatchVote(vote, option.votes[voteKey])) {
                return true;
            }
        }
    }
    
    return false;
}
Poll.statics.vote = function(poll, optionId, vote, callback) {
    if(!poll || !poll.options.length){ 
        return callback("Invalid poll.");
    }

    if (_checkVoted(poll, vote)) {
        console.log('Vote by id get _checkVoted', poll, vote);
        return callback(403);
    }
    
    var query = { 
        "_id": poll._id,
        "options._id": optionId 
    };
    var update = { "$push": { "options.$.votes": vote } };
    console.log('vote upate', query, update);
    this.update(query, update, callback);
}

Poll.statics.voteByPollId = function(pollId, optionId, vote, callback) {
    console.log('Vote by id ', arguments);

    this.findOne({_id: pollId}).exec((err, data) => {
        console.log('Vote by id get poll', err, data);
        if (err) {
            return callback(err, data);
        }
        if (!data || !data._id) {
            return callback(404);
        }
        return this.vote(data, optionId, vote, callback);
    });
}
module.exports = mongoose.model('Poll', Poll);