Chin Chan Pu API Game
========================

ChinChanPu game frontal application to play in different platforms.

Requirements
------------

* Node.js 14.18.1
* NPM 6.14.15

Installation
------------

Clone the repository and install dependencies with composer

```bash
npm install -g @ionic/cli cordova-res
git clone https://github.com/vgpastor/chinchanpu
cd chinchanpu && npm install
```

## Deploying

### Progressive Web App

1. Un-comment index.html lines
2. Run `ionic build --prod`
3. Push the `www` folder to your hosting service

### Android

1. Run `ionic cordova run android --prod`

### iOS

1. Run `ionic cordova run ios --prod`
