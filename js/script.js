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
    date.many();
   

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
                case "addlist"://Create window
                    this.generatorName();
                    break;
                case "dellist"://Delete list
                    this.deleteElement(event);
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
        const list = document.querySelector("#newForm");
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
    generatorName() {
        const add2 = document.querySelector("#money")
        let chil = add2.childNodes;
        let chilLength = chil.length;
        let idName = chilLength -4;
        const add = document.querySelector(".money__money");
        let div2 = add.cloneNode(true);
        add.before(div2);
        add.setAttribute(`class`,`new__Element`);/*${idName}*/
    }
    deleteElement(event) {        
        if (!event.target.closest('.new__Element')) return;
        const deleteElm = event.target.closest('.new__Element');
        deleteElm.remove();
    }
    many() { 
        this.button.addEventListener("input", (event) => {
        let target = event.target;
        switch(target.id) {
                case "reviationadd"://Ввод курса
                this.checkManey(event);
                    break;
            }
        });
    }
    checkManey(event) {
        const parentElm = event.target.closest('#money__money');
        let textbox = parentElm.querySelector(`#reviationadd`);
        let val = textbox.value;/*
    switch (val) {
        case `USD`:
            parentElm.querySelector("#kurs").value = st;            
            break;
        case `RUB`:
            parentElm.querySelector("#kurs").value = `st`; 
            break;
        }*/
        this.as(val, parentElm);
    }
    as(val, parentElm) {
        async  function response() {
            let listPromis = await fetch(`https://www.nbrb.by/api/exrates/rates?periodicity=0`);
            let commits = await listPromis.json();
            let obj =  commits.find(item => item.Cur_Abbreviation == val);
            if(obj == undefined) return;
            let el = obj.Cur_OfficialRate;
            console.log(obj);
            parentElm.querySelector("#kurs").value = el;
        }
        response();
    }
} //The end______________________________DateProcessing______________________________________
