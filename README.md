# restaurant_sidechain
Sidechain restaurant business based on Lisk blockchain

How to configure
setup a host machine with Ubuntu 18.04
commands: 

/*install python minimal*/
sudo apt update
sudo apt install -y libtool automake autoconf curl build-essential python-minimal

/*create a lisk user and login into it*/
sudo adduser lisk

/*install nvm. After installing it logout from lisk user and login with lisk user*/
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

/*run*/
nvm install 12.20

/*install pm2*/
npm install -g pm2

/*clone restaurant_sidechain repository*/
git clone https://github.com/davilinfo/icbct21.git

/*run npm ci from inside icbct21 folder*/
npm ci

/*verify index.js file if it suits your needs and run the sidechain. By default delegates run inside unique node with attribute force = true. Run*/ node index.js

/*If it runs, enabled forging and started to forge blocks then congratulations! You are running a lisk sidechain.*/
/*Now stop it and let's configure it to run with pm2*/
pm2 start --name restaurant_sidechain index.js

/*to verify the log follow below. 0 refers to the id on pm2*/
pm2 logs 0

/*pm2 --help for other commands*/
