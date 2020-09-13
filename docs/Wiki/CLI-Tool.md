You can use the mango CLI tool to perform management tasks. 

## `admin`

### `user`
Using this subcommand, you can perform user administration from the command line. Below is a short list of example commands

```bash
# list the users
mango admin user list

# create a new user with admin access
mango admin user add -u new_user -p 123456 --admin

# rename the user
mango admin user update new_user -u new_name --admin

# remove admin access
mango admin user update new_name

# delete the user
mango admin user delete new_name
```