class RockPaperScissors {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.currentRound = 1;
        this.maxRounds = 5;
        this.gameEnded = false;
        
        this.choices = {
            rock: { emoji: '🪨', name: 'Rock' },
            paper: { emoji: '📄', name: 'Paper' },
            scissors: { emoji: '✂️', name: 'Scissors' }
        };

        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        // Choice buttons
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.gameEnded) {
                    const choice = e.currentTarget.dataset.choice;
                    this.playRound(choice);
                }
            });
        });

        // Play again button
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.resetGame();
        });
    }

    playRound(playerChoice) {
        // Disable buttons during round
        this.disableButtons(true);
        
        // Show player choice immediately
        this.displayPlayerChoice(playerChoice);
        
        // Show computer thinking animation
        this.showComputerThinking();
        
        // After 1 second, reveal computer choice and result
        setTimeout(() => {
            const computerChoice = this.getComputerChoice();
            const result = this.determineWinner(playerChoice, computerChoice);

            this.displayComputerChoice(computerChoice);
            this.displayResult(result);
            this.updateScore(result);
            this.currentRound++;

            // Show result for 2 more seconds, then continue
            setTimeout(() => {
                if (this.currentRound > this.maxRounds) {
                    this.endGame();
                } else {
                    this.updateDisplay();
                    this.hideChoices();
                    this.disableButtons(false);
                }
            }, 2000);
        }, 1000);
    }

    disableButtons(disabled) {
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.disabled = disabled;
            btn.style.opacity = disabled ? '0.6' : '1';
            btn.style.cursor = disabled ? 'not-allowed' : 'pointer';
        });
    }

    displayPlayerChoice(playerChoice) {
        const choicesContainer = document.getElementById('choicesContainer');
        const playerChoiceElement = document.getElementById('playerChoice');
        const playerChoiceNameElement = document.getElementById('playerChoiceName');

        playerChoiceElement.textContent = this.choices[playerChoice].emoji;
        playerChoiceNameElement.textContent = this.choices[playerChoice].name;

        choicesContainer.style.display = 'grid';
        
        // Add animation for player choice
        playerChoiceElement.style.animation = 'none';
        setTimeout(() => {
            playerChoiceElement.style.animation = 'popIn 0.5s ease-out';
        }, 50);
    }

    showComputerThinking() {
        const computerChoiceElement = document.getElementById('computerChoice');
        const computerChoiceNameElement = document.getElementById('computerChoiceName');
        
        // Show thinking animation
        computerChoiceElement.textContent = '🤔';
        computerChoiceNameElement.textContent = 'Thinking...';
        computerChoiceElement.style.animation = 'thinking 0.8s infinite';
    }

    displayComputerChoice(computerChoice) {
        const computerChoiceElement = document.getElementById('computerChoice');
        const computerChoiceNameElement = document.getElementById('computerChoiceName');

        computerChoiceElement.textContent = this.choices[computerChoice].emoji;
        computerChoiceNameElement.textContent = this.choices[computerChoice].name;
        
        // Add reveal animation
        computerChoiceElement.style.animation = 'popIn 0.5s ease-out';
    }

    getComputerChoice() {
        const choices = Object.keys(this.choices);
        return choices[Math.floor(Math.random() * choices.length)];
    }

    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'tie';
        }

        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };

        return winConditions[playerChoice] === computerChoice ? 'win' : 'lose';
    }

    displayChoices(playerChoice, computerChoice) {
        // This method is now split into displayPlayerChoice and displayComputerChoice
        // Keeping for backward compatibility but not used in new flow
    }

    displayResult(result) {
        const resultMessage = document.getElementById('resultMessage');
        let message = '';
        let className = '';

        switch (result) {
            case 'win':
                message = 'You Win! 🎉';
                className = 'win';
                break;
            case 'lose':
                message = 'Computer Wins! 🤖';
                className = 'lose';
                break;
            case 'tie':
                message = "It's a Tie! 💛";
                className = 'tie';
                break;
        }

        resultMessage.textContent = message;
        resultMessage.className = `result-message ${className}`;
    }

    updateScore(result) {
        if (result === 'win') {
            this.playerScore++;
        } else if (result === 'lose') {
            this.computerScore++;
        }
    }

    updateDisplay() {
        document.getElementById('playerScore').textContent = this.playerScore;
        document.getElementById('computerScore').textContent = this.computerScore;
        document.getElementById('currentRound').textContent = this.currentRound;
    }

    hideChoices() {
        const choicesContainer = document.getElementById('choicesContainer');
        const resultMessage = document.getElementById('resultMessage');
        
        choicesContainer.style.display = 'none';
        resultMessage.textContent = '';
        resultMessage.className = 'result-message';
    }

    endGame() {
        this.gameEnded = true;
        const gameArea = document.getElementById('gameArea');
        const gameOver = document.getElementById('gameOver');
        const gameOverTitle = document.getElementById('gameOverTitle');
        const gameOverMessage = document.getElementById('gameOverMessage');
        const finalScore = document.getElementById('finalScore');

        let title = 'Game Over!';
        let message = '';

        if (this.playerScore > this.computerScore) {
            title = 'Congratulations! 🎉';
            message = '🎊 You won this epic battle!';
        } else if (this.computerScore > this.playerScore) {
            title = 'Game Over!';
            message = '🤖 Computer wins this time!';
        } else {
            title = 'Amazing!';
            message = "🤝 It's a perfect tie!";
        }

        gameOverTitle.textContent = title;
        gameOverMessage.textContent = message;
        finalScore.textContent = `Final Score: ${this.playerScore} - ${this.computerScore}`;

        gameArea.style.display = 'none';
        gameOver.style.display = 'block';
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.currentRound = 1;
        this.gameEnded = false;

        document.getElementById('gameArea').style.display = 'block';
        document.getElementById('gameOver').style.display = 'none';
        
        this.hideChoices();
        this.updateDisplay();
        this.disableButtons(false);
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RockPaperScissors();
});

// Add some visual feedback for button interactions
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.choice-btn, .play-again-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    const keyMap = {
        'r': 'rock',
        'p': 'paper',
        's': 'scissors'
    };
    
    const choice = keyMap[e.key.toLowerCase()];
    if (choice) {
        const button = document.querySelector(`[data-choice="${choice}"]`);
        if (button && !button.disabled) {
            button.click();
            button.style.transform = 'translateY(-1px) scale(0.98)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        }
    }
});