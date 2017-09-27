# shuffle-ntu
Shuffle NTU Official Website. 台大晚餐官方網站

## Environment
```
git clone https://github.com/tigercosmos/shuffle-ntu.git
cd shuffle-ntu
npm install
npm install -g firebase-tools angular-cli
```

## Develop
Run with real time local server
```
ng serve
```

## Deploy
### Build product step by step
Build
```
ng build
```
Upload to firebase
```
firebase deploy
```

### Build via npm
```
npm run deploy
```
