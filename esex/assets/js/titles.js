const rrr = ["i <3 esex", "@esex", "i might be having esex"];
let vvv = 0;

function yyy() {
    document.title = rrr[vvv];
    vvv = (vvv + 1) % rrr.length
}
setInterval(yyy, 100)