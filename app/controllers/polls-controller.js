'use strict';

var Poll = require('../models/polls.js');

var _subject = req => {
    return {
        ip: req.ip,
        user_id: req.user && req.user.id ? req.user.id : null
    };
};

var _checkVoter = (subject, vote) => {
    if (typeof vote != 'object') {
        return false;
    }

    if (subject.user_id) {
        return subject.user_id == vote.user_id;
    }
    return subject.ip == vote.ip;
}
let _prettyPoll = (subject, poll) => {
    let item = {
        _id: poll._id,
        name: poll.name,
        created: poll.created,
        voted_by: false,
        votes_count: 0,
        options: []
    };

    console.log('poll', poll);
    poll.options.forEach(option => {
        let newOption = {
            _id: option._id,
            name: option.name,
            votes_count: option.votes.length,
            voted_by: false
        };
        item.votes_count += newOption.votes_count;
        let voted = option.votes.find(vote => {
            return _checkVoter(subject, vote);
        });
        if (voted) {
            item.voted_by = true;
            newOption.voted_by = true;
        }
        item.options.push(newOption);
    });

    return item;
};
let _view = (req, res) => {
    Poll.findOne({
        _id: req.params.poll_id
    }).exec((err, data) => {
        if (err) {
            return res.status(500).json({
                'message': 'Unable to get poll'
            });
        }
        if (!data || !data._id) {
            return res.status(404).json({});
        }
        return res.json({
            poll: _prettyPoll(_subject(req), data)
        });
    });
};
module.exports = class {
    index(req, res) {
        var query = {};
        if (req.query.mine) {
            if (!req.user || !req.user.id){
                return res.status(404).json({
                    'message': 'User not found'
                });
            }
            query.user_id = req.user._id;
        }
        Poll.find(query).sort({
            created: -1
        }).exec((err, data) => {
            if (err) {
                return res.status(500).json({
                    'message': 'Unable to list polls'
                });
            }
            var subject = {
                ip: req.ip,
                user_id: req.user && req.user.id ? req.user.id : null
            };
            var items = data.map(poll => {
                return _prettyPoll(subject, poll);
            })
            return res.json({
                items: items
            });
        });
    }

    add(req, res) {
        console.log("Poll add:", req.body);
        var subject = {
            ip: req.ip,
            user_id: req.user.id
        };
        var options = [];
        if (req.body.options && req.body.options.length) {
            options = req.body.options.map(item => {
                return {
                    name: item,
                    votes: []
                };
            });
        }

        var doc = new Poll({
            name: req.body.name,
            user_id: req.user.id,
            options: options
        });
        var data = {
            code: 400,
            message: "Unable to add poll",
            errors: {}
        };
        doc.save(err => {
            if (!err) {
                return res.json(_prettyPoll(subject, doc));
            }
            console.log("Error add poll", err);
            if (!err.errors) {
                err.errors = {};
            }
            for (var key in err.errors) {
                if ('ValidatorError' == err.errors[key].name) {
                    data.errors[key] = "Invalid value.";
                }
            }
            return res.status(400).json(data);
        });
    }
    
    view(req, res) {
        _view(req, res);
    }

    remove(req, res) {
        Poll.remove({
            _id: req.params.poll_id,
            user_id: req.user._id
        }, err => {
            console.log('Removing err: ', err);
            if (err) {
                res.status(400).json({
                    success: false
                });
            }
            return res.json({
                success: true
            });
        });
    }

    vote(req, res) {
        var vote = {
            user_id: req.user && req.user._id ? req.user.id : null,
            ip: req.ip
        };

        var optionId = req.body.option_id;

        Poll.voteByPollId(req.params.poll_id, optionId, vote, (err, data) => {
            if (!err) {
                if (data.ok && data.nModified > 0) {
                    return _view(req, res);
                }
                return res.status(400).json({
                    success: false,
                    message: "Unable to vote, please try again."
                });
            }

            if (err === 404) {
                return res.status(404).json({
                    success: false,
                    message: "Poll not found."
                });
            }

            if (err === 403) {
                return res.status(403).json({
                    success: false,
                    message: "You already have voted."
                });
            }

            return res.status(500).json({
                success: false,
                message: "Unable to vote. Please try again later."
            });
        });
    }
};
