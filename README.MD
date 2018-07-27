# Api guide.

## Create game.

```
POST /api/v0.1/games/riichi
{"type":"CreateTable","payload":{"tableId":"table_739","userId":9978}}
```


## Ws

### Get state
```
{"type":"GetState","payload":{"tableId":"table_424"}}

```