# Api guide.

## Create game.

```
POST /api/v0.1/games/riichi
{"type":"CreateTable","payload":{"tableId":"table_739","userId":9978}}
```


## Ws

### Get state
Deployment

```
npm run build
zip -r build.zip build
scp build.zip root@balmora:/root/dojo/build.zip

cd dojo/
unzip build.zip
cp -a build/. /var/www/html
```
