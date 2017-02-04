'use strict';

module.exports = class {
    profile(req, res) {
        
        var user = {
            displayName: req.user.github.displayName,
            username: req.user.github.username
        };

        res.json({user});
    }
};
