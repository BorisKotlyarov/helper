# Helper #

## Install ## 

```bash
git clone https://github.com/BorisKotlyarov/helper.git
```

## global install (don't work at some OS) ##
```bash
npm i -g git+https://github.com/BorisKotlyarov/helper.git
# check global installation
helper -v
```

## Start ##

Run helper in your console using below command
```bash
cd helper
npm start
```
Global start
```bash
helper
```
When you need to use the following shortcuts `CTRL+F7`

### Possible troubles with Install  ### 
Make sure the libraries listed below are installed.

```bash
npm install -g node-gyp
```

Troubles with install `robotjs` http://robotjs.io/docs/building

Troubles with global install

`npm ERR! Error: EACCES: permission denied, access`
Install necessary libraries
```bash
sudo apt-get install libxtst-dev libpng++-dev build-essential
```

```bash
sudo chown -R $(whoami) ~/.npm
```
Make a directory for global installations:
```bash
mkdir ~/.npm-global
```
Configure npm to use the new directory path:
```bash
npm config set prefix '~/.npm-global'
```
Open or create a ~/.profile file and add this line:
```bash
export PATH=~/.npm-global/bin:$PATH
```
Back on the command line, update your system variables:
```bash
source ~/.profile
```

more info 

https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

Try reinstall helper...
