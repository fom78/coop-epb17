export const nameMonth = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

export const tipoPagos = ['COOPERADORA ANUAL','CUOTA','PARCIAL','COLABORACION','EMERGENCIA']
export function parseCurrency(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);
}
export function parseMonth(value) {
  return nameMonth[value-1]
}

export function timeSince(date) {
  var seconds = Math.floor((Date.now() - Number(date)) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return " hace " + Math.floor(interval) + " año";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return " hace " + Math.floor(interval) + " meses";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return " hace " + Math.floor(interval) + " dias";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return " hace " + Math.floor(interval) + " horas";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return " hace " + Math.floor(interval) + "  minutos";
  }

  return " hace " + Math.floor(seconds) + " segundos";
}

const grados = [1,2,3,4,5,6]
const division = ['A','B','C','D']

export const getCursos = () => {
  const cursos = []
  let item=0
  for (let i = 0; i < grados.length; i++) {
    for (let j = 0; j < division.length; j++) {
      cursos[item] =`${grados[i]}${division[j]}` 
      item++
    }
    
  }
  return cursos
}