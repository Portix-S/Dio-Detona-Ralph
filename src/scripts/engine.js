const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      life: document.querySelector("#life"),
    },
    values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      curretTime: 60,
      life: 5,
      maxLife: 5,
      hitEnemy: false,
    },
    actions: {
      timerId:  null,
      countDownTimerId: null,
    },
  };
  
  function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
  
    if (state.values.curretTime <= 0) {
      GameOver();
    }
  }

  function GameOver()
  {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
      });
    alert("Game Over! O seu resultado foi: " + state.values.result);
    ResetValues();  
  }
  
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    if(audioName === "error")
    {
        audio.volume = 0.99;
    }
    else
        audio.volume = 0.07;

    audio.play();
  }
  
  function randomSquare() {
    if(!state.values.hitEnemy)
    {
        spawnEnemy();
    }
    else
    {
        state.values.hitEnemy = false;
    }
  }

  function spawnEnemy()
  {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
      });
      let randomNumber = Math.floor(Math.random() * 9);
      let randomSquare = state.view.squares[randomNumber];
      randomSquare.classList.add("enemy");
      state.values.hitPosition = randomSquare.id;
  }

  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
          state.values.hitEnemy = true;
          spawnEnemy();
        }
        else
        {
            playSound("error");
            state.values.life--;
            state.view.life.textContent = `x${state.values.life}`;
            if(state.values.life <= 0)
            {
                GameOver();
            }
        }
      });
    });
  }
  
  function initialize() {
    ResetValues();  
    addListenerHitBox();
  }

  function ResetValues()
  {
    state.values.result = 0;
    state.values.curretTime = 60;
    state.values.life = state.values.maxLife;
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.life.textContent = `x${state.values.life}`;
  }
  
  initialize();
  