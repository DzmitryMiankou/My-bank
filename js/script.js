`use script`
document.addEventListener("DOMContentLoaded", () => {
const buttons = document.querySelector(`button`);

const dateToDay = document.querySelector('input[type="date"]').valueAsDate = new Date();
const d = new Date(dateToDay);



 buttons.addEventListener("click", (event) => {
        let target = event.target;
        switch(target.id) {
          case "kurs":
            const date = document.forms["date"];
            const em = date.elements["date"].value;
            const sr = new Date(em);
            console.log(d>sr);
            break;
        }
      });
      
/*const chekDate = () => {
    if (em == dateToDay) {
        console.log(`hi`);
    }


}
chekDate();*/



});//Конец кода
