# This module is not maintained or working with any current versions of Hapi

### hapi-route-access - simple hapi role & permission auth used in conjunction with hapi-auth-cookie

This plugin is very specific to my application as it assumes that your session auth will have variables role and permission assigned to them. I am publishing it now anyway just to put more stuff out that demonstrates the power of the hapi node.js framework and another example to help people that are just getting started with it.

#### Setup && Options

Register the plugin with server.pack.register

Plugin options takes roles and permissions arrays with all the roles and permissions your app will use. The plugin assumes that permissions are an integer value.

	server.pack.register([
	    require('hapi-auth-cookie'),
	    {
	        plugin: require('./plugins/hapi-route-access'),
	        options: {
	            roles: ['member', 'teacher', 'facilitator', 'student', 'admin'],
	            permissions: [0, 1, 2, 5, 10]
	        }
	    },
	], function(err) {
		if (err) throw err;

	    server.auth.strategy('session', 'cookie', 'try', {
	        password: 'secret',
	        isSecure: false
	    });
	});

## Usage

Add to any route you want to protect to certain user roles or permissions. It will check the users session value to see if they have permission to access the page

    plugin.route({
        method: 'GET',
        path: '/',
        config: {
            auth: { mode: 'required' },
            plugins: { 'route-access': { 'role': ['admin', 'member'], permission: 10 } },
            handler: function(request, reply) {

                reply.view('index');
            }
        }
    });

## Thats it

Not sure if I will make this into a real usable plugin yet but hopefully someone finds it helpful!
