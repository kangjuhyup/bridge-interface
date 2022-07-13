# DFM Bridge 웹 인터페이스 서비스 프로젝트
> DFM Bridge는 이기종의 블록체인 네트워크 간의 자사의 DFM 코인을 상호 교환하는 서비스입니다.
> 본 프로젝트는 DFM Bridge 서비스 중에서도 웹 인터페이스에 관한 프로젝트입니다.
> 지갑 연결을 위한 WalletConnect Bridge의 엔드포인트가 필요하며, 트랜잭션을 모니터링하고 실제 전송을 담당하는 데몬 프로젝트가 필요합니다. 

## 개발 환경 설정
```shell
$ yarn
```

## 개발 모드 실행 (코드 변경 감지)
```shell
$ yarn start
```

## 프로젝트 빌드
> 참고 : 빌드할 떄 자동으로 .env.production 설정으로 하므로, 테스트넷으로 빌드할 때에는 해당 설정을 테스트넷으로 변경해야 합니다. 
```shell
$ yarn build
```

## 빌드된 프로젝트 실행
```shell
$ yarn add -D pm2
$ pm2 serve ./build
```

## 빌드된 프로젝트 종료
```shell
$ yarn pm2 kill
```
