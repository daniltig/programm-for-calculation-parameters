{ // вспомогательные функции
   function f_method(_select, ..._args){
      if (_select.selectedIndex == -1)
      return false;
      let optionNumber = _select.children[_select.selectedIndex].number;

      for (selectedArg of _args)
      {
         //console.log(">>", optionNumber +" + " + selectedArg);
         if (optionNumber == selectedArg) return true;
      }
      return false;
   }

   function f_Round(_value, _kolZnak){
      return Math.round(_value*Math.pow(10, _kolZnak)) / Math.pow(10, _kolZnak);
   };

   function f_Trunc(_value, _kolZnak){
      return Math.trunc(_value*Math.pow(10, _kolZnak)) / Math.pow(10, _kolZnak);
   };

   function f_RoundToValueFromArray(_value, _arrValues){
      if (_value < _arrValues[0]) {
         return _arrValues[0];
      }
      for (let iterator=0; iterator<_arrValues.length; iterator++){
         if (_arrValues[iterator] <= _value && _value <= _arrValues[iterator + 1]) {
            if (_value - _arrValues[iterator] < _arrValues[iterator + 1] - _value) {
               return _arrValues[iterator];
            }
            else {
               return _arrValues[iterator + 1];
            }
         }
      }
      if (_arrValues[_arrValues.length - 1]<_value) {
         return _arrValues[_arrValues.length - 1];
      }
   }

   function f_RoundToMinValueFromArray(_value, _arrValues){
      if (_value < _arrValues[0]) {
         return _arrValues[0];
      }
      for (let iterator=0; iterator<_arrValues.length; iterator++){
         if (_arrValues[iterator] <= _value && _value <= _arrValues[iterator + 1]) {
            return _arrValues[_arrValues.length];
         }
      }
      if (_arrValues[_arrValues.length - 1]<_value) {
         return _arrValues[_arrValues.length - 1];
      }
   }

   function f_ValueFromArrayBasedOnSecondArray(_value, _arrInput, _arrValues){
      for (let iterator=0; iterator<_arrInput.length; iterator++){
         if (_value == _arrInput[iterator])
         return _arrValues[iterator];
      }

      return 0;
   }

   function f_ValueFromArrayWithBorders(_value, _arrBorders, _arrValues, _firstBorder, _lastBorder){
      let result = 0;

      for (var iterator = 1; iterator < _arrBorders.length; iterator++) {
         if (_arrBorders[iterator-1] < _value && _value <= _arrBorders[iterator]) {
            if (_firstBorder == true)
            result = _arrValues[iterator-1];
            else
            result = _arrValues[iterator];
            return result;
         }
      }


      if (_firstBorder == false) {
         if (_value <= _arrBorders[0]) {
            result = _arrValues[0];
            return result;
         }
      }
      if (_lastBorder == false) {
         if (_arrBorders[_arrBorders.length-1] < _value) {
            result = _arrValues[_arrValues.length - 1];
            return result;
         }
      }

      return result;
   }

   function f_ValueFromInterval(_value, _arrIntervals, _arrValues){
      for (let iterator=0; iterator<_arrIntervals.length; iterator++)
      {
         if (_arrIntervals[iterator][0] <= _value && _value <= _arrIntervals[iterator][1]) {
            return _arrValues[iterator];
         }
      }

      return 0;
   }

   function f_Number(_value){
      return Number(_value.replace(/,/g, '.'));
   }

   function f_CalculationVariables(..._arrVariables){
      for (let variable of _arrVariables) {
         if (variable.uslCalc == true)
         variable.Calculation();
      }
   }
}

function f_Calculation1(){
   variables.allInstances = [];

   a.Val = f_Number(input_a.value);
   b.Val = f_Number(input_b.value);
   c.Val = f_Number(input_c.value);
   d.Val = f_Number(input_d.value);
   d.val.maxDev = f_Number(input_d_MaxDev.value);
   d.val.minDev = f_Number(input_d_MinDev.value);



   l.val.Calculation = function (_a=a.Val, _b=b.Val){
      this.val = _a+_b;
      this.formula = "a+b";

      this.maxDevCalc = function(){
         this.maxDev = f_ValueFromArrayWithBorders(this.val,[1,3,6,11],[0.7,0.5,0.3],true,true);
      }
      this.minDevCalc = function(){
         this.minDev = f_ValueFromArrayWithBorders(this.val,[1,3,6,11],[-0.7,-0.5,-0.3],true,true);
      }
   };
   boolVar1.val.Calculation = function (_a=a.Val, _b=b.Val){
      if (_a<_b) {
         this.val = true;
      }
      else{
         this.val = false;
      }

      this.formula = "a<b";
   };


   if (f_method(select_1,0)){
      n.val.Calculation = function (_l = l.Val, _c = c.Val){
         this.val = _l + _c;
         this.formula = "l+c";

         this.val = f_Round(this.val, 3);
      };
      m.val.Calculation = function (_n = n.Val, _d = d.Val){
         this.val = _n - _d;
         this.formula = "n-d";

         this.val = f_Round(this.val, 3);
      };
   }
   else if (f_method(select_1,1)){
      m.val.Calculation = function (_l = l.Val, _c = c.Val){
         this.val = _l + 2*_c;
         this.formula = "l+2*c";

         this.val = f_Round(this.val, 3);
      };
      n.val.Calculation = function (_m = m.Val, _d = d.Val){
         this.val = _m + _d;
         this.formula = "m+d";

         this.val = f_Round(this.val, 3);
      };
   }
}

function f_Calculation2(){
   variables.allInstances = [];

   e.Val = f_Number(input_e.value);

   o.val.Calculation = function (_e = e.Val, _n = n.Val){
      this.val = _e + _n;
      this.formula = "e+n";

      this.val = f_Round(this.val, 3);
   };
}

function f_Calculation3(){
   variables.allInstances = [];

   f.Val = f_Number(input_f.value);

   p.val.Calculation = function (_n = n.Val, _f = f.Val){
      this.val = _n / _f;
      this.formula = "n/f";

      this.val = f_Round(this.val, 1);
   };
}

function f_Calculation4(){
   variables.allInstances = [];

   g.Val = f_Number(input_g.value);

   q.val.Calculation = function (_m = m.Val, _g = g.Val){
      this.val = _m / _g;
      this.formula = "m/g";

      this.val = f_Round(this.val, 2);
   };
}

function f_Calculation5(){
   variables.allInstances = [];

   h.Val = f_Number(input_h.value);

   r.val.Calculation = function (_o = o.Val, _h = h.Val){
      this.val = _o * _h;
      this.formula = "o*h";

      this.val = f_Round(this.val, 3);
   };
}
