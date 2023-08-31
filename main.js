let sequence = [];
let humanSequence = [];
let level = 0;

const maxLevel = 7
const allTiles = ['baa', 'bii', 'boo', 'be',  'chaa', 'chii', 'choo', 'che']; //, 'ba', 'bi', 'bo','cha', 'chi', 'cho', 'daa', 'dii', 'doo', 'de', 'da', 'di', 'do', 'gaa', 'gii', 'goo', 'ge', 'ga', 'gi', 'go', 'jaa', 'jii', 'joo', 'je', 'ja', 'ji', 'jo', 'kaa', 'kii', 'koo', 'ke', 'ka', 'ki', 'ko', 'naa', 'nii', 'noo', 'ne', 'na', 'ni', 'no', 'paa', 'pii', 'poo', 'pe', 'pa', 'pi', 'po', 'saa', 'sii', 'soo', 'se', 'sa', 'si', 'so', 'shaa', 'shii', 'shoo', 'she', 'sha', 'shi', 'sho', 'taa', 'tii', 'too', 'te', 'ta', 'ti', 'to', 'waa', 'wii', 'woo', 'we', 'wa', 'wi', 'wo', 'zaa', 'zii', 'zoo', 'ze', 'za', 'zi', 'zo', 'zhaa', 'zhii', 'zhoo', 'zhe', 'zha', 'zhi', 'zho'];

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function handleClick(tile) {
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();
  
    const remainingTaps = sequence.length - humanSequence.length;

    if (humanSequence[index] !== sequence[index]) {
        resetGame('Kaa! Gaawiin goyak.');
        return;
    }

    if (humanSequence.length === sequence.length) {
        if (humanSequence.length === maxLevel) {
            resetGame('Gigii bakanaage!');
            return
          }
        humanSequence = [];
        info.textContent = 'Nishin!';
        setTimeout(() => {
            nextRound();
        }, 1000);
        return;
    }
  
    info.textContent = `Giin nitam: ${remainingTaps} geyaabi`;
  }
function startGame() {
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent = 'Wait for the computer';
    nextRound();
}

function resetGame(text) {
    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Kidwinensak Damnowin';
    info.classList.add('hidden');
    tileContainer.classList.add('unclickable');
  }

function humanTurn(level) {
    tileContainer.classList.remove('unclickable');
    info.textContent = `Giin nitam: ${remainingTaps} geyaabi`;
}

function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);
  
    tile.classList.add('activated');
    sound.play();
  
    setTimeout(() => {
      tile.classList.remove('activated');
    }, 300);
  }
  
function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
      setTimeout(() => {
        activateTile(color);
      }, (index + 1) * 600);
    });
  }
function nextStep(currentStep) {
    const tiles = allTiles;
    let random = tiles[Math.floor(Math.random() * tiles.length)];
    while (random == currentStep) {
        random = tiles[Math.floor(Math.random() * tiles.length)];
    }
    
    return random;
  }
function nextRound() {
    level += 1;
    tileContainer.classList.add('unclickable');
    info.textContent = 'Baabii\'aan';
    heading.textContent = `Level ${level} of ${maxLevel}`;
    // copy all the elements in the `sequence` array to `nextSequence`
    const nextSequence = [...sequence];
    nextSequence.push(nextStep(nextSequence[nextSequence.length - 1]));
    playRound(nextSequence)

    sequence = [...nextSequence];
    setTimeout(() => {
        humanTurn(level);
      }, level * 600 + 1000);
  }
startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
    const { tile } = event.target.dataset;
  
    if (tile) handleClick(tile);
  });

