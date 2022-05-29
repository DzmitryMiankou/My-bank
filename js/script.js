`use script`
    const today = new Date();
    const dateSrc = today.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' });
document.addEventListener("DOMContentLoaded", () => {
    /*this is today time*/
    const dateToDay = document.querySelector('input[type="date"]').valueAsDate = new Date ();
    const day = dateToDay.setHours(0, 0, 0, 0);
    


    /*DOM information*/
    const buttons = document.querySelector(`body`);
    const formDate = document.forms["date"];

    /*settings DateProcessing*/
    const textH2 = `ВВОД КУРСА ВАЛЮТ`;
    const textP = `на дату`;
    const textButton = `ВВЕСТИ`;


    /*call class*/
    const date = new DateProcessing(buttons, day, formDate, textH2, textP, textButton);
    date.getButt();



});//The end_________________________DOMContentLoaded______________________________________


class DateProcessing {
    constructor(button, day, formDate, textH2, textP, textButton) {
        this.button = button;
        this.toDay = day;
        this.formDate = formDate;
        this.textH2 = textH2;
        this.textP = textP;
        this.textButton = textButton;
    }
    getButt() {
        this.button.addEventListener("click", (event) => {
            let target = event.target;
            switch(target.id) {
                case "date__input"://Ввод курса
                    this.chekDay();
                    break;
                case "newButton"://Delete window
                    let val = document.getElementById("newtextar").value;
                    console.log(val);
                    newDiv.remove();
                    break;
                case "addlist"://Delete window
                    const add = document.querySelector(".money__money");
                    let div2 = add.cloneNode(true);
                    add.before(div2);
                    break;
                case "dellist"://Delete list
                    const dell = document.getElementById("money__money");
                    dell.remove();
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
        const list = document.getElementById("newForm");
        const newDiv = document.createElement("div");

        const newH2 = document.createElement("h2");
        newDiv.append(newH2);

        const textH2 = document.createTextNode(this.textH2);
        newH2.append(textH2);

        const newP = document.createElement("p");
        newDiv.append(newP);

        const textP = document.createTextNode(`${this.textP} ${dateSrc}`);
        newP.append(textP);

        const newForm = document.createElement("form");
        newDiv.append(newForm);

        const textar = document.createElement("textarea");
        newForm.append(textar);

        const button = document.createElement("button");
        newDiv.append(button);

        const textButton = document.createTextNode(this.textButton);
        button.append(textButton);

        list.append(newDiv);

        newDiv.setAttribute(`id`,`newDiv`);
        textar.setAttribute(`id`,`newtextar`);
        button.setAttribute(`id`,`newButton`);
    }
} //The end______________________________DateProcessing______________________________________
