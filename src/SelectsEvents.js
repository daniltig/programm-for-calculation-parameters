var $ = jQuery = require('jquery');


function select_DiametrSeries_change__select_WidthSeries(event){
  let optionNumber = event.target.children[event.target.selectedIndex].number;

  select_WidthSeries.selectedIndex = -1; select_WidthSeries.dispatchEvent(new Event('change'));

  for (opt of select_WidthSeries.options)
  {
    opt.hidden = true;
  }


  /*

   научиться искать по свойствам
   $('#select_WidthSeries option[id="0"]').prop('number')  // это поиск по аттрибутам

   */
   console.log(select_WidthSeries.options);
  if(optionNumber == 1){
    //console.log(select_WidthSeries.options);
    //console.log(">", $('#select_WidthSeries option[id="0"]').prop('number'));
    console.log(">>", $('#select_WidthSeries option[num=7]').prop('index'));
    //console.log(">>", $('#select_WidthSeries option[num=0]').attr('id'));

    select_WidthSeries.options[$('#select_WidthSeries option[num=0]').prop('index')].hidden = false;
    select_WidthSeries.options[$('#select_WidthSeries option[num=7]').prop('index')].hidden = false;
  }
  else if(optionNumber == 2){
    select_WidthSeries.options[$('#select_WidthSeries option[num=0]').prop('index')].hidden = false;
    select_WidthSeries.options[$('#select_WidthSeries option[num=8]').prop('index')].hidden = false;
  }
  else if(optionNumber == 3){
    select_WidthSeries.options[$('#select_WidthSeries option[num=0]').prop('index')].hidden = false;
    select_WidthSeries.options[$('#select_WidthSeries option[num=8]').prop('index')].hidden = false;
  }
  else if(optionNumber == 4){
    select_WidthSeries.options[$('#select_WidthSeries option[num=0]').prop('index')].hidden = false;
  }
  else if(optionNumber == 7){

  }
  else if(optionNumber == 8){
    select_WidthSeries.options[$('#select_WidthSeries option[num=1]').prop('index')].hidden = false;
    select_WidthSeries.options[$('#select_WidthSeries option[num=2]').prop('index')].hidden = false;
    select_WidthSeries.options[$('#select_WidthSeries option[num=7]').prop('index')].hidden = false;
  }
  else if(optionNumber == 9){
    select_WidthSeries.options[$('#select_WidthSeries option[num=1]').prop('index')].hidden = false;
    select_WidthSeries.options[$('#select_WidthSeries option[num=7]').prop('index')].hidden = false;
  }
}
