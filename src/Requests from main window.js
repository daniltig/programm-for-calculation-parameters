const ipcRenderer1 = require('electron').ipcRenderer;
let data;
var dict = {"" : ""};

ipcRenderer1.on('win-event-send-data', () => {
   //console.log("json create");
   ValuesElementsToJson(input_d, input_D, input_B, select_CornerAlpha, input_T, input_T_MaxDev, input_T_MinDev, select_Bevel, select_DiametrSeries, select_WidthSeries, select_TypeSide);
   //ValuesElementsToJson(struct1, struct2);
   data = dict;
   ipcRenderer1.send('event-send-data', data);
});

ipcRenderer1.on('event-send-jsonData', (event, _words) => {
   //console.log("get json in renderer process", _words);
   ValuesElementsFromJson(_words)
});


function ValuesElementsToJson(..._args) {
   dict = {};
   for (let num of _args) {
      //console.log(num.id);
      if (num instanceof HTMLInputElement) {
          dict[num.id] = num.value;
      }
      else if (num instanceof HTMLSelectElement) {
         dict[num.id] = num.selectedIndex;
      }
   }
}

/*function ValuesElementsToJson(..._args) {
   dict = {};
   let arrFieldsets = [];
   let classesFieldsets = [];
   for (let num of _args){
      classesFieldsets.push(num.classArrMyDiv);
   }
   console.log(classesFieldsets);
   for (let num of classesFieldsets){
      arrFieldsets = arrFieldsets.concat(Array.from(document.querySelectorAll(num)));
   }
   console.log(arrFieldsets);
   let arrElementsInFieldsets = [];
   for (let num of arrFieldsets){
      let arrIS = [];
      arrIS = arrIS.concat(Array.from(num.querySelectorAll("input")));
      arrIS = arrIS.concat(Array.from(num.querySelectorAll("select")));


      arrElementsInFieldsets.push(arrIS);

   }
   console.log(arrElementsInFieldsets);

   for (let iterator=0; iterator<arrElementsInFieldsets.length; iterator++) {
      console.log(arrElementsInFieldsets[iterator]);
      dict["fieldset"+iterator] = {};
      for (let num of arrElementsInFieldsets[iterator]) {
         //console.log(num.id);
         if (num instanceof HTMLInputElement) {
            dict["fieldset"+iterator][num.id] = num.value;
            console.log();
         }
         else if (num instanceof HTMLSelectElement) {
            dict["fieldset"+iterator][num.id] = num.selectedIndex;
         }
      }
   }
}*/

function ValuesElementsFromJson(_words1) {
   for (let num in _words1) {
      if (document.querySelector("#"+num) instanceof HTMLInputElement) {
         document.querySelector("#"+num).value = _words1[num];
      }
      else if (document.querySelector("#"+num) instanceof HTMLSelectElement) {
         document.querySelector("#"+num).selectedIndex = _words1[num]; document.querySelector("#"+num).dispatchEvent(new Event('change'));
      }
   }
}
