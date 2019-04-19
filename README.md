Node 가위바위보 API
==================

![IMAGE ALT TEXT](https://user-images.githubusercontent.com/36251104/56402925-43978580-629a-11e9-95f8-d1d030ae5d35.PNG)

심플한 가위바위보는 node.js로 개발된 API 입니다.<br>
메신저와 연동하거나 특정 사이트 / 앱과 연동하여 사용하실수 있습니다.<br>
잔디(Jandi)는 이미 구현되어 있음에 따라 그대로 사용하셔도 무방합니다.

바로사용하기
-----------
WEB API (GET) :: http://211.239.124.243:19921/RockPaperScissors?keyword=도움말 <br>
JANDI (POST) :: http://211.239.124.243:19921/RockPaperScissors


실행방법
--------
<pre><code>#node 설치후
> npm install
> node rockpaperscissorsAPI.js
</code></pre>

호출방법
--------
JSON : http://127.0.0.1:3080/RockPaperScissors?keyword=키워드 

요청변수
--------
| RetrunName | 설명 |
| ------ | ------ |
| keyword | 사용자에게 받는 입력값. [가위 , 바위 , 보 , 도움말 , 제작자] 명령어를 사용할 수 있습니다.|


출력결과
--------  
| RetrunName | 설명 | 결과 | 사용범위 |
| ------ | ------ | ------ | ------ |
| body | 결과값을 정리하여 안내합니다. | ex) (인간) 가위 VS (컴퓨터) 보 [인간승리] |POST(JANDI) & GET|
| userSelection | 사용자가 보낸값을 리턴합니다. | 가위,바위,보 | GET|
| aiSelection | 컴퓨터가 선택한값을 리턴합니다. | 가위,바위,보 | GET|
| winnerRetrun | 결과의 승자를 리턴합니다. | user (유저) , computer (컴퓨터) , tieGame (무승부) | GET|


끗
--------
![IMAGE ALT TEXT](https://user-images.githubusercontent.com/36251104/56404769-7abe6480-62a3-11e9-95f3-c46cae484bb4.PNG)
