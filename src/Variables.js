class variables {
   static sch = 0;
   static allInstances = []; // здесь хранятся все созданные varia, у которых была объявлена функция Calculation
   static calcedInstances = []; // здесь хранятся все созданные varia, у которых была вызвана функция Calculation
   static allOutputInstances = []; // здесь хранятся все созданные varia, у которых была вызвана функция Calculation
   static uslCompleted = true;

   constructor(_name="", _designation="", _uslAddInListButton = true){
      this.val = new varia;
      this.maxVal = new varia;
      this.minVal = new varia;
      this.val.parent = this;
      this.maxVal.parent = this;
      this.minVal.parent = this;
      this.name = _name;
      this.designation = _designation;
      this.uslCalc = false;
      this.uslOutput = false;
      this.uslAddInListButton = _uslAddInListButton;

      variables.sch += 1;
   }
   set Val(_value){
      this.val.val = _value;
   }
   get Val(){
      return this.val.val;
   }
   set MaxVal(_value){
      this.maxVal.val = _value;
   }
   get MaxVal(){
      if (this.maxVal.val != 0)
         return this.maxVal.val;
      else
         return this.val.val + this.val.maxDev;
   }
   set MinVal(_value){
      this.minVal.val = _value;
   }
   get MinVal(){
      if (this.minVal.val != 0)
         return this.minVal.val;
      else
         return this.val.val + this.val.minDev;
   }

   static Clear = function (..._arrVariables){
      for(let num of _arrVariables){
         num.uslCalc = false;
         num.uslOutput = false;

         num.val.uslCalc = false;
         num.maxVal.uslCalc = false;
         num.minVal.uslCalc = false;
         num.val.uslOutput = false;
         num.maxVal.uslOutput = false;
         num.minVal.uslOutput = false;
      }
   }

   static OutputAll = function (_input){
      for(let num of this.allInstances){
         _nput.value += num.Output();
      }
   }

   static NewCopyOutputAllInstances = function (_intenses){
      return _intenses;
   }

   /*static CalculationAllInstances = function (_variables = this){
      if (_variables.uslCompleted == false) {
         if (_variables.allInstances[0].rasch==undefined)
            _variables.allInstances[0].rasch = _variables.allInstances[0].val;
         _variables.allInstances[0].val = f_Number(_variables.allInstances[0].childDiv.children[2].value);
         _variables.allInstances[0].CalculationDevs();

         _variables.allInstances.splice(0,1);
      }

      _variables.uslCompleted = true;
      let schCulc=0;
      for(let num of _variables.allInstances){
         num.Calculation();
         schCulc++;

         _variables.allOutputInstances.push(num);
         _variables.calcedInstances.push(num);

         if (num.uslStop==true) {
            _variables.uslCompleted = false;
            break;
         }
      }

      _variables.allInstances.splice(0,schCulc-1);
      if (_variables.uslCompleted == true){
         _variables.allInstances.splice(0,1);
      }
   }*/

   /*static CalculationToNull = function (){
      variables.allOutputInstances.at(-1).uslOutput = false;

      variables.calcedInstances.pop();
      if (variables.calcedInstances.length != 0)
         variables.allInstances.unshift(variables.calcedInstances.at(-1));
      variables.allOutputInstances.pop();
   }*/

   /*static OutputAllInstances = function (_func, _variables = this) {
      _func();
      if (_variables.uslCompleted == true) {
         for (let num of _variables.allOutputInstances) {
            num.parent.uslOutput = false;
         }
      }
   }*/
}


variables.prototype.Output = function (){
   let result = "";

   function OutputVal(this1, _this, _str1, _str2){
      if (_this.uslOutput == true){
         if (_this.rasch != undefined){
            result += _str1 + " " + this1.name +
            (function(_designation){
               if (_designation!="")
               return (" "+_designation + " " + _str2);
               else
               return "";
            })(this1.designation)
            + (function(_val){
               return (" расч. = "+_val.rasch);
            })(_this)
            + " "
            + "\r\n";
         }


         result +=  _str1 + " " + this1.name +
         (function(_designation){
            if (_designation!="")
            return (" "+_designation +" "+ _str2);
            else
            return "";
         })(this1.designation)
         + (function(_val){
               return (" = "+_val.val);
         })(_this)
         + (function(_val){
            if (_val.note!=undefined && _val.note!=null)
               return (" "+_val.note);
            else
               return ("");
         })(_this)
         + " ";

         if (_this.maxDev!=0 || _this.minDev!=0){
            if (_this.maxDev==_this.minDev && _this.maxDev!=0 && _this.minDev!=0){
               result += "±" + _this.maxDev;
            }
            else{
               if (_this.maxDev > 0){
                  result += "+";
               }
               result += _this.maxDev + ";";
               if (_this.minDev > 0){
                  result += "+";
               }
               result += _this.minDev;
            }
         }
      }

   }

   OutputVal(this, this.val, "","");
   if (this.val.uslOutput == true)
      result += "\r\n";
   OutputVal(this, this.maxVal, " Max","max");
   if (this.maxVal.uslOutput == true)
      result += "\r\n";
   OutputVal(this, this.minVal, " Min","min");

   /*if (struct1.uslCompleted == true){
      this.val.uslOutput = false;
      this.maxVal.uslOutput = false;
      this.minVal.uslOutput = false;
   }*/

   if (result == "") {
      result = this.name +
      (function(_designation){
         if (_designation!="")
         return (" "+_designation);
         else
         return "";
      })(this.designation) + " -> не считалось"
   }

   return result;
}

variables.prototype.OutputWord = function (_table, _uslVal=true, _uslMaxVal=true, _uslMinVal=true){

   if (this.Val != 0)
      if (_uslVal == true)
         _table.root.push(this.val.OutputWord(this.name, this.designation, ""));
   if (this.maxVal.val != 0)
      _table.root.push(this.maxVal.OutputWord(this.name, this.designation, "Max "));
   if (this.minVal.val != 0)
      _table.root.push(this.minVal.OutputWord(this.name, this.designation, "Min "));


}

function varia(){
   this.val = 0;
   this.maxDev = 0;
   this.minDev = 0;
   this.formula = "";

   this.uslOutput = false;
   this.uslStop = false;

   /*this.calculation = [];
   this.calculationSch = 0;
   this.vivodSch = 0;*/
}

varia.prototype = {
   set Calculation(_value){
      this.calculation = _value;
      this.uslAddInListButton = undefined;
      //this.uslOutput = true;

      variables.allInstances.push(this);
      //this.uslStop = false;
   },

   get Calculation(){
      this.rasch = undefined;
      this.maxDev = 0;
      this.minDev = 0;
      this.parent.uslOutput = true;
      this.uslOutput = true;

      this.maxDevCalc = undefined;
      this.minDevCalc = undefined;

      //return this.calculation;
      return (
         function (){
            this.calculation();
            this.CalculationDevs();
         }
      )
   }
};
varia.prototype.CalculationDevs = function () {
   if (this.maxDevCalc != undefined)
      this.maxDevCalc();
   if (this.minDevCalc != undefined)
      this.minDevCalc();
}
varia.prototype.Output = function (_str1, _str2) {
   debugger;
   let result = "";

   if (this.uslOutput == true){
      if (this.rasch != undefined){
         result += _str1 + " " + this.parent.name +
         (function(_designation){
            if (_designation!="")
            return (" "+_designation + " " + _str2);
            else
            return "";
         })(this.parent.designation)
         + (function(_val){
            return (" расч. = "+_val.rasch);
         })(this)
         + " "
         + "\r\n";
      }

      result +=  _str1 + " " + this.parent.name +
      (function(_designation){
         if (_designation!="")
         return (" "+_designation +" "+ _str2);
         else
         return "";
      })(this.parent.designation)
      + (function(_val){
            return (" = "+_val.val);
      })(this)
      + (function(_val){
         if (_val.note!=undefined && _val.note!=null)
            return (" "+_val.note);
         else
            return ("");
      })(this)
      + " ";

      if (this.maxDev!=0 || this.minDev!=0){
         if (this.maxDev==this.minDev && this.maxDev!=0 && this.minDev!=0){
            result += "±" + this.maxDev;
         }
         else{
            if (this.maxDev > 0){
               result += "+";
            }
            result += this.maxDev + ";";
            if (this.minDev > 0){
               result += "+";
            }
            result += this.minDev;
         }
         result += " ";
      }
   }

   return result;
}
varia.prototype.OutputWord = function (_name, _designation, _str){
   let row = new docx.TableRow({
      children: [
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun({
                        children:[
                           _str + _name
                        ],
                        //subScript: true,
                     })
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(_designation + " " + _str.toLowerCase())
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(this.formula)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               (function (_v){
                  if (_v.rasch != 0 && _v.rasch != undefined)
                     return new docx.Paragraph({
                     children: [
                        new docx.TextRun(String(_v.rasch))
                     ],
                     alignment: docx.AlignmentType.CENTER,
                  })
                  else{
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(String(_v.val))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })(this),
            ],
         }),
         new docx.TableCell({
            children:[
               (function (_v){
                  if (_v.rasch == 0 ||  _v.rasch == undefined)
                     return new docx.Paragraph({
                     children: [
                        new docx.TextRun("-")
                     ],
                     alignment: docx.AlignmentType.CENTER,
                  })
                  else{
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(String(_v.val))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })(this),
            ],
         }),
         new docx.TableCell({
            children:[
               (function (_v){
                  if (_v.maxDev == 0 && _v.minDev == 0 ||  _v.maxDev == undefined && _v.minDev == undefined)
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun("-")
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  else{
                     let paragraph1="";
                     if (_v.maxDev>0) {
                        paragraph1 = "+"
                     }
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(paragraph1 + String(_v.maxDev))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })(this),
               (function (_v){
                  if (_v.maxDev == 0 && _v.minDev == 0 ||  _v.maxDev == undefined && _v.minDev == undefined){

                  }
                  else{
                     let paragraph2="";
                     if (_v.minDev>0) {
                        paragraph2 = "+"
                     }
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(paragraph2 + String(_v.minDev))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })(this)
            ],
         }),
      ],
   })

   return row;
}
varia.prototype.ResetToZero = function (){
   this.val = 0;
   this.maxDev = 0;
   this.minDev = 0;
   this.formula = "";

   this.uslOutput = false;
   this.uslCalc = false;
}





let a = new variables("Переменная 1", "a", false);
let b = new variables("Переменная 2", "b", false);
let c = new variables("Переменная 3", "c", false);
let d = new variables("Переменная 4", "d", false);
let e = new variables("Переменная 5", "e", false);
let f = new variables("Переменная 6", "f", false);
let g = new variables("Переменная 7", "g", false);
let h = new variables("Переменная 8", "h", false);


let l = new variables("Переменная 9", "l");
let m = new variables("Переменная 10", "m");
let n = new variables("Переменная 11", "n");
let o = new variables("Переменная 12", "o");
let p = new variables("Переменная 13", "p");
let q = new variables("Переменная 14", "q");
let r = new variables("Переменная 15", "r");
//let s = new variables("", "s");
//let t = new variables("", "t");


let boolVar1 = new variables("Проверка", "", false);
