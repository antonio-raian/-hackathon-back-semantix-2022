require('dotenv').config();
const { uuid } = require('uuidv4');

const users = JSON.parse(process.env.USERS);
let winner;

let active = false;
let segNum = 00;
let minNum = 00;
let hour = 01;
let INTERVALO;

function segundos() {
  segNum--;
  if (segNum < 0) {
    segNum = 59;
    return minutos();
  }
  return segNum;
}

function minutos() {
  minNum--;
  if (minNum < 0) {
    minNum = 59;
    return horas();
  }
  return minNum;
}

function horas() {
  hour--;
  hour < 0 && clearInterval(INTERVALO);
  return hour;
}

function iniciar() {
  if(winner) return {msg: "Já existe um ganhador!"}
  active = true;

  clearInterval(INTERVALO);
  INTERVALO = setInterval(() => {
    console.log({ hour, minNum, segNum, users });
    segundos();
  }, 1000);
  return {msg: "Timer Iniciado"}
}

function getTimer() {
  return { hour, minNum, segNum, active, winner };
}

// -------------------------------------------

function passwdValidade({ id, passwd }) {
  if (!active) return { sucess: false, msg: 'Não é possível fazer tentativas!! Timer Parado!' };
  
  const user = users.find((user) => user.id === id);
  if (!user) return { sucess: false, msg: 'Usuário não encontrado' };

  if (user?.attempts < 3) {
    if (process.env.SENHA === passwd) {
      clearInterval(INTERVALO);
      active = false;
      winner = user;
      return { success: true, user };
    }
    user.attempts += 1;
    return { sucess: false, msg: `Você já usou ${user.attempts} de 3 tentativas!!` };
  }
  return { sucess: false, msg: 'Você não possui mais tentativas!!' };
}

module.exports = { iniciar, getTimer, passwdValidade };
