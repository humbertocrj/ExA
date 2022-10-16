export function stringToBoolean(value) {
  if (typeof value === "string") {
    if (value.toUpperCase() === "NÃO") {
      return false;
    } else if (value.toUpperCase() === "SIM") {
      return true;
    }
  }else{
    return value
  }
}
