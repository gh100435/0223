// 이상형 월드컵을 할 대상 이미지 Array
var imgArray = [
    './img/A.jpg',
    './img/B.jpg',
    './img/C.jpg',
    './img/D.jpg',
    './img/E.jpg',
    './img/F.jpg',
    './img/G.jpg',
    './img/H.jpg'
];

// 이상형 월드컵에서 이긴 이미지 Array;
var winArray = [];

// 파라미터로 받은 이미지 경로값으로 img태그의 src값을 설정.
function setImage(leftSrc, rightSrc) {
    let leftImg = document.getElementById("leftImg");
    let rightImg = document.getElementById("rightImg");
    leftImg.src = leftSrc;
    rightImg.src = rightSrc;
}

// 헤드의 텍스트 변경
function setHeadText(text) {
    let headText = document.getElementById('headText');
    headText.innerText = text;
}

// 시작할 때 초기화
let round = imgArray.length; // 8강, 4강, 2강
let set = 2;
setHeadText(`이상형 월드컵 ${set}/${round}`); // 초기 헤드텍스트
imgArray = shuffleArray(imgArray); // 이미지 섞어서 시작
setImage(imgArray[0], imgArray[1]); // 섞은 이미지

// 이미지가 클릭 될 떄 실행됨
function imgClick(id) {
    let img;

    if(id == 'leftImg') {
        img = "./img/" + document.getElementById("rightImg").getAttribute("src").split("/").pop();
    }else if(id == 'rightImg') {
        img = "./img/" + document.getElementById("leftImg").getAttribute("src").split("/").pop();
    }

    imgArray = imgArray.filter(item => item !== img); // 선택 안된 이미지 Array에서 제거
    imgArray.push(imgArray.shift()); // imgArray[0] => imgArray[i] 배열 끝으로 이동

    set += 2; // set수 더하기
    if(set > round) {
        imgArray = shuffleArray(imgArray);
        round = imgArray.length;
        set = 2;
    }

    if(round == 1) {
        document.body.innerHTML = "";

        var text = document.createElement("h1");
        text.textContent = "당신의 이상형은!";

        var lastImg = document.createElement("img");
        lastImg.src = imgArray[0];

        document.body.append(text, lastImg);
    }else {
        setImage(imgArray[0], imgArray[1]);
        setHeadText(`이상형 월드컵 ${set}/${round}`);
    }
}

// Array에 item이 존재하는지 알려줌
function hasItem(arr, item) {
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] === item){
            return true;
        }
    }
    return false;
}

// Array 뒤섞기
function shuffleArray(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 0에서 i까지의 무작위 인덱스
        [arr[i], arr[j]] = [arr[j], arr[i]]; // 요소를 스왑
    }
    return arr;
}