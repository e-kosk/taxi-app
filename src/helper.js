export const convertToTime = (time) => {
  const minutes = `0${Math.floor(time / 60)}`.slice(-2);
  const seconds = `0${time % 60}`.slice(-2);
  return `${minutes}:${seconds}`;
};
