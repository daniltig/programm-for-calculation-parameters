let CalculationAllInstances = function (_variables){
   /*  Функция перебирает массив и считает переменные variables, функции Calculation которых, были объявлены  */

   if (_variables.uslCompleted == false) {
      if (_variables.calcedInstances.at(-1).childDiv.children[2].value != "" || _variables.calcedInstances.at(-1).childDiv.children[3].value != "" || _variables.calcedInstances.at(-1).childDiv.children[4].value != "") {
         if (_variables.calcedInstances.at(-1).rasch==undefined) // условие стоит здесь, потому что val уже может быть перезаписан пользователем и поэтому не являться расчитанным программой
            _variables.calcedInstances.at(-1).rasch = _variables.calcedInstances.at(-1).val;
         _variables.calcedInstances.at(-1).val = f_Number(_variables.calcedInstances.at(-1).childDiv.children[2].value);
      }
      _variables.calcedInstances.at(-1).CalculationDevs();
      if (_variables.calcedInstances.at(-1).childDiv.children[3].value != "")
         _variables.calcedInstances.at(-1).maxDev = f_Number(_variables.calcedInstances.at(-1).childDiv.children[3].value);

      if (_variables.calcedInstances.at(-1).childDiv.children[4].value != "")
         _variables.calcedInstances.at(-1).minDev = f_Number(_variables.calcedInstances.at(-1).childDiv.children[4].value);
   }
   else{
      _variables.calcedInstances = [];
   }

   _variables.uslCompleted = true;
   let schCulc=0;

   for(let num of _variables.allInstances){
      num.Calculation();
      schCulc++;

      _variables.calcedInstances.push(num);

      if (num.uslStop==true) {
         _variables.uslCompleted = false;
         break;
      }
   }

   _variables.allInstances.splice(0,schCulc);
}

let OutputAllInstances = function (_func, _variables) {
   _func();
   if (_variables.uslCompleted == true) {
      for (let num of _variables.calcedInstances) {
         num.parent.uslOutput = false;

         num.uslOutput = false;
      }
   }
}

let schCulc = 0;

let structSch = {
   schThDiv:1, // нужен, чтобы знать какой div будет показан/скрыт при нажатии кнопки "Расчитать"
   schTdDiv:0, // нужен, чтобы знать какой div будет разблокирован/заблокирован при нажатии кнопки "Расчитать"
   schThInput:0, // нужен, чтобы знать какой myInput будет показан/скрыт при нажатии кнопки "Расчитать"
   classArrMyDiv: "", // предназначен, чтобы хранить название класса div'ов которые будут показаны/скрыты и разблокированы/заблокированы
   classArrMyInput: "", // предназначен, чтобы хранить название класса input'ов которые будут показаны/скрыты и разблокированы/заблокированы
   schButtonClick:0,
   forwardButton: null, // кнопка "Расчитать"
   backButton: null, // кнопка "Назад"
   arrCulcFunc:[],
   arrOutputFunc:[],
   calcedInstances:[],
   allInstances:[],
   allOutputInstances: [],
   additionalFunctions: [],
   uslCompleted: true // условие прохода всех функций в arrCulcFunc
};

let struct1 = structuredClone(structSch);
struct1.classArrMyDiv = ".fieldsetLevel1";
struct1.classArrMyInput = '.myInputLevel1';
struct1.forwardButton = "#button_calc1";
struct1.backButton = "#button_calc2";
struct1.arrCulcFunc = [f_Calculation1, f_Calculation2];
struct1.arrOutputFunc = [f_OutputVariables1, f_OutputVariables2];
let struct2 = structuredClone(structSch);
struct2.classArrMyDiv = ".fieldsetLevel2";
struct2.classArrMyInput = '.myInputLevel2';
struct2.forwardButton = "#button_calc3";
struct2.backButton = "#button_calc4";
struct2.arrCulcFunc = [f_Calculation3];
struct2.arrOutputFunc = [f_OutputVariables3];
let struct3 = structuredClone(structSch);
struct3.classArrMyDiv = ".fieldsetLevel3";
struct3.classArrMyInput = '.myInputLevel3';
struct3.forwardButton = "#button_calc5";
struct3.backButton = "#button_calc6";
struct3.arrCulcFunc = [f_Calculation4];
struct3.arrOutputFunc = [f_OutputVariables4];
let struct4 = structuredClone(structSch);
struct4.classArrMyDiv = ".fieldsetLevel4";
struct4.classArrMyInput = '.myInputLevel4';
struct4.forwardButton = "#button_calc7";
struct4.backButton = "#button_calc8";
struct4.arrCulcFunc = [f_Calculation5];
struct4.arrOutputFunc = [f_OutputVariables5];


//button_calc_generalOnclick.schInArrFunc=0;
function button_calc_generalOnclick(thisStructSch){
   let arrMyDiv = document.querySelectorAll(thisStructSch.classArrMyDiv);
   let arrMyInput = document.querySelectorAll(thisStructSch.classArrMyInput);

   if (thisStructSch.schButtonClick<thisStructSch.arrCulcFunc.length){
      if (thisStructSch.arrCulcFunc[thisStructSch.schButtonClick] instanceof Array) {
         for (let iterator=0; iterator<thisStructSch.arrCulcFunc[thisStructSch.schButtonClick].length; iterator++){
            /*  цикл нужен, чтобы пройти весь массив с функциями, в которых обяъвлены функции Calculation у переменных variables  */

            if (thisStructSch.uslCompleted==true){
               thisStructSch.arrCulcFunc[thisStructSch.schButtonClick][iterator]();
               thisStructSch.allInstances = variables.allInstances.slice(); // slice() копирует массив
            }

            CalculationAllInstances(thisStructSch);
            OutputAllInstances(thisStructSch.arrOutputFunc[thisStructSch.schButtonClick][iterator], thisStructSch);



            if (thisStructSch.uslCompleted == false){
               break;
            }

            /*if (button_calc_generalOnclick.schInArrFunc < thisStructSch.arrCulcFunc[thisStructSch.schButtonClick].length-1){
               if (myDivWithVariables1.children.length != 0){
                  AddListVariables(thisStructSch);
                  button_calc_generalOnclick.schInArrFunc++;
                  return;
               }
            }*/

         }
         if (thisStructSch.additionalFunctions[thisStructSch.schButtonClick] instanceof Function){
            thisStructSch.additionalFunctions[thisStructSch.schButtonClick]();
         }
         //button_calc_generalOnclick.schInArrFunc=0;
      }
      else {
         if (thisStructSch.uslCompleted==true){
            thisStructSch.arrCulcFunc[thisStructSch.schButtonClick](); // выполняется очередная функция Calculation
            thisStructSch.allInstances = variables.allInstances.slice(); // slice() копирует массив
         }

         CalculationAllInstances(thisStructSch);
         OutputAllInstances(thisStructSch.arrOutputFunc[thisStructSch.schButtonClick], thisStructSch);

         if (thisStructSch.additionalFunctions[thisStructSch.schButtonClick] instanceof Function){
            thisStructSch.additionalFunctions[thisStructSch.schButtonClick](); // выполнются функции с дополнительными действими, если они запрограммированы
         }
      }
   }

   arrMyInput[thisStructSch.schThInput].hidden = false; // MyInput, который надо показать
   arrMyDiv[thisStructSch.schTdDiv].disabled = true; // MyDiv, который надо заблокировать
   if (thisStructSch.uslCompleted==true){
      if (arrMyDiv[thisStructSch.schThDiv]!=undefined)
         arrMyDiv[thisStructSch.schThDiv].hidden = false; // MyDiv, который надо показать

      if (thisStructSch.schThInput<arrMyDiv.length-1)
         thisStructSch.schThInput++

      if (thisStructSch.schTdDiv<arrMyDiv.length-1)
         thisStructSch.schTdDiv++

      if (thisStructSch.schThDiv<arrMyDiv.length)
         thisStructSch.schThDiv++



      if (thisStructSch.schButtonClick<thisStructSch.arrCulcFunc.length) {
         schCulc++;
         thisStructSch.schButtonClick++;

         myDivWithVariables1.children=[];
         while (myDivWithVariables1.firstChild) {
            myDivWithVariables1.removeChild(myDivWithVariables1.lastChild);
         }
      }
   }


   if (thisStructSch.uslCompleted==false){
      AddListVariables(thisStructSch);
      if (myDivWithVariables1.children.length != 0)
         myDivWithVariables1.children[thisStructSch.calcedInstances.length-1].appendChild(myDivWithVariables1.markerDiv);
   }
   else {
      if (myDivWithVariables1.markerDiv!=null && myDivWithVariables1.markerDiv!=undefined)
         if (myDivWithVariables1.markerDiv.parentNode!=null && myDivWithVariables1.markerDiv.parentNode!=undefined)
            myDivWithVariables1.markerDiv.parentNode.removeChild(myDivWithVariables1.markerDiv);
   }
};

function button_calc_generalOnclickRightButton(_thisStructSch){
   AddListVariables(_thisStructSch);
}

function button_calc_generalOnclick1(_schCulc, _arrMyDiv, _thisButton, _backButton, _uslCompleted){
   if (_schCulc>0 || _schCulc==0 && _uslCompleted == false) {
      _backButton.disabled = false;
   }

   if (_schCulc==_arrMyDiv.length) {
      _thisButton.disabled = true;
   }
};



function button_calc_generalOnclickBack(thisStructSch){
   let arrMyDiv = document.querySelectorAll(thisStructSch.classArrMyDiv);
   let arrMyInput = document.querySelectorAll(thisStructSch.classArrMyInput);
   //this.thisSch=0;

   if (thisStructSch.uslCompleted==true){
      let uslQ=false;
      if (thisStructSch.schButtonClick<arrMyDiv.length) {
         if (thisStructSch.schTdDiv>0)
         thisStructSch.schTdDiv--

         if (thisStructSch.schThDiv>1)
         thisStructSch.schThDiv--

         if (thisStructSch.schThInput>0)
         thisStructSch.schThInput--

         uslQ =  true;
      }

      arrMyDiv[thisStructSch.schTdDiv].disabled = false; // MyDiv, который надо разблокировать
      if (arrMyDiv[thisStructSch.schThDiv]!=undefined) // проверяет, не вышел ли schThDiv за пределы массива. Нужен потому что schThDiv может быть равен длине массива
         arrMyDiv[thisStructSch.schThDiv].hidden = true; // MyDiv, который надо скрыть
      arrMyInput[thisStructSch.schThInput].hidden = true; // MyInput, который надо скрыть

      if (uslQ = false){
         if (thisStructSch.schTdDiv>0)
         thisStructSch.schTdDiv--

         if (thisStructSch.schThDiv>1)
         thisStructSch.schThDiv--

         if (thisStructSch.schThInput>0)
         thisStructSch.schThInput--
      }

      if (thisStructSch.schButtonClick>0) {
         schCulc--;
         thisStructSch.schButtonClick--;
      }

      variables.allInstances = []; // очистить массив переменных, которые нужно посчитать
      variables.calcedInstances = []; // очистить массив посчитанных переменных
      variables.allOutputInstances = []; // очистить массив выводимых переменных
      variables.uslCompleted = true
   }
   else {
      /*for (let num of variables.allOutputInstances){
         num.uslOutput = false;
         num.parent.uslOutput = false;
      }*/

      arrMyInput[thisStructSch.schThInput].hidden = true; // MyInput, который надо скрыть
      arrMyDiv[thisStructSch.schTdDiv].disabled = false; // MyDiv, который надо разблокировать

      for (let num of thisStructSch.calcedInstances) {
         num.parent.uslOutput = false;

         num.uslOutput = false;
      }

      thisStructSch.allInstances = []; // очистить массив переменных, которые нужно посчитать
      thisStructSch.calcedInstances = []; // очистить массив посчитанных переменных
      thisStructSch.allOutputInstances = []; // очистить массив выводимых переменных
      thisStructSch.uslCompleted = true

      if (myDivWithVariables1.markerDiv!=null && myDivWithVariables1.markerDiv!=undefined)
         if (myDivWithVariables1.markerDiv.parentNode!=null && myDivWithVariables1.markerDiv.parentNode!=undefined)
            myDivWithVariables1.markerDiv.parentNode.removeChild(myDivWithVariables1.markerDiv); // удаление маркера, показывающего на какой строке остановлен расчёт
   }



   myDivWithVariables1.children=[];
   while (myDivWithVariables1.firstChild) {
      myDivWithVariables1.removeChild(myDivWithVariables1.lastChild);
   }
}

function button_calc_generalOnclickBackRightButton(_thisStructSch){
   //if (variables.uslCompleted==false){

   /*_thisStructSch.arrCulcFunc[_thisStructSch.schButtonClick]();
   if (variables.allInstances.length!=0)*/
      document.querySelector(_thisStructSch.backButton).disabled = true;

   if (_thisStructSch.uslCompleted==true){
      let arrMyDiv = document.querySelectorAll(_thisStructSch.classArrMyDiv);
      let arrMyInput = document.querySelectorAll(_thisStructSch.classArrMyInput);


      if (schCulc!=0){

         let uslQ=false;
         if (_thisStructSch.schButtonClick<arrMyDiv.length) {
            if (_thisStructSch.schTdDiv>0)
               _thisStructSch.schTdDiv--

            if (_thisStructSch.schThDiv>1)
               _thisStructSch.schThDiv--

            if (_thisStructSch.schThInput>0)
               _thisStructSch.schThInput--

            uslQ =  true;
         }

         //arrMyDiv[_thisStructSch.schTdDiv].disabled = false; // MyDiv, который надо разблокировать
         if (arrMyDiv[_thisStructSch.schThDiv]!=undefined)
            arrMyDiv[_thisStructSch.schThDiv].hidden = true; // MyDiv, который надо скрыть
         //arrMyInput[_thisStructSch.schThInput].hidden = true; // MyInput, который надо скрыть

         if (uslQ = false){
            if (_thisStructSch.schTdDiv>0)
               _thisStructSch.schTdDiv--

            if (_thisStructSch.schThInput>0)
               _thisStructSch.schThInput--
         }


         if (_thisStructSch.schButtonClick>0) {
            schCulc--;
            _thisStructSch.schButtonClick--;
         }
      }
   }

   AddListBack(variables, _thisStructSch);
   //}
}

function button_calc_generalOnclickBack1(_schCulc, _arrMyDiv, _thisButton, _backButton){
   if (_schCulc<_arrMyDiv.length)
      _backButton.disabled = false;
   if (_schCulc==0 && variables.uslCompleted == true) {
      _thisButton.disabled = true;
   }
};



let button_calc1_onclick = function(event, _thisStructSch=struct1){
   let uslHidden = false;
   if (_thisStructSch.schTdDiv==document.querySelectorAll(_thisStructSch.classArrMyDiv).length-1){
      uslHidden = true;
   }

   button_calc_generalOnclick(_thisStructSch);

   button_calc_generalOnclick1(_thisStructSch.schButtonClick, document.querySelectorAll(_thisStructSch.classArrMyDiv), event.target, document.querySelector(_thisStructSch.backButton), _thisStructSch.uslCompleted)

   if (uslHidden == true && _thisStructSch.uslCompleted == true){
      document.querySelector('#div3').hidden = false;
   }

   //console.log("button_calc1_onclick -> ",variables.calcedInstances);
   //console.log("button_calc1_onclick  -? ",variables.allInstances);
}

let button_calc1_onclickRignt = function (event, _thisStructSch=struct1){
   button_calc_generalOnclickRightButton(_thisStructSch);
}

let button_calc2_onclick = function(event, _thisStructSch=struct1){
   if (_thisStructSch.schTdDiv+1==document.querySelectorAll(_thisStructSch.classArrMyDiv).length){
      document.querySelector('#div3').hidden = true;
   }

   button_calc_generalOnclickBack(_thisStructSch);

   button_calc_generalOnclickBack1(_thisStructSch.schButtonClick, document.querySelectorAll(_thisStructSch.classArrMyDiv), event.target, document.querySelector(_thisStructSch.forwardButton));


}

let button_calc2_onclickRignt = function(event, _thisStructSch=struct1){
   button_calc_generalOnclickBackRightButton(_thisStructSch);
}


let button_calc3_onclick = function(event, _thisStructSch=struct2){
   button_calc_generalOnclick(_thisStructSch);

   button_calc_generalOnclick1(_thisStructSch.schButtonClick, document.querySelectorAll(_thisStructSch.classArrMyDiv), event.target, document.querySelector(_thisStructSch.backButton), _thisStructSch.uslCompleted)

   //console.log(schTdDiv, schThDiv, schThInput);
   //console.log(schCulc);
   //console.log("-------------------------------------------");
}

let button_calc3_onclickRignt = function (event, _thisStructSch=struct2){
   button_calc_generalOnclickRightButton(_thisStructSch);
}

let button_calc4_onclick = function(event, _thisStructSch=struct2){
   button_calc_generalOnclickBack(_thisStructSch);

   button_calc_generalOnclickBack1(_thisStructSch.schButtonClick, document.querySelectorAll(_thisStructSch.classArrMyDiv), event.target, document.querySelector(_thisStructSch.forwardButton));


   //console.log("-------------------------------------------");
}

let button_calc4_onclickRignt = function(event, _thisStructSch=struct2){
   button_calc_generalOnclickBackRightButton(_thisStructSch);
}


let button_calc5_onclick = function(event, _thisStructSch=struct3){
   button_calc_generalOnclick(_thisStructSch);

   button_calc_generalOnclick1(_thisStructSch.schButtonClick, document.querySelectorAll(_thisStructSch.classArrMyDiv), event.target, document.querySelector(_thisStructSch.backButton), _thisStructSch.uslCompleted)

   //console.log(schTdDiv, schThDiv, schThInput);
   //console.log(schCulc);
   //console.log("-------------------------------------------");
}

let button_calc5_onclickRignt = function (event, _thisStructSch=struct3){
   button_calc_generalOnclickRightButton(_thisStructSch);
}

let button_calc6_onclick = function(event, _thisStructSch=struct3){
   button_calc_generalOnclickBack(_thisStructSch);

   button_calc_generalOnclickBack1(_thisStructSch.schButtonClick, document.querySelectorAll(_thisStructSch.classArrMyDiv), event.target, document.querySelector(_thisStructSch.forwardButton));


   //console.log("-------------------------------------------");
}

let button_calc6_onclickRignt = function(event, _thisStructSch=struct3){
   button_calc_generalOnclickBackRightButton(_thisStructSch);
}


let button_calc7_onclick = function(event, _thisStructSch=struct4){
   button_calc_generalOnclick(_thisStructSch);

   button_calc_generalOnclick1(_thisStructSch.schButtonClick, document.querySelectorAll(_thisStructSch.classArrMyDiv), event.target, document.querySelector(_thisStructSch.backButton), _thisStructSch.uslCompleted)

   //console.log(schTdDiv, schThDiv, schThInput);
   //console.log(schCulc);
   //console.log("-------------------------------------------");
}

let button_calc7_onclickRignt = function (event, _thisStructSch=struct4){
   button_calc_generalOnclickRightButton(_thisStructSch);
}

let button_calc8_onclick = function(event, _thisStructSch=struct4){
   button_calc_generalOnclickBack(_thisStructSch);

   button_calc_generalOnclickBack1(_thisStructSch.schButtonClick, document.querySelectorAll(_thisStructSch.classArrMyDiv), event.target, document.querySelector(_thisStructSch.forwardButton));


   //console.log("-------------------------------------------");
}

let button_calc8_onclickRignt = function(event, _thisStructSch=struct4){
   button_calc_generalOnclickBackRightButton(_thisStructSch);
}
