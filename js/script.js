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
                case "remember"://Delete list
                    this.remember();
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
        }
        const deleteElm = event.target.closest('.new__Element');
        let qvest = confirm(`Вы уверены, что хотите удалить строку?`);
        if(qvest == true) {
            deleteElm.remove();
        } 
        else {
            return;
        }     
    }
    many() { 
        this.button.addEventListener("input", (event) => {
        let target = event.target;
        switch(target.id) {
                case "reviationadd"://Ввод курса
                this.checkManey(event);
                    break;
                case "text"://Ввод суммы
                this.checkManey(event);
                    break;
            }
        });
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
                const obj =  commits.find(item => item.Cur_Abbreviation == val);
                if(obj == undefined) return;
                let CurOfficial = obj.Cur_OfficialRate;
                let CurScale = obj.Cur_Scale;
                parentElm.querySelector("#kurs").value = CurOfficial;
                let e = parentElm.querySelector("#text").value;
                if (e == 0 || e < 0 || !Number(e)) return;
                let y = CurOfficial;
                let x = CurScale;
                let count = (e * y) / x;
                parentElm.querySelector("#byn").value = count;
                return document.querySelector("#many__end").value = count;
            }
            catch(error) {
                alert(`Возникла ошибка ${error}`);
            }
        }
        response();
    }
    remember() {
        const d = document.querySelector("#many__end").value;
        localStorage.setItem('test', d);
        alert( localStorage.getItem('test') );
    }
} //The end______________________________DateProcessing______________________________________
