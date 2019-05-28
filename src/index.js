var express = require('express');
var request = require('request');
var bodyParser = require('body-parser'); //POST 방식 받을때 사용함

var ver = "2019.04.19A02";

var app = express();
//POST 셋팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


/*  
    * 가위바위보 POST API
    * Post로 받는 값은 메신저 JADI 기준으로 개발된 버전입니다.
    * Webhook 발신 -> 시작키워드 (/가위바위보) -> URL 입력해서 적용
*/

//무적의 가위바위보
app.post('/RockPaperScissors', function(req, res) {
    var post_text = req.body.text.split('/' + req.body.keyword);
    var writerName = req.body.writerName; //사용자의 이름 받기 (잔디용도)

    var botSelection = new Array("가위", "바위", "보");
    var result = Math.floor(Math.random() * 3);

    //받아온 값에서 공백을 제거.
    var rock = post_text[1].replace(/(\s*)/g, "");
    var botReterun = "";
    botReterun = "승부 :: (인간)" + rock + " VS (컴퓨터)" + botSelection[result] + "\n";

    if (rock == botSelection[result]) {
        botReterun = botReterun + "[무승부]";
    } else if (rock == "도움말") {
        botReterun = "가위바위보는 다음과 같은 명령어로 게임을 즐기실수 있어요! \n\n /가위바위보 [ 가위 | 바위 | 보 | 도움말 | 제작자 ] \n예시) /가위바위보 가위\n\n 버전정보 : "+ver;

    } else if (rock == "제작자") {
        botReterun = "Sistinafibel (https://github.com/sistinafibel/RockPaperScissors)";
    }
    //가위바위보 시작
    else if (rock == "가위" && botSelection[result] == "바위" || rock == "바위" && botSelection[result] == "보" || rock == "보" && botSelection[result] == "가위") {
        botReterun = botReterun + "[컴퓨터 승리]";

    }else if (rock == "가위" && botSelection[result] == "보" || rock == "바위" && botSelection[result] == "가위" || rock == "보" && botSelection[result] == "바위") {
        botReterun = botReterun + "[인간 승리]";
    }else {
        botReterun = botReterun + "가위바위보가 아닌것 같아요. 상세 명령어는 도움말을 입력해주세요.";
    }

    console.log("인간 ::" + rock);
    console.log("컴퓨터 ::" + botSelection[result]);

    var jsonObject = {
        "body": botReterun
    };

    res.writeHead(200, {
        'Content-Type': 'text/json;charset=utf-8'
    });
    res.end(JSON.stringify(jsonObject));

});

/*
    * 가위바위보 GET API

*/

app.get('/RockPaperScissors', function(req, res) {
    var userSelection = req.query.keyword;

    var botSelection = new Array("가위", "바위", "보");
    var result = Math.floor(Math.random() * 3);

    var botReterun = "";
    var return_text = ""; //승리자 전달

    botReterun = "(인간)" + userSelection + " VS (컴퓨터)" + botSelection[result] + "\n";

    if (userSelection == botSelection[result]) {
        botReterun = botReterun + "[무승부]";
        return_text = "tieGame";

    } else if (userSelection == "도움말") {
        botReterun = "가위바위보는 다음과 같은 명령어로 게임을 즐기실수 있어요! \n\n /가위바위보 [ 가위 | 바위 | 보 | 도움말 | 제작자 ] \n예시) /가위바위보 가위\n\n 버전정보 : "+ver;

    } else if (userSelection == "제작자") {
        botReterun = "Sistinafibel (https://github.com/sistinafibel/RockPaperScissors)";
    }
    //가위바위보 시작
    else if (userSelection == "가위" && botSelection[result] == "바위" || userSelection == "바위" && botSelection[result] == "보" || userSelection == "보" && botSelection[result] == "가위") {
        botReterun = botReterun + "[컴퓨터 승리]";
        return_text = "computer";

    }else if (userSelection == "가위" && botSelection[result] == "보" || userSelection == "바위" && botSelection[result] == "가위" || userSelection == "보" && botSelection[result] == "바위") {
        botReterun = botReterun + "[인간 승리]";
        return_text = "user";
    }else {
        botReterun = botReterun + "가위바위보가 아닌것 같아요. 상세 명령어는 도움말을 입력해주세요.";
    }

    var jsonObject = {
        "body" : botReterun ,
        "userSelection" : userSelection,
        "aiSelection" : botSelection[result],
        "winnerReturn" : return_text
    };

    res.writeHead(200, {
        'Content-Type': 'text/json;charset=utf-8'
    });
    res.end(JSON.stringify(jsonObject));

});


app.listen(3080, function() {

    console.log("*  간단 가위바위보");
    console.log("*  버전 : 1.0 ver ( "+ver+" )");
    console.log("*  개발 : Sistinafibel(https://github.com/sistinafibel/RockPaperScissors)");

    //3000번 포트 사용해서 오픈
    console.log('3080번 포트가 열렸습니다.');
});