const rrr = ["@Crashout", "owner", "@$$$", "Fuck them corny com kids", "Lmfao you faggot!"];
let vvv = 0;

function yyy() {
    document.title = rrr[vvv];
    vvv = (vvv + 1) % rrr.length
}
setInterval(yyy, 100)