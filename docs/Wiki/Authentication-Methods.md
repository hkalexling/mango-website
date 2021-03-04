## Username + Password

By default, you can log in to your Mango instance with a correct username/password combination. When you start Mango for the first time, the default username and password will be printed to STDOUT (aka your console in most cases). If you forgot your password, you can use the Mango [CLI](https://github.com/hkalexling/Mango/wiki/CLI-Tool) to reset the password. For example, here we are setting the password for user `admin` to `12345678`:

```
mango admin user update admin -p 12345678 --admin
```

## Disable Authentication

You can disable authentication from the config file. To do this, set `disable_login` to `true`, and set `default_username` to an existing username.

**Note**: You should never disable authentication if your Mango instance is publicly accessible from the internet.

## Auth Proxy

If you are using a reverse proxy, you might want to offload the authentication to your proxy server. For example, you can follow the instructions below to configure Apache to handle the authentication for Mango.

1. Create a password file by running `sudo htpasswd -c /path/to/file.htpasswd user1`. This creates a password file with user `user1` at the specified path. You can add in additional users using `sudo htpasswd /path/to/file.htpasswd user2`.
2. Configure your Apache virtual host to use the password file you created. Here's an example

```apache
<Location />
    # Basic authentication using the password file
	AuthType Basic
	AuthName MangoAuthProxy
	AuthBasicProvider file
	AuthUserFile /path/to/file.htpasswd
	Require valid-user

    # Set header X-USERNAME to the authenticated username
	RewriteEngine On
	RewriteRule .* - [E=PROXY_USER:%{LA-U:REMOTE_USER},NS]
	RequestHeader set X-USERNAME "%{PROXY_USER}e"

    # Unset the Authorization header
	RequestHeader unset Authorization

    # The usual reverse proxy config copied from https://github.com/hkalexling/Mango/wiki/Additional-Configurations#example-apache-config
    RewriteCond %{HTTP:Connection} Upgrade [NC]
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteRule /(.*) ws://127.0.0.1:9000/$1 [P,L]
    ProxyPass "http://localhost:9000/"
    ProxyPassReverse "http://localhost:9000/"
</Location>
```

3. In your Mango config file, set `auth_proxy_header_name` to `X-USERNAME`. This instructs Mango to use the value in the `X-USERNAME` header as the logged-in username.
4. In your Mango config file, set `host` to `127.0.0.1`. With this Mango would only listen to requests from the localhost (i.e., from Apache), so any requests going to Mango would have to go through the Apache authentication first.