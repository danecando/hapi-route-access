var Boom = require('boom');

exports.register = function(plugin, options, next) {

    plugin.ext('onPostAuth', function(request, next) {

        var authorized = false;

        // get route specific permission
        var routeAuth = request.route.plugins['route-access'] || null;

        // no permissions set on this route
        if (!routeAuth) return next();

        // get user credentials or 401 if not logged in
        if (request.auth.isAuthenticated) var user = request.auth.credentials;
        else return next(Boom.unauthorized());

        // check if user has permitted role
        if (!!routeAuth.role) {
            routeAuth.role = (Array.isArray(routeAuth.role) ? routeAuth.role : [routeAuth.role]);

            routeAuth.role.forEach(function(role) {
                if (user.role === role) authorized = true;
            });
        }

        // does user have high enough permission level
        if (!!routeAuth.permission && user.permission < routeAuth.permission) authorized = false;

        if (authorized) return next()
        else return next(Boom.unauthorized());
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};

