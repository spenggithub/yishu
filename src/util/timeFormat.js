export function timeFormat(value) {
  let month = Number(value.slice(5,7))+1
  let time = value.slice(0,5) + month + value.slice(7);
  return time
}
