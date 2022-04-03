### What are those `info.json` files Mango created in my library?

See [#37 (comment)](https://github.com/hkalexling/Mango/issues/37#issuecomment-630291545).

### Help! I put my manga files into the Mango library folder but they are not showing up on the web interface

1. Make sure your files are in one or more nested folders in the library, and not directly under the library folder. Mango won't recognize something like `~/mango/library/file.cbz`, but `~/mango/library/my_favorite_manga/file.cbz` works.
2. Make sure the file types are supported. Currently we only support `.cbz`, `.zip`, `.cbr` and `.rar`.
3. You might need to wait for Mango to re-scan the library before new files can show up. You can trigger a scan manually from the admin page.
4. If you are using Docker, verify that the library folder is mounted correctly. You can [shell into](https://stackoverflow.com/q/30172605) the docker container and see if the files are in `/root/mango/library`.