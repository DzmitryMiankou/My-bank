`use script`

document.addEventListener("DOMContentLoaded", () => {
    /*this is today time*/
    const dateToDay = document.querySelector('input[type="date"]').valueAsDate = new Date ();
    const day = dateToDay.setHours(0, 0, 0, 0);

    /*DOM information*/
    const buttons = document.querySelector(`button`);
    const formDate = document.forms["date"];

    /*call class*/
    const date = new DateProcessing(buttons, day, formDate);
    date.getButt();



});//The end_________________________DOMContentLoaded______________________________________


class DateProcessing {
    constructor(button, day, formDate) {
        this.button = button;
        this.toDay = day;
        this.formDate = formDate;
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
        const inputDay = this.formDate.elements["date"].value;
        const newDay = new Date(inputDay);
        newDay.setHours(0, 0, 0, 0);
        if(this.toDay < newDay.getTime()) {
            document.querySelector('input[type="date"]').valueAsDate = new Date ();
        }
        if(this.toDay === newDay.getTime()) {
            this.newTextWindow()
        }
    }
    newTextWindow() {
        let list = document.getElementById("newForm");
        let newDiv = document.createElement("div");
        let newForm = document.createElement("form");
        newDiv.append(newForm);
        let textar = document.createElement("textarea");
        newDiv.append(textar);
        list.append(newDiv);
        newDiv.setAttribute(`id`,`newDiv`);
    }
} //The end______________________________DateProcessing______________________________________
