`use strict`
    const today = new Date();
    const dateSrc = today.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' });






document.addEventListener("DOMContentLoaded", () => {
    /*this is today time*/
    const dateToDay = document.querySelector('input[type="date"]').valueAsDate = today;
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
    
    date.input();
    date.getButt()
    

});//The end_________________________DOMContentLoaded______________________________________

let l;


class DateProcessing {
    constructor(button, day, formDate, textH2, textP, textButton) {
        this.button = button;
        this.toDay = day;
        this.formDate = formDate;
        this.textH2 = textH2;
        this.textP = textP;
        this.textButton = textButton;
        this.arr = [];
        this.promis;
    }
     input() { 
        window.addEventListener("input", (event) => {

            let target = event.target;
            switch(target.id) {
                case "date"://check date
                this.checkDay();
                    break;
                case "reviationadd"://Ввод курса
                this.checkManey(event);
                    break;
                case "text"://Ввод суммы
                this.checkManey(event);
                    break;
            };
        });
    }
    getButt() {
        window.addEventListener("click", (event) => {
            let target = event.target;
            switch(target.id) {
                case "date__input":
                    this.toDays();
                    break;
                case "newButton"://Delete window
                    document.getElementById("newtextar").value;
                    newDiv.remove();
                    break;
                case "addlist"://Create window
                    this.clone();
                    break;
                case "dellist"://Delete list
                    this.deleteElement(event);
                    break;
                case "remember"://Delete list
                    this.remember(this.promis);
                    break;
                case "usd"://Delete list
                document.querySelector(`#usd`).style.cssText = `
                background-color: thistle;`
                let s = `USD`;
                    this.countCur(s);
                    break;
                case "eur"://Delete list
                document.querySelector(`#usd`).style.cssText = ``
                    let f = `EUR`;
                    this.countCur(f);
                    break;
                case "curbyn"://Delete list
                    document.querySelector("#many__end").value = document.querySelector("#byn").value;
                    break;
            };
        });
    }
    checkDay() {
        const inputDay = this.formDate.elements["date"].value;
        const newDay = new Date(inputDay);
        newDay.setHours(0, 0, 0, 0);
        if(this.toDay < newDay.getTime()) {
            setTimeout(() => {
                document.querySelector('input[type="date"]').valueAsDate = new Date ();
            }, 500);
        };
        if(this.toDay > newDay.getTime())  {
            this.oldDay(newDay.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' }));
            document.querySelectorAll(`.money__money form input`).forEach(el => el.style.cssText = `color: red;
                                                                  border: red solid 2px;`);
        } else {
         document.querySelectorAll(`.money__money form input`).forEach(el => el.style.cssText = ``);
         document.querySelectorAll(`.money__money form input`).forEach(el => el.value = ``);
    };
    }
    toDays(){
        const inputDay = this.formDate.elements["date"].value;
        const newDay = new Date(inputDay);
        newDay.setHours(0, 0, 0, 0);
        if(this.toDay === newDay.getTime()) {
            this.newTextWindow();
            this.oldDay(newDay.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' }));
        };
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
    clone() {
        const add = document.querySelector(".money__money");
        const div2 = add.cloneNode(true);
        div2.querySelectorAll("form > input").forEach(el=>el.value = '');
        add.before(div2);
        add.setAttribute(`class`,`new__Element`);/*${idName}*/
    }
    deleteElement(event) {        
        if (!event.target.closest('.new__Element')) {  
            const add = document.querySelector(".money__money");
            add.querySelectorAll("form > input").forEach(el=>el.value = '');
            document.querySelector("#many__end").value = '';
            return;                  
        };
        const deleteElm = event.target.closest('.new__Element');
        let qvest = confirm(`Вы уверены, что хотите удалить строку?`);
        if(qvest == true) {
            deleteElm.remove();
        } 
        else {
            return;
        };     
    }
    checkManey(event) {
        const parentElm = event.target.closest('#money__money');
        const maneybox = parentElm.querySelector(`#reviationadd`);
        const val = maneybox.value;
        this.as(val, parentElm);
    }
    as(val, parentElm) {        
        async  function response() {
            try {
                const listPromis = await fetch(`https://www.nbrb.by/api/exrates/rates?periodicity=0`);
                const commits = await listPromis.json();
                

                const USD = commits[5].Cur_OfficialRate;
                const EUR = commits[6].Cur_OfficialRate;

                const obj =  commits.find(item => item.Cur_Abbreviation == val);
                if(obj == undefined) return;
                
                let CurOfficial = obj.Cur_OfficialRate;
                let CurScale = obj.Cur_Scale;
                let Abbreviation = obj.Cur_Abbreviation;
                parentElm.querySelector("#kurs").value = CurOfficial;
                let e = parentElm.querySelector("#text").value;
                if (e == 0 || e < 0 || !Number(e)) return;
                let y = CurOfficial;
                let x = CurScale;
                let count = (e * y) / x;
                parentElm.querySelector("#byn").value = count;
                document.querySelector("#many__end").value = count;
                let arr = [count, Abbreviation, CurOfficial, e, USD, EUR];
                return arr; 
            }
            catch(error) {
                alert(`Возникла ошибка ${error}`);
            };
        };
        response().then((result) => this.promis = result);
    }
    remember(a) {
        const arr = a;
        if (a !== undefined) {
        let student = {
            inputMoney: arr[3],
            Cur_Abbreviation: arr[1],
            CurOfficial: arr[2],
            total_BYN: arr[0],
        };
        /*this.arr.push(student);*/
        localStorage.setItem(`${dateSrc}`,JSON.stringify(student));
        };       
    }
    oldDay(a) {
       let time = a;
       const getLocal = localStorage.getItem(time);
       const json = JSON.parse(getLocal);
       
       document.querySelector("#text").value = json.inputMoney;
       document.querySelector("#reviationadd").value = json.Cur_Abbreviation;
       document.querySelector("#kurs").value = json.CurOfficial;
       document.querySelector("#byn").value = json.total_BYN;
       document.querySelector("#many__end").value = json.total_BYN;
       
       let byn = json.total_BYN;
       let inputMoney = json.inputMoney;
       let Cur_Abbreviation = json.Cur_Abbreviation;
       let CurOfficial = json.CurOfficial;
       this.arr = [byn, usd, eur];
    }
    countCur(a) {
        async  function response() {
            try {
                const listPromis = await fetch(`https://www.nbrb.by/api/exrates/rates?periodicity=0`);
                const commits = await listPromis.json();
                const obj =  commits.find(item => item.Cur_Abbreviation == a);


                const CurScale = obj.Cur_OfficialRate;
                let e = document.querySelector("#byn").value;
                let f  = document.querySelector("#many__end").value = e / CurScale;
            }
            catch(error) {
                alert(`Возникла ошибка ${error}`);
            }
        };
        response();
    }
} //The end______________________________DateProcessing______________________________________