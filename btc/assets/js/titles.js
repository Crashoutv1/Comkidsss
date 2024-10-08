const rrr = ["#FREE MALONE", "@btc"];
let vvv = 0;

function yyy() {
    document.title = rrr[vvv];
    vvv = (vvv + 1) % rrr.length
}
setInterval(yyy, 100)