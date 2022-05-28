`use script`
const buttons = document.querySelector(`button`);
let dateToDay = document.querySelector('input[type="date"]').valueAsDate = new Date ();
let day = dateToDay.setHours(0, 0, 0, 0);



document.addEventListener("DOMContentLoaded", () => {

const date = new DateProcessing(buttons, day);
date.getButt();



});//The end_________________________DOMContentLoaded______________________________________


class DateProcessing {
    constructor(button, day) {
        this.button = button;
        this.toDay = day;
    }
    getButt() {
        this.button.addEventListener("click", (event) => {
            let target = event.target;
            switch(target.id) {
                case "date__input"://Ввод курса
                    this.chekDay();
                    break;
                }
            });
        }
    chekDay() {
        const date = document.forms["date"];
        const inputDay = date.elements["date"].value;
        const newDay = new Date(inputDay);
        newDay.setHours(0, 0, 0, 0);
        if(this.toDay < newDay.getTime()) {
            document.querySelector('input[type="date"]').valueAsDate = new Date ();
        }
        if(this.toDay === newDay.getTime()) {
            alert(`ok`);
        }
    }
} //The end______________________________DateProcessing______________________________________
