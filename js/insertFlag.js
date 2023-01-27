let ch = document.getElementById("flag_ch")
let en = document.getElementById("flag_en")
let ins = document.getElementById("flag_ins")

ch.onclick = () => {
  ins.innerHTML = "<img src='../Deepin/image/cn.png' alt=''>"
}
en.onclick = () => {
  ins.innerHTML = "<img src='../Deepin/image/gb.png' alt=''>"
}
