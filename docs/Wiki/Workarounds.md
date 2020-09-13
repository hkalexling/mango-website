### Bulk convert CBR to CBZ

Mango reads `cbr/rar` archives using [`libarchive`](https://github.com/libarchive/libarchive), which has quite limited RAR supports. For example, it does not support random access, so reading large `cbr` files would be slower, and it does not support solid archives.

If you are having issues with your `cbr` files, please use the [bulk conversion script](https://gist.github.com/jaredlt/eef3ce973b6040f06396976314e9be60) contributed by [@jaredlt](https://github.com/jaredlt) to convert all `cbr` files in a directory to `cbz`.

### Multiple Libraries

Currently, Mango doesn't have multi-library support, but you can work around this by running multiple instances of Mango on the same machine. You can do so by passing in the paths to different config files when starting Mango. For example

```
mango --config=/path/to/config-1.yml
mango --config=/path/to/config-2.yml
```

will start two Mango instances with different configurations. Please make sure the config files have different port numbers and library paths.