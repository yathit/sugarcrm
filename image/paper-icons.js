


var s = prompt();
var ss = s.split('\n');
var gs = [];
for (var i = 0; i < ss.length; i++) {
  gs[i] = ss[i].replace('<g ', '<symbol viewBox="0 0 24 24" ');
  gs[i] = gs[i].replace(/g>$/, 'symbol>');
}
console.log(gs.join('\n'));

