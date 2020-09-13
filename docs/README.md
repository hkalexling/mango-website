# Mango

## What is Mango?

Mango is an open-source manga server and web reader. You can think of it as [Plex](https://www.plex.tv/) for your manga collections. With Mango, you can manage and read your manga with a responsive web interface.

Mango is designed with the following philosophies in mind:

- Easy to deploy and use
- Good performance
- Highly customizable

#### Easy to deploy and use

On Linux, Mango can be deployed with a single binary that includes all the dependencies and static files. Upgrading to a new version is as easy as replacing the binary with a new one.

#### Good performance

Mango is written in [Crystal](crystal-lang.org/), a compiled language that offers C-level performance and a safe type system. Thanks to this, Mango uses very little CPU and RAM resources. The web pages served by Mango are mostly rendered on the backend to make the web interface more responsive.

#### Highly customizable

Mango has a long list [configuration options](/Readme/?id=config) while offering sane default values to them. Mango has a built-in [MangaDex] downloader, but you can easily install [official](https://github.com/hkalexling/mango-plugins) or third-party plugins to download from other sites.

## Quick Start

Assuming you are running Linux on an `amd64/x86-64` machine, you can install and start Mango by running the following commands

```bash
curl -s https://api.github.com/repos/hkalexling/Mango/releases/latest | grep "browser_download_url" | head -1 | cut -d\" -f 4 | xargs -L 1 wget
chmod +x mango
./mango
```

Please check the full [installation guide](/Readme/?id=installation) for other installation options.

## How to Contribute?

Mango is, and will always be a free and open-source software. Any contributions to the project are welcome!

- **Submit bug reports and feature requests**: The best way you can help is to use Mango! Any feedback or reports are highly appreciated. Please don't hesitate to [submit an issue](https://github.com/hkalexling/Mango/issues/new/choose) in the GitHub repository.
- **Help develop Mango**: Please feel free to submit a PR. You should read the [development guideline](Wiki/Development) before you start.
- **Become a sponsor**: If you are feeling generous, you can become a sponsor by supporting Mango on [Patreon](https://www.patreon.com/hkalexling). Please let me know if you wish to advertise your website or project in the project [README](/Readme/?id=sponsors).

## Get in Touch

Come join our [Gitter](https://gitter.im/mango-cr/mango) to chat!
