/*
    tictactoe.js
    Matthew Stevens
    May 22, 2018
*/

/**************** Global Variables *************/
var board = [];
var currPlayer;
var p1Wins;
var p2Wins;
var numTurns;

/**************** Objects *************/
var view = {
    
    /*
        Updates the board array to display corresponding move.
    */
    updateBoard: function(move)
    {
        board[move] = controller.currentPlayer();
        this.changeBoard(move); // update actual board to display corresponding X or O
        numTurns++;
        
        // if victory
        if (controller.won())
        {
            var curr = currPlayer;
            
            alert("Player: " + curr + " wins!");
            
            var answer = confirm("Would you like to play again?");
            
            if (answer)
            {
                this.updateScore(curr);
                
                // create storage to save the scores for each player
                sessionStorage.setItem("p1Wins", p1Wins);
                sessionStorage.setItem("p2Wins", p2Wins);
                
                location.reload();
            }
            
            else
            {
                // reset scores to zero
                sessionStorage.setItem("p1Wins", 0);
                sessionStorage.setItem("p2Wins", 0);
                
                location.reload();
            }
        }
        
        // if draw
        else if (controller.boardFull())
        {   
            alert("It's a draw!");
            
            var answer = confirm("Would you like to play again?");
            
            if (answer)
            {
                // create storage to save the scores for each player
                sessionStorage.setItem("p1Wins", p1Wins);
                sessionStorage.setItem("p2Wins", p2Wins);
                
                location.reload();
            }
            
            else
            {
                // reset scores to zero
                sessionStorage.setItem("p1Wins", 0);
                sessionStorage.setItem("p2Wins", 0);
                
                location.reload();
            }
        }
        
        else
        {
            controller.updatePlayer(currPlayer);   // updates the player
            this.updateCurrPlayer(currPlayer);     // updates representation on board of player
        }
    },
    
    /*
        Updates the graphic representation of the move
        based on the indicated tabel cell number.
    */
    changeBoard: function(move)
    {
        var identifier = getId(move);   // gets correct ID for box to be assigned
        var el = document.getElementById(identifier);
        
        el.innerHTML = board[move];
        
        // styling
        el.style.fontSize = "48px";
        el.style.textAlign = "center";
    },
    
    /*
        Updates corresponding player's score and also
        updates the screen to display this information.
    */
    updateScore: function(player)
    {
        var el = document.getElementById(player);
        
        if (player == "p1")
            p1Wins++;
        else
            p2Wins++;
        
        el.innerHTML = (player == "p1") ? "P1 Wins: " + p1Wins : "P2 Wins: " + p2Wins;
    },
    
    /*
        Updates the screen to display the
        current player.
    */
    updateCurrPlayer: function(player)
    {
        var el = document.getElementById("current");
        
        if (player == "p1")
            player = "Player One";
        else
            player = "Player Two";
        
        el.innerHTML = "Current Player: " + player;
    },
    
    /*
        Retrieves and displays the initial score to display
        for the indicated player upon loading the game.
    */
    showInitScore: function(player)
    {
        var el = document.getElementById(player);
        
        if (player == "p1")
            el.innerHTML = "P1 Wins: " + p1Wins;
        else
            el.innerHTML = "P2 Wins: " + p2Wins;
    },
};

var controller = {
    
    /*
        Updates the current player.
    */
    updatePlayer: function(player)
    {
        if (player == "p1")
            currPlayer = "p2";
        else
            currPlayer = "p1";
    },
    
    /*
        Gives the corresponding letter
        for the current player.
    */
    currentPlayer: function()
    {
        if (currPlayer == "p1")
            return "X";
        else
            return "O";
    },
    
    /*
        Checks to see if either player won.
    */
    won: function()
    {
        if (board[0] == "X" && board[1] == "X" && board[2] == "X")
            return true;
        
        if (board[0] == "O" && board[1] == "O" && board[2] == "O")
            return true;
        
        if (board[0] == "X" && board[3] == "X" && board[6] == "X")
            return true;
        
        if (board[0] == "O" && board[3] == "O" && board[6] == "O")
            return true;
        
        if (board[1] == "X" && board[4] == "X" && board[7] == "X")
            return true;
        
        if (board[1] == "O" && board[4] == "O" && board[7] == "O")
            return true;
        
        if (board[2] == "X" && board[5] == "X" && board[8] == "X")
            return true;
        
        if (board[2] == "O" && board[5] == "O" && board[8] == "O")
            return true;
        
        if (board[3] == "X" && board[4] == "X" && board[5] == "X")
            return true;
        
        if (board[3] == "O" && board[4] == "O" && board[5] == "O")
            return true;
        
        if (board[6] == "X" && board[7] == "X" && board[8] == "X")
            return true;
        
        if (board[6] == "O" && board[7] == "O" && board[8] == "O")
            return true;
        
        if (board[0] == "X" && board[4] == "X" && board[8] == "X")
            return true;
        
        if (board[0] == "O" && board[4] == "O" && board[8] == "O")
            return true;
        
        if (board[6] == "X" && board[4] == "X" && board[2] == "X")
            return true;
        
        if (board[6] == "O" && board[4] == "O" && board[2] == "O")
            return true;
        
        else
            return false;
    },
    
    /*
        Checks to see if the board is full.
    */
    boardFull: function()
    {   
        return (numTurns == 9);
    },
};

/**************** Main Functions *************/
/*
    Sets up the page.
*/
function initialize()
{
    // store zero if no sessionStorage has been created
    p1Wins = (sessionStorage.getItem("p1Wins") != null) ? sessionStorage.getItem("p1Wins") : 0;
    p2Wins = (sessionStorage.getItem("p2Wins") != null) ? sessionStorage.getItem("p2Wins") : 0;
    
    for (var i = 0; i < board.length; i++)
    {
        board[i] = "";
    }
    
    currPlayer = "p1";
    numTurns = 0;
    
    view.showInitScore("p1");
    view.showInitScore("p2");
}

/*
    Updates the screen to
    show the player's move.
*/
function update(move)
{
    view.updateBoard(move);
}

/*
    Gets the ID of the corresponding table
    data tag indicated by the move number
    and returns it.
*/
function getId(move)
{
    switch(move)
    {
        case 0:
            return "zero";
            break;
            
        case 1:
            return "one";
            break;
            
        case 2:
            return "two";
            break;
            
        case 3:
            return "three";
            break;
            
        case 4:
            return "four";
            break;
            
        case 5:
            return "five";
            break;
            
        case 6:
            return "six";
            break;
            
        case 7:
            return "seven";
            break;
            
        case 8:
            return "eight";
            break;
        
        default:
            return "INVALID";
    }
}