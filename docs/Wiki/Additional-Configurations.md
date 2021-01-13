### Reverse Proxy

#### Example Apache Config

```apache
<Location />
    RewriteEngine On
    RewriteCond %{HTTP:Connection} Upgrade [NC]
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteRule /(.*) ws://127.0.0.1:9000/$1 [P,L]

    ProxyPass "http://localhost:9000/"
    ProxyPassReverse "http://localhost:9000/"
</Location>
```

#### Example Nginx Config

```nginx
location / {
    proxy_pass http://localhost:9000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

### Systemd Service

You can follow the steps below to run Mango as a systemd service

1. Make sure you have the mango binary installed at `/usr/local/bin/mango`.
2. Create a file named `mango.service` at `/etc/systemd/user` with the following content

```ini
[Unit]
Description=Mango manga server
After=network.target

[Service]
Type=simple
Restart=always
RestartSec=1
ExecStart=/usr/local/bin/mango

[Install]
WantedBy=default.target
```

3. Enable the service by running `systemctl --user enable mango.service`.
4. Now you can start Mango using `systemctl --user start mango`.

### Base URL

You should customize the `base_url` setting in the config file if you wish to serve Mango under a base URL. For example, if you want to access Mango at `domain.tdl/mango`, set `base_url` to `/mango` and configure your web server accordingly. If you are using Nginx, you can use

```nginx
location /mango/ {
    proxy_pass http://localhost:9000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

### Environment Variables

- `HTTP_PROXY` and `HTTPS_PROXY`: Specify the HTTP/HTTPS proxies to use when making out-going requests (e.g., when downloading from MangaDex)
- `NO_PROXY`: Specify a comma-separated list of hosts that should be connected directly without using proxies
- `DISABLE_SSL_VERIFICATION`: When set to `1` or `true`, disable the SSL verification for all out-going requests

### MangaDex Rename Rules

You can customize the naming rules of manga and chapters downloaded from MangaDex using the `chapter_rename_rule` and `manga_rename_rule` fields in the `mangadex` config section. Here we explain the terminologies.

**Variables**: keywords that can be used in the renaming rules.

Available variables for manga:

| Variable | Example |
| --- | --- |
| id | 7139 |
| title | One Punch-Man |
| author | ONE |
| artist | Murata Yuusuke |

Available variables for chapters:

| Variable | Example | Optional |
| --- | --- | --- |
| id | 867036 | No |
| title | Won't Lose | Yes |
| volume | 2 | Yes |
| chapter | 131 | Yes |
| lang_code | en | No |
| language | English | No |
| pages | 25 | No |
| groups | r/OnePunchMan | No |

**Patterns**: Variables can only be used in a pattern with the `{variable}` syntax. Using the above example, `{title}` will be expanded to `Won't Lose`. If the captured variable is optional and is empty, the pattern will be expanded to an empty string.

You can include multiple variables in a single pattern and separate them with `|`. Mango will first attempt to expand the pattern using the first variable. If it's empty, Mango would attempt to use the second variable, and so on. If all the variables are empty, the pattern will be expanded to en empty string. Using the above example, `{title | id}` will be expanded to `Won't Lose` because the `title` field is not empty. If it's empty, the pattern will be expanded to `867036`.

**Groups**: Patterns and regular strings can be grouped into a group using the `[]` syntax. If any included pattern is empty, the whole group will be expanded to an empty string.

For example, the group `[Ch.{chapter}]` will be expanded to `Ch.131` if `chapter` is `131`. If `chapter` is empty, the group will be expanded to an empty string.

**Rename Rule**: A rename rule is built with any number of groups, patterns, and regular strings. To illustrate, let's take a look at the default rename rule for MangaDex chapters:

```
[Vol.{volume} ][Ch.{chapter} ]{title|id}
```

If `volume`, `chapter`, and `title` are all non-empty, it will be expanded to something like `Vol.2 Ch.131 Won't Lose`, and the chapter will be downloaded as a file named `Vol.2 Ch.131 Won't Lose.cbz`. If `volume` is empty, the rule will be expanded to `Ch.131 Won't Lose`.