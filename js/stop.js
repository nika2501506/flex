import { stop_pas, stop_res } from "./main";


export function saveStop() {
    alert ("stop");
    stop_pas++;
    stop_res--;

    document.getElementById("stop_pass").innerText = "сделано стопов:" + stop_pas;
    document.getElementById("stop_res").innerText = "осталось стопов +: " + stop_res;
    //console.log(stop_pas,"  ",stop_res);
}
