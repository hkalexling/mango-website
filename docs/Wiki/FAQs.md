### What are those `info.json` files Mango created in my library?

See [#37 (comment)](https://github.com/hkalexling/Mango/issues/37#issuecomment-630291545).

### Why are the tags missing when I moved/renamed some files in my library?

Detto. We can't store the tags in `info.json` because we need the DB to index them. Because of this, when the paths of your titles change, the tags will be deleted.

Currently, if you renamed/moved a title, its thumbnail and tags will be deleted. The thumbnail will be re-generated automatically, but you will have to add the tags back manually. I understand that this is not ideal, so do let me know if you can propose a better way to handle this.

On the other hand, the reading progress, custom cover images, and display names are stored in `info.json`, so they won't be lost when you rename/move the folders.