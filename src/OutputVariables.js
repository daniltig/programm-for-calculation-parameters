function f_OutputVariables(_input, ..._arrVariables){
   for (let variable of _arrVariables) {
      /*if (variable.uslOutput == true && (variable.val.uslOutput == true || variable.maxVal.uslOutput == true || variable.minVal.uslOutput == true))
         _input.querySelector(".inputInputDivTextarea").appendChild(new MySpan(variable.Output()));*/
      if (variable.uslOutput == true && variable.val.uslOutput == true)
         _input.querySelector(".inputInputDivTextarea").appendChild(new MySpan(variable.val.Output("",""), variable.val.formula));
      if (variable.uslOutput == true && variable.maxVal.uslOutput == true)
         _input.querySelector(".inputInputDivTextarea").appendChild(new MySpan(variable.maxVal.Output(" Max","max"), variable.maxVal.formula));
      if (variable.uslOutput == true && variable.minVal.uslOutput == true)
         _input.querySelector(".inputInputDivTextarea").appendChild(new MySpan(variable.minVal.Output(" Min","min "), variable.minVal.formula));
   }
}
function f_OutputString(_input, _string){
         _input.querySelector(".inputInputDivTextarea").appendChild(new MySpan(_string));
         //_input.value += variable.Output() + "\r\n";
}

function OutputStr(){
   this.value = "";
}

function f_OutputVariables1(_input_textarea = myInput1){
   _input_textarea.Clear();

   f_OutputVariables(_input_textarea, l, boolVar1);
   if (f_method(select_1, 0)){
      f_OutputVariables(_input_textarea, n, m);
   }
   else if (f_method(select_1, 1)){
      f_OutputVariables(_input_textarea, m, n);
   }
}

function f_OutputVariables2(_input_textarea = myInput2){
   _input_textarea.Clear();
   f_OutputVariables(_input_textarea, o);
}

function f_OutputVariables3(_input_textarea = myInput3){
   _input_textarea.Clear();
   f_OutputVariables(_input_textarea, p);
}

function f_OutputVariables4(_input_textarea = myInput4){
   _input_textarea.Clear();
   f_OutputVariables(_input_textarea, q);
}

function f_OutputVariables5(_input_textarea = myInput5){
   _input_textarea.Clear();
   f_OutputVariables(_input_textarea, r);
}
