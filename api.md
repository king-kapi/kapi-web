# User

## Set Status

`{{HOST}}/api/user/status`
Accepts: PUT
Body:
```json
{
    "status": UserStatus ("ONLINE" | "IDLE" | "DO_NOT_DISTURB" | "OFFLINE")
}
```