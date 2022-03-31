export function parseCurrency(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);
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