# HackatonItAnatroc
Welcome !

Pré-requis :
Docker :
https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-using-the-repository
sudo nano /etc/apt/sources.list.d/additional-repositories.list
ajouter : 
deb [arch=amd64] https://download.docker.com/linux/ubuntu trusty stable

sudo usermod -aG docker $USER
logout/login


Docker compose :
⇒ sudo curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
⇒ sudo chmod +x /usr/local/bin/docker-compose


lancer le projet :

```
# Add this to the end of /etc/hosts

172.41.0.10 front.anatroc
```
⇒  docker-compose up -d
⇒  docker-compose exec node bash
⇒  npm i
⇒  node_modules/.bin/gulp


Go to http://front.anatroc


Pour le dev
⇒  node_modules/.bin/gulp watch
autre terminal
⇒  npm start

https://github.com/GoogleChrome/webplatform-samples/blob/master/webspeechdemo/webspeechdemo.html



## Setup project details

To start all containers

`$ docker-compose up -d`

Then execute these following command to enter in node container (front)

`$ docker-compose exec node bash`

Then execute these following command to enter in php container (back)

`$ docker-compose exec php bash`

(For back-end developers)
You can execute domain.sh to add hostname for ip container

## Reminder

- The php container has static ip 172.20.0.10
- The node container has static ip 172.20.0.11

### Package, tools, ...
- php fpm 7.1
- nginx
- mysql 5.7
- maildev
- nvm
- phpmyadmin
- composer

### Port
- 8080:80 nginx
- 1080:80 maildev front web
- 1025:25 maildev smpt
- 10137:10137 Blackfire
- 9000:9000 xdebug
- 8888:80 phpmyadmin

