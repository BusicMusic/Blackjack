//creating global variables to make it easier to alter them throughout the game
var DrawnCards= 0;
var PlayerHand= [];
var DealerHand= [];
var ShuffledDeck= [];
var DealerDraw= true;
var PlayerDraw= true;

function startGame(){
    document.getElementById("drawBtn").disabled= false;
    var freshDeck= [
        "A of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "J of Hearts", "Q of Hearts", "K of Hearts",

        "A of Spades", "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "J of Spades", "Q of Spades", "K of Spades",

        "A of Diamonds", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "J of Diamonds", "Q of Diamonds", "K of Diamonds",

        "A of Clubs", "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "J of Clubs", "Q of Clubs", "K of Clubs"
    ];

    var pictureDeck= freshDeck;
    for (var cnt=0; cnt<pictureDeck.length; cnt++){
        pictureDeck[cnt]=addImages(cnt);
    }

    function addImages(cnt){
        pictureDeck[cnt]= (""+ pictureDeck[cnt]+ ".png");
        // console.log(pictureDeck[cnt]);
        return pictureDeck[cnt];
    }

    //clears both of the players' hands and resets the DrawnCards number to 0, keeping the previous game's hands and dealt cards from overflowing into the next game
    clearArray(PlayerHand);
    clearArray(DealerHand);
    clearArray(ShuffledDeck);

    DrawnCards= 0;
    DealerDraw= true;
    PlayerDraw= true;

    //shuffling the deck
    ShuffledDeck= shuffleDeck(pictureDeck);

    DrawnCards= dealCards(PlayerHand, ShuffledDeck, DrawnCards);
    DrawnCards= dealCards(DealerHand, ShuffledDeck, DrawnCards);

    showCards("player", PlayerHand);
    showCards("dealer", DealerHand);
    updateInfo("player");
    updateInfo("dealer");
}
function clearArray(array){
    while (array.length>0)
        array.pop();
}
function randomNum(range){
    return Math.floor(Math.random() * (range) + 1);
}
function shuffleDeck(arrayHolder){
    for (let i = arrayHolder.length - 1; i > 0; i--){
        const J = Math.floor(Math.random()* (i+1));
        [arrayHolder[i], arrayHolder[J]] = [arrayHolder[J], arrayHolder[i]];
    }
    return arrayHolder;
}

function dealCards(hand, Deck, DrawnCards){
    for (var cnt= 0; cnt< 2; cnt++){
        hand.push(Deck[DrawnCards]);
        // console.log(DrawnCards);
        DrawnCards++;
    }
    return DrawnCards;
}

function showCards(Area, Hand){
    var X= document.getElementById(Area+ "Area");
    X.innerHTML=("");
    if (Area == "dealer"){
        if (DrawnCards<5){
            X.innerHTML+=("<img class='"+ Area+ "Cards' src='"+ Hand[0]+ "'></img>");
            X.innerHTML+=("<img class='"+ Area+ "Cards' src='Paint Splat Card Back.png'></img>");
        }
        else{
            for (var cnt= 0; cnt< Hand.length; cnt++){
                X.innerHTML+= ("<img class='"+ Area+ "Cards' src='"+ Hand[cnt]+ "'></img>");
            }
        }
    }
    else if (Area == "player"){
        for (var cnt= 0; cnt< Hand.length; cnt++){
            X.innerHTML+= ("<img class='"+ Area+ "Cards' src='"+ Hand[cnt]+ "'></img>");
        }
    }
}
function updateInfo(player){
    var X= document.getElementById(player+"Info");
    var CardValues=0;
    if (player=="player"){
        CardValues= handValue(PlayerHand, "player");
        if (CardValues>=21)
            PlayerDraw= false;
        X.innerHTML=("Your Hand | Card Total: "+ CardValues);
    }
    else if (player=="dealer"){
        CardValues= handValue(DealerHand, "dealer");
        if (CardValues>16)
            DealerDraw= false;
        if (DrawnCards<5)
            X.innerHTML=("Dealer's Hand | Card Total: ?");
        if (DrawnCards>4)
            X.innerHTML=("Dealer's Hand | Card Total: "+ CardValues);
    }
    else if (player="reset"){
        CardValues= 0;
        document.getElementById("playerInfo").innerHTML=("Dealer's Hand | Card Total: ?");
        document.getElementById("dealerInfo").innerHTML=("Player's Hand | Card Total: ?");
    }
}
function handValue(Hand, player){
    console.log(Hand);
    var CardValues= 0;
    var num=0;
    for (var cnt=0; cnt<Hand.length; cnt++){
        var temp= Hand[cnt].substring(0, 2);
        console.log(temp);
        switch(temp){
                case "A ":
                    num= 1;
                    break;
                case "2 ":
                    num=2;
                    break;
                case "3 ":
                    num=3;
                    break;
                case "4 ":
                    num=4;
                    break;
                case "5 ":
                    num=5;
                    break;
                case "6 ":
                    num=6;
                    break;
                case "7 ":
                    num=7;
                    break;
                case "8 ":
                    num=8;
                    break;
                case "9 ":
                    num=9;
                    break;
                case "10":
                    num=10;
                    break;
                case "J ":
                    num=10;
                    break;
                case "Q ":
                    num=10;
                    break;
                case "K ":
                    num=10;
                    break;
                default:
                    console.log("*****ERROR: Could not get the value of the card!!*****");
        }
        CardValues+= num;
    }
    if (CardValues>21){
        setTimeout(()=> {Busted(player)}, 750);
    }
    return CardValues;
}

function Busted(player){
    if (player=="player"){
        console.log(player+ " has busted");
        var modalTxt= document.getElementById("modalText");
        modalTxt.innerHTML=("Game Concluded! You have busted! The House always wins.");
        showPopup();
    }
    else if (player=="dealer"){
        console.log(player+ " has busted");
        var modalTxt= document.getElementById("modalText");
        modalTxt.innerHTML=("Game Concluded! The Dealer has busted! Congratulations for beating the House. This time...");
        showPopup();
    }
    else
        console.log("yeah somethin don fucked up");

    function showPopup(){
        var modal= document.getElementById("myModal");
        var span= document.getElementsByClassName("close")[0];
        modal.style.display= "block";
        span.onclick= function(){
            modal.style.display= "none";
            // clearTable();
        }
        window.onclick= function(event){
            if (event.target== modal)
            modal.style.display= "none";
            // clearTable();
        }
    }
}
function winner(player){
    if (player=="player"){
        console.log(player+ " has won");
        var modalTxt= document.getElementById("modalText");
        modalTxt.innerHTML=("Game Concluded! You have won! Congratulations for beating the House. This time, at least...");
        showPopup();
    }
    else if (player=="dealer"){
        console.log(player+ " has won");
        var modalTxt= document.getElementById("modalText");
        modalTxt.innerHTML=("Game Concluded! The Dealer has won! The House always wins.");
        showPopup();
    }
    else
        console.log("yeah somethin really fucked up");

    function showPopup(){
        var modal= document.getElementById("myModal");
        var span= document.getElementsByClassName("close")[0];
        modal.style.display= "block";
        span.onclick= function(){
            modal.style.display= "none";
            // clearTable();
            // startGame();
        }
        window.onclick= function(event){
            if (event.target== modal)
            modal.style.display= "none";
            // clearTable();
            // startGame();
        }
    }
}
function drawCard(){
    if (PlayerDraw==true)
        addCard("player");
    updateInfo("player");

    if (DealerDraw==true)
        setTimeout(()=> {addCard("dealer")}, 750);
    else if (DealerDraw==false)
        showCards("dealer", DealerHand);
    setTimeout(()=> {updateInfo("dealer")}, 750);
}
function addCard(player){
    var Hand= [];
    switch (player){
        case "player":
            Hand= PlayerHand;
            break;
        case "dealer":
            Hand= DealerHand;
            break;
        default:
        console.log("*****ERROR IN drawCard() FUNCTION!!*****");
    }
    if (DrawnCards<52){
        Hand.push(ShuffledDeck[DrawnCards]);
        DrawnCards++;
    }
    else{
        console.log("**No more cards to draw!**");
    }

    //updating the visible cards now that a player has drawn a card
    showCards(player, Hand);
}

function stay(){
    PlayerDraw= false;
    if (DealerDraw==true){
        drawCard();
    }
    if ((PlayerDraw==false) && (DealerDraw==false))
        compareCards()
}
function compareCards(){
    var playerTotal= handValue(PlayerHand, "player");
    var dealerTotal= handValue(DealerHand, "dealer");

    if (playerTotal>dealerTotal){
        setTimeout(()=> {winner("player")}, 750);
    }
    else if (dealerTotal>playerTotal){
        setTimeout(()=> {winner("dealer")}, 750);
    }
    else if (playerTotal==dealerTotal){
        setTimeout(()=> {winner("dealer")}, 750);
    }
}   


function clearTable(){
    document.getElementById("dealerArea").innerHTML=("");
    document.getElementById("playerArea").innerHTML=("");
    clearArray(PlayerHand);
    clearArray(DealerHand);
    updateInfo("reset");

    DrawnCards= 0;
    DealerDraw= true;
    PlayerDraw= true;
}
