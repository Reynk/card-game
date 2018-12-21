let card, cards = [];
let positions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
let defaultImage = "https://images.icanvas.com/list-square/nav-gray.jpg";
let selectedCard1, selectedCard2;
let score = 0;
let penalties = 0;

function initCards(){
    for(let i=0; i<=1; i++ ) {
        card = {
            front: "https://www.brainhq.com/sites/default/files/images/tb_autobiographical.png",
            back: defaultImage,
            position: getPosition(),
            flipped: false
        };
        cards.push(card);
        card = {
            front: "https://www.brainhq.com/sites/default/files/images/tb_memorytypes.png",
            back: defaultImage,
            position: getPosition(),
            flipped: false
        };
        cards.push(card);
        card = {
            front: "https://www.brainhq.com/sites/default/files/images/tb_longterm.png",
            back: defaultImage,
            position: getPosition(),
            flipped: false
        };
        cards.push(card);
        card = {
            front: "https://www.brainhq.com/sites/default/files/images/tb_shortterm.png",
            back: defaultImage,
            position: getPosition(),
            flipped: false
        };
        cards.push(card);
        card = {
            front: "https://www.brainhq.com/sites/default/files/images/tb_morpheus.png",
            back: defaultImage,
            position: getPosition(),
            flipped: false
        };
        cards.push(card);
        card = {
            front: "https://www.brainhq.com/sites/default/files/images/tb_explicit.png",
            back: defaultImage,
            position: getPosition(),
            flipped: false
        };
        cards.push(card);
        card = {
            front: "https://www.magneticmemorymethod.com/wp-content/uploads/2016/09/brain-exercises-magnetic-memory-method-podcast-150x150.jpg",
            back: defaultImage,
            position: getPosition(),
            flipped: false
        };
        cards.push(card);
        card = {
            front: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo_5K8tw_5pM3X_lMkU3OIhWHk7pUE-UfntLlYR1i8S30v6w2K",
            back: defaultImage,
            position: getPosition(),
            flipped: false
        };
        cards.push(card);
    }
}

$(document).ready(function(){
    initCards();
    shuffleCards();
    cards.forEach( logCard);
    for(let i=1; i<=16; i++) {
        //console.log("assign:", cards[i-1].position);
        
        $("#"+cards[i-1].position + "> .front").html('<img src="' + cards[i-1].front + '" />');
    }
    $("#score-span").html(score); 
    $("#progress-score").html(score);
    $(".progress-bar").css("width", score+"%");
})

function logCard(card) {
    console.log(card);
}

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function findCardWithPosition(pos) {
    for(let c of cards) {
        if(c.position === pos) return c;
    }
}

function computeScore(){
    score = score + (10-penalties);
    $("#score-span").html(score);
    $("#progress-score").html(score);
    $(".progress-bar").css("width", score+"%");
    checkForEnd();
}

function checkForEnd() {
    let ended = true;
    for(let c of cards){
        if(!c.flipped) ended = false;
    }
    if(ended) {
        $("#end-div").html("<br><span><h1>~ END ~</h1></span><br><h1><span id='congrats-span'>*** Congratulations!! ***</span></h1>");
    }
}

function flip(card) {
    let cardId = parseInt(card.id);
    console.log("selected ", cardId);
    let caseNo;
    
    let selCard = findCardWithPosition(cardId);

    if(!selCard.flipped){
        if(!selectedCard1 && !selectedCard2) caseNo = 0;
        if(selectedCard1 && !selectedCard2) caseNo = 1;
        if(selectedCard1 && selectedCard2) caseNo = 2;
        //if((selectedCard1 && selectedCard2) && (selectedCard1.flipped || selectedCard2.flipped)) caseNo = 4;

        switch (caseNo) {
            case 0:
                selectedCard1 = selCard;
                $("#"+cardId).addClass("card-flip");
                console.log("selectedCard1:", selectedCard1.position);
                break;
            case 1:
                selectedCard2 = selCard;
                $("#"+cardId).addClass("card-flip");
                
                console.log("selectedCard2:", selectedCard2.position);
                console.log(verifyCards(selectedCard1, selectedCard2));
                break;
            case 2:
                // console.log("pos1", selectedCard1.position);
                // console.log("pos2", selectedCard2.position);
                if(verifyCards(selectedCard1, selectedCard2)){
                    selectedCard1.flipped = true;
                    selectedCard2.flipped = true;
                    computeScore();
                    penalties = 0;
                }
                else {
                    $("#"+selectedCard1.position).removeClass("card-flip");
                    $("#"+selectedCard2.position).removeClass("card-flip");
                    if(penalties < 10) penalties++;
                }
                selectedCard1 = null;
                selectedCard2 = null;
                console.log("flipped back the cards")
                break;
            default: break;
        }
    }
        // selectedCard1 = cards[cardId];
        // $("#"+cardId).addClass("card-flip");

    
    
    
}


function verifyCards(card1, card2) {
    let correct = false;
    if(card1.front === card2.front) 
        correct = true;
    return correct;
}

function getPosition() {
    let random = Math.floor(Math.random() * positions.length) + 1;
    //console.log("random:", random);
    //console.log("positions [before]", positions);
    let selectedPosition = positions.splice(random-1, 1);
    //console.log("positions [after]", positions);
    return selectedPosition[0];
}