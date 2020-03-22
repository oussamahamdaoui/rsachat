function genCharArray(charA, charZ) {
  const a = []; let i = charA.charCodeAt(0); const
    j = charZ.charCodeAt(0);
  for (; i <= j; i += 1) {
    a.push(String.fromCharCode(i));
  }
  return a;
}


module.exports = {
  genCharArray,
};
