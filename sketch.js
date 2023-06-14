//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//variáveis da velocidade da bolinha
let velocidadeXBolinha = 10;
let velocidadeYBolinha = 10;

//variáveis da raquete
let xRaquete = 1;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 75;
let raioRaquete = 10;
let colidiu = false;

//variáveis da raquete inimiga
let xRaqueteInimiga = 589;
let yRaqueteInimiga = 150;
let colidiuInimiga = false;
let velocidadeYInimiga;

//variáveis do placar
let meuPlacar = 0;
let placarInimigo = 0;

//variáveis dos sons
let raquetada;
let raquetadaInimiga
let colisaoBorda

function preload()
{
  raquetada = loadSound("pingRaquete.mp3");
  raquetadaInimiga = loadSound("pingRaqueteInimiga.mp3")
  colisaoBorda = loadSound("pingParede.mp3")
}

function setup() 
{
  createCanvas(600, 400);
}

function draw() 
{
  background(0);
  MostraTexto();
  MostraBolinha();
  MostraRaquete(xRaquete, yRaquete);
  MostraRaquete(xRaqueteInimiga, yRaqueteInimiga);

  MovimentaBolinha();
  MovimentaRaquete();
  MovimentaRaqueteInimiga();
  //MovimentaRaqueteInimigaAuto()
  //MovimentaRaquete(UP_ARROW, DOWN_ARROW, yRaquete);
  //MovimentaRaquete(87, 83, yRaqueteInimiga);

  VerificaColisaoBorda();
  //VerificaColisaoRaquete();
  VerificaColisaoRaqueteBiblioteca();
  VerificaPlacar();
  
}

function MostraTexto() 
{
  textAlign(CENTER);
  textSize(16);
  noStroke();
  
  fill(color(500));
  rect(149, 9, 42, 22, 3);
  
  fill(color(0));
  rect(150, 10, 40, 20, 3);
  
  fill(500);
  text(meuPlacar, 170, 26);
  
  fill(color(500));
  rect(449, 9, 42, 22, 3);
  
  fill(color(0));
  rect(450, 10, 40, 20, 3);
  
  fill(500);
  text(placarInimigo, 470, 26);
}

function MostraBolinha() 
{
  circle(xBolinha, yBolinha, diametro);
}

function MostraRaquete(x, y) 
{
  rect(x, y, comprimentoRaquete, alturaRaquete, raioRaquete);
}

function MovimentaBolinha() 
{
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function MovimentaRaquete() 
{
  if (keyIsDown(UP_ARROW)) 
  {
    yRaquete -= 7;
  }
  if (keyIsDown(DOWN_ARROW)) 
  {
    yRaquete += 7;
  }
  yRaquete = constrain(yRaquete, 0, 325);
}

function MovimentaRaqueteInimiga() 
{
  if (keyIsDown(87)) 
  {
    yRaqueteInimiga -= 7;
  }
  if (keyIsDown(83)) 
  {
    yRaqueteInimiga += 7;
  }
  yRaqueteInimiga = constrain(yRaqueteInimiga, 0, 325);
}

function MovimentaRaqueteInimigaAuto() 
{
  velocidadeYInimiga = yBolinha - yRaqueteInimiga - comprimentoRaquete / 2 - 30;
  yRaqueteInimiga += velocidadeYInimiga;
}

function VerificaColisaoBorda() 
{
  if (xBolinha + raio > width || xBolinha - raio < 0) 
  {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) 
  {
    velocidadeYBolinha *= -1;
    raquetada.play();
  }
}

function VerificaPlacar() 
{
  if (xBolinha + raio > width) 
  {
    meuPlacar += 1;
  }

  if (xBolinha - raio < 0) 
  {
    placarInimigo += 1;
  }
}

function VerificaColisaoRaquete() 
{
  if 
    (
    xBolinha - raio < xRaquete + comprimentoRaquete &&
    yBolinha - raio < yRaquete + alturaRaquete &&
    yBolinha + raio > yRaquete
    ) 
  {
    velocidadeXBolinha *= -1;
  }

  if 
    (
    xBolinha + raio > xRaqueteInimiga + comprimentoRaquete &&
    yBolinha - raio < yRaqueteInimiga + alturaRaquete &&
    yBolinha + raio > yRaqueteInimiga
    ) 
  {
    velocidadeXBolinha *= -1;
  }
}

function VerificaColisaoRaqueteBiblioteca() 
{
  colidiu = collideRectCircle
  (
    xRaquete,
    yRaquete,
    comprimentoRaquete,
    alturaRaquete,
    xBolinha,
    yBolinha,
    raio
  );
  colidiuInimiga = collideRectCircle
  (
    xRaqueteInimiga,
    yRaqueteInimiga,
    comprimentoRaquete,
    alturaRaquete,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu || colidiuInimiga) 
  {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
