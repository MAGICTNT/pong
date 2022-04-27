let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let game;

canvas.addEventListener("mousemove", playerMove);

canvas.width = 1800;
canvas.height = window.innerHeight;

const PLAYER_HEIGHT = 120;
const PLAYER_WIDTH = 10;

function draw() {
  // couleur du fond
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // couleur de la bare central
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  // couleur des joueur
  ctx.fillStyle = "green";
  ctx.fillRect(0, game.player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  ctx.fillStyle = "yellow";
  ctx.fillRect(
    canvas.width - PLAYER_WIDTH,
    game.computer.y,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  );
  // couleur de la ball
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI * 2, false);
  ctx.fill();
}

document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("canvas");
  game = {
    player: {
      y: canvas.height / 2 - PLAYER_HEIGHT / 2,
    },
    computer: {
      y: canvas.height / 2 - PLAYER_HEIGHT / 2,
    },
    ball: {
      x: canvas.width / 2,
      y: canvas.height / 2,
      r: 8,
      speed: {
        x: 2,
        y: 0,
      },
    },
  };

  game.ball.x += 2;
  game.ball.y += 2;
  draw();
  play();
  function play() {
    game.ball.x += game.ball.speed.x;
    game.ball.y += game.ball.speed.y;
    draw();
    function ballMove() {
      if (game.ball.y > canvas.height || game.ball.y < 0) {
        game.ball.speed.y *= -1.2;
      }
      if (game.ball.x > canvas.width - PLAYER_WIDTH) {
        collide(game.computer);
      } else if (game.ball.x < PLAYER_WIDTH) {
        collide(game.player);
      }
      game.ball.x += game.ball.speed.x;
      game.ball.y += game.ball.speed.y;
    }
    computerMove();
    ballMove();
    requestAnimationFrame(play);
  }
});
/*mouvement jouer*/
function playerMove(event) {
  let canvasLocation = canvas.getBoundingClientRect();
  let mouseLocation = event.clientY - canvasLocation.y;
  game.player.y = mouseLocation - PLAYER_HEIGHT / 2;

  //       une condition pour la colision
  if (mouseLocation < PLAYER_HEIGHT / 2) {
    game.player.y = 0;
  } else if (mouseLocation > canvas.height - PLAYER_HEIGHT / 2) {
    game.player.y = canvas.height - PLAYER_HEIGHT;
  } else {
    game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
  }
}
/*mouvement ordi*/
function computerMove() {
  game.computer.y += game.ball.speed.y * 2.2;
}
function collide(player) {
  if (game.ball.y < player.y || game.ball.y > player.y + PLAYER_HEIGHT) {
    game.ball.x = canvas.width / 2;
    game.ball.y = canvas.height / 2;
    game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
    game.computer.y = canvas.height / 2 - PLAYER_HEIGHT / 2;

    game.ball.speed.x = 2;
  } else {
    game.ball.speed.x *= -1.2;
    changeDirection(player.y);
  }
}

function changeDirection(playerPosition) {
  let impact = game.ball.y - playerPosition - PLAYER_HEIGHT / 2;
  let ratio = 100 / (PLAYER_HEIGHT / 2);
  // multiplicateur
  game.ball.speed.y = Math.round((impact * ratio) / 25);
}
