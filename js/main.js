var stop_pas=0;
var stop_res=0; 

// Загружаем сохранённые значения при открытии страницы
//alert ("main.js");
    document.getElementById("time_begin").value = "";//localStorage.getItem("time_begin") || "";
    document.getElementById("time_end").value = localStorage.getItem("time_end") || "";
    document.getElementById("stop").value = localStorage.getItem("stop") || "";
    
    export function save() {
      //localStorage.setItem("time_begin", document.getElementById("time_begin").value);
      localStorage.setItem("time_end", document.getElementById("time_end").value);
      localStorage.setItem("stop", document.getElementById("stop").value);
           // alert("Данные сохранены!");
    }

    export function input() {
        stop_pas=0;
        stop_res=document.getElementById("stop").value;
        document.getElementById("time_begin").value="";
        document.getElementById("stop_pass").innerText = "сделано стопов:" + stop_pas;
        document.getElementById("stop_res").innerText = "осталось стопов: " + stop_res;
        //calculate_time();
    }

    function calculate_time() {
      const n1 = parseFloat(document.getElementById("time_begin").value);
      const n2 = parseFloat(document.getElementById("time_end").value);
      const n_stop = parseFloat(document.getElementById("stop").value);
      console.log(n1, "  ",n2,"  ",n_stop);
      document.getElementById("result_time").innerText = "Расчетное рабочее время: " + (n2 - n1);
      document.getElementById("stop_hour").innerText = "кол-во стопов в час: " + n_stop/(n2 - n1);
    }

function calc_rest_time(){
    const now = new Date();

  // получаем часы и минуты
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

  // форматируем в строку "HH:MM"
    const timeString = `${hours}:${minutes}`;

  // записываем в input
    document.getElementById("time_begin").value = timeString;

}

// оставшееся время относительно текущего

function calcDiff() {
  // Текущее время
  const now = new Date();
  const nowHours = now.getHours();
  const nowMinutes = now.getMinutes();

  // Время из input
  const inputValue = document.getElementById("time_end").value; // формат "HH:MM"
  const [inputHours, inputMinutes] = inputValue.split(":").map(Number);

  // Переводим оба времени в минуты
  const nowTotalMinutes = nowHours * 60 + nowMinutes;
  const inputTotalMinutes = inputHours * 60 + inputMinutes;

  // Разница в минутах (если input позже — будет отрицательная)
  let diffMinutes = inputTotalMinutes - nowTotalMinutes;

  // Если отрицательная (время завтра), добавим сутки
  //if (diffMinutes < 0) diffMinutes += 24 * 60;

  // Вычисляем часы и минуты
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  // Форматируем строку "часы:минуты"
  const timeString = `${hours}:${minutes.toString().padStart(2, "0")}`;

  // Переводим в часы с дробной частью (1:15 → 1.25)
  const hoursDecimal = (hours + minutes / 60).toFixed(2);

  // Выводим результат
  document.getElementById("result_time").textContent = "Расчетное оставшееся время: " + timeString;
  //document.getElementById("time_diff_hours").textContent = hoursDecimal;
  if (hours>0){
    document.getElementById("stop_hour").innerText = "кол-во стопов в час: " + Math.floor(stop_res / hoursDecimal);
  }
  else {
    document.getElementById("stop_hour").innerText = "кол-во стопов в 15 мин: " + Math.floor(stop_res / hoursDecimal/4);
  }
}

document.getElementById('btn_input').addEventListener('click', () => {
    //alert("input: обнуление данных");
    input();
});

document.getElementById('btn_stop').addEventListener('click', () => {
    //alert("stop");
    //saveStop();
    
        stop_pas++;
        stop_res--;

        document.getElementById("stop_pass").innerText = "сделано стопов:" + stop_pas;
        document.getElementById("stop_res").innerText = "осталось стопов: " + stop_res;
        save();

    if (stop_pas==1) {
            calc_rest_time();
            calculate_time();
            calcDiff();
        }
    else {
            calculate_time();
            calcDiff();
        }
    
    //стопы / оставшееся время
    
});

