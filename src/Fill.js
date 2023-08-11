function FillSelect(_select, _arr_select, _boolHidden=false){
  _select.options.length = 0;

  for (var iterator = 0; iterator<_arr_select.length; iterator++){
    var opt = document.createElement('option');
    opt.number = _arr_select[iterator][1];
    opt.setAttribute("num", _arr_select[iterator][1]);
    //opt.id = _arr_select[iterator][1];
    opt.innerHTML = _arr_select[iterator][0];
    if (_boolHidden == true)
      opt.hidden = true;
    _select.appendChild(opt);
  }
  _select.selectedIndex = -1;

  //return _select;
}
