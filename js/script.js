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
    const dgf = new Graph();
    dgf.butt();
     dgf.data();
    dgf.canva();
    
   


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
                case "reviationadd"://Ввод курс
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
                    let s = `USD`;
                    this.countCur(s);
                    this.but(target);
                    break;
                case "eur"://Delete list
                    let f = `EUR`;
                    this.countCur(f);
                    this.but(target);
                    break;
                case "curbyn"://Delete list
                    document.querySelector("#many__end").value = document.querySelector("#byn").value;
                    this.but(target);
                    break;
            };
        });
    }
    but(target) {

        const parentElm = target.closest('button');
        console.log(parentElm);
        let l = parentElm.classList.toggle(`butt`);
        if (target !== parentElm) {
            parentElm.classList.remove(`butt`);
         
}
        /*classList.toggle(`butt`);*/
       

            

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

}; //The end______________________________DateProcessing______________________________________



let m = new Date().getMonth()+1;

console.log(m);

let date = new Date().getFullYear();
let date2 = new Date().getMonth();



function howMuchDays ( year , month) {

let date1 = new Date(year, month-1, 1);

let date2 = new Date(year, month, 1);

return Math.round((date2 - date1) / 1000 / 3600 / 24);

} 
let countDay = howMuchDays (date, date2 + 1);




class Graph {
    constructor() {
        this.WIDTH = 600;
        this.HEIGHT = 400;
        this.DPI_WIDTH = this.WIDTH * 2;
        this.DPI_HEIGHT = this.HEIGHT * 2;
        this.columne_count = countDay;
        this.arr;
        this.arr2;
    }
   
    butt() { 
         let button = document.querySelector('#graph');
         let newWind = document.querySelector('#canvas');
       
        const togglenewWind = () => {
            this.newTextWindow();
            newWind.classList.toggle('active');
        }
        button.addEventListener('click', e => {
            e.stopPropagation();
            togglenewWind();
        })
        document.addEventListener('click', e => {
            let target = e.target;
            let its_newWind = target == newWind || newWind.contains(target);
            let its_button = target == button;
            let newWind_is_active = newWind.classList.contains('active');
            if (!its_newWind && !its_button && newWind_is_active) {
                togglenewWind();
            }
        })
    }
     data() {
        

        let arr = [[`0`,`0`]];
        
        let keys = Object.keys(localStorage);
        


        for(let key of keys) {
        if (m == key.slice(4,5)) {
            arr.push(`${+key.slice(0,2)},${JSON.parse(localStorage.getItem(key)).total_BYN}`.split(","));
        }
        else {
           arr.push(``,``);
        } 
        }
        
        this.arr = arr;

    }
   
     newTextWindow() {
        this.canva();
        
    }
    canva() {
        const canvas = document.querySelector("#draw");
        const ctx = canvas.getContext(`2d`);
        canvas.style.maxwidth = this.WIDTH + `px`;
        canvas.style.height = this.HEIGHT + `px`;
        canvas.width = this.DPI_WIDTH;
        canvas.height = this.DPI_HEIGHT;
       
        
        this.draw(ctx);
    }
    draw(ctx) {
         

        ctx.beginPath();
        ctx.strokeStyle = `green`;
        ctx.lineWidth = 5;

        ctx.moveTo(60, this.DPI_HEIGHT -60);
        ctx.lineTo(this.DPI_WIDTH-10, this.DPI_HEIGHT -60);        
      
        ctx.moveTo(60, this.DPI_HEIGHT- 780);
        ctx.lineTo(60, this.DPI_HEIGHT- 60);
        ctx.stroke();
        ctx.closePath();
      

        ctx.rotate(-1.57);
       

        ctx.font = "normal 30px Tahoma";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
         
        ctx.fillText("БЕЛ.РУБ.", -90, 30);
        
        ctx.rotate(1.57);
        ctx.fillText("ИЮНЬ", 1100, 40);

        let gap = (this.DPI_WIDTH - 80) / this.columne_count;


        ctx.beginPath();
        ctx.strokeStyle = `#C0C0C0`;
        ctx.font = "normal 24px Tahoma";
        ctx.lineWidth = 2;
        

        ctx.closePath();
 
        ctx.beginPath();

        ctx.lineCap = `round`;
        let arr = this.arr;
     function as(a,data,c) {
        
        for(let i = 1; i <= a; i++) {
            ctx.shadowColor = "rgba(0, 0, 0, 0)";
            
            ctx.strokeStyle = `red`;
            
            const x = gap * i;
            
            ctx.fillText(i,x+60,760);
            ctx.moveTo(x+60, 730);
            ctx.lineTo(x+60, 740);           

            for(const [p, o] of data) {
                
                
                
            if(i==p) {
               
                
                ctx.fillStyle = '#DEB887';
                let r = (o / 4);            
                ctx.fillText(Math.round(o),x+60, c - (o / 4) - 80);                
                ctx.shadowColor = "rgba(0, 0, 0, 11)";
                ctx.shadowOffsetX = 5;
                ctx.shadowOffsetY = 2;
                ctx.shadowBlur = 7;
                ctx.fillRect(x+50, c -  (o / 4) - 64, 20, r);

                ctx.fill();                            
            };
           
            
           }
           ctx.fillStyle = 'green';
           
           
        };

        

        ctx.stroke();
        
        ctx.closePath();
        
    }
     as(this.columne_count, arr, this.DPI_HEIGHT);
    }
};


/*
    let button = document.querySelector('#graph');
         let newWind = document.querySelector('#canvas');
       
        const togglenewWind = () => {
            this.newTextWindow();
            newWind.classList.toggle('active');
        }
        button.addEventListener('click', e => {
            e.stopPropagation();
            togglenewWind();
        })
        document.addEventListener('click', e => {
            let target = e.target;
            let its_newWind = target == newWind || newWind.contains(target);
            let its_button = target == button;
            let newWind_is_active = newWind.classList.contains('active');
            if (!its_newWind && !its_button && newWind_is_active) {
                togglenewWind();
            }
        })
*/

