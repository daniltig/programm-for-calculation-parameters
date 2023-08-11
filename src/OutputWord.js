const docx = require("docx");
const fs = require("fs");

const { ipcRenderer } = require("electron");
//ipcRenderer.invoke("showSaveDialog");

async function f_GetDirectory(){
   await ipcRenderer.invoke("showSaveDialog").then((result) => {
      console.log("asd" , result.filePath)

      f_CreateWordDocument(result.filePath);
   });


}

function f_CreateWordDocument(_path_and_name){
  console.log("!!!");


  const table = new docx.Table({
     rows:[
        f_CreateEmptyRow()
     ],
     width: {
        size: 100,
        type: docx.WidthType.PERCENTAGE,
     },
  });

  f_FillTable(table);

  // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
  // This simple example will only contain one section
  const doc = new docx.Document({
     sections: [{
        properties: {},
        children: [
            new docx.Paragraph({
               children: [
                  new docx.TextRun("Расчёт"),
               ],
               alignment: docx.AlignmentType.CENTER,
            }),
            new docx.Paragraph({
               children: [
                  new docx.TextRun(""),
               ],
            }),
            new docx.Paragraph({
               children:[
                  table,
               ],
            }),
         ],
      }],
   });

  // Used to export the file into a .docx file
  docx.Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(_path_and_name, buffer);
  });
}

function f_CreateHeading(_cellTitle, _cellName, _cellFormula, _cellValue, _cellRoundValue, _cellDeviation){
   let row = new docx.TableRow({
      children: [
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(_cellTitle)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(_cellName)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(_cellFormula)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(_cellValue)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(_cellRoundValue)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(_cellDeviation)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
      ],
   })

   return row;
}

function f_CreateRow(_cellTitle, _cellName, _cellFormula, _cellValue, _cellRoundValue, _cellMaxDeviation, _cellMinDeviation){


   let row = new docx.TableRow({
      children: [
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun({
                        children:[
                           _cellTitle
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
                     new docx.TextRun(_cellName)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(_cellFormula)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(String(_cellValue))
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               (function (){
                  if (_cellRoundValue == 0 && _cellRoundValue == 0 ||  _cellRoundValue == undefined && _cellRoundValue == undefined)
                     return new docx.Paragraph({
                     children: [
                        new docx.TextRun("-")
                     ],
                     alignment: docx.AlignmentType.CENTER,
                  })
                  else{
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(String(_cellRoundValue))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })(),
            ],
         }),
         new docx.TableCell({
            children:[
               (function (){
                  if (_cellMaxDeviation == 0 && _cellMinDeviation == 0 ||  _cellMaxDeviation == undefined && _cellMinDeviation == undefined)
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun("-")
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  else{
                     let paragraph1="";
                     if (_cellMaxDeviation>0) {
                        paragraph1 = "+"
                     }
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(paragraph1 + String(_cellMaxDeviation))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })(),
               (function (){
                  if (_cellMaxDeviation == 0 && _cellMinDeviation == 0 ||  _cellMaxDeviation == undefined && _cellMinDeviation == undefined){

                  }
                  else{
                     let paragraph2="";
                     if (_cellMinDeviation>0) {
                        paragraph2 = "+"
                     }
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(paragraph2 + String(_cellMinDeviation))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })()
            ]
         }),
      ],
   })

   return row;
}

function f_CreateRowFromVariable(_variable){
   let row = new docx.TableRow({
      children: [
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun({
                        children:[
                           _variable.name
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
                     new docx.TextRun(_variable.designation)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  children: [
                     new docx.TextRun(_variable.val.formula)
                  ],
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
         new docx.TableCell({
            children:[
               (function (){
                  if (_variable.val.rasch != 0 && _variable.val.rasch != undefined)
                     return new docx.Paragraph({
                     children: [
                        new docx.TextRun(String(_variable.val.rasch))
                     ],
                     alignment: docx.AlignmentType.CENTER,
                  })
                  else{
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(String(_variable.Val))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })(),
            ],
         }),
         new docx.TableCell({
            children:[
               (function (){
                  if (_variable.val.rasch == 0 ||  _variable.val.rasch == undefined)
                     return new docx.Paragraph({
                     children: [
                        new docx.TextRun("-")
                     ],
                     alignment: docx.AlignmentType.CENTER,
                  })
                  else{
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(String(_variable.Val))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })(),
            ],
         }),
         new docx.TableCell({
            children:[
               (function (){
                  if (_variable.val.maxDev == 0 && _variable.val.minDev == 0 ||  _variable.val.maxDev == undefined && _variable.val.minDev == undefined)
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun("-")
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  else{
                     let paragraph1="";
                     if (_variable.val.maxDev>0) {
                        paragraph1 = "+"
                     }
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(paragraph1 + String(_variable.val.maxDev))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })(),
               (function (){
                  if (_variable.val.maxDev == 0 && _variable.val.minDev == 0 ||  _variable.val.maxDev == undefined && _variable.val.minDev == undefined){

                  }
                  else{
                     let paragraph2="";
                     if (_variable.val.minDev>0) {
                        paragraph2 = "+"
                     }
                     return new docx.Paragraph({
                        children: [
                           new docx.TextRun(paragraph2 + String(_variable.val.minDev))
                        ],
                        alignment: docx.AlignmentType.CENTER,
                     })
                  }
               })()
            ],
         }),
      ],
   })

   return row;
}

function f_CreateEmptyRow(){
   let row = new docx.TableRow({
      children: [
         new docx.TableCell({
            children:[
               new docx.Paragraph({
                  alignment: docx.AlignmentType.CENTER,
               }),
            ],
         }),
      ],
   })

   return row;
}

function f_FillTable(_table){
   _table.root.push(f_CreateHeading("Наименование параметра","Обозначение параметра","Формула","Значение","Округлённое значение","Отклонение"));

   _table.root.push(f_CreateRowFromVariable(a));
   _table.root.push(f_CreateRowFromVariable(b));
   _table.root.push(f_CreateRowFromVariable(c));
   _table.root.push(f_CreateRowFromVariable(d));
   _table.root.push(f_CreateRowFromVariable(e));
   _table.root.push(f_CreateRowFromVariable(f));
   _table.root.push(f_CreateRowFromVariable(g));
   _table.root.push(f_CreateRowFromVariable(h));

   _table.root.push(f_CreateEmptyRow());

   l.OutputWord(_table);
   boolVar1.OutputWord(_table);
   if (f_method(select_1,0)){
      n.OutputWord(_table);
      m.OutputWord(_table);
   }
   else if (f_method(select_1,1)){
      m.OutputWord(_table);
      n.OutputWord(_table);
   }
   o.OutputWord(_table);
   p.OutputWord(_table);
   q.OutputWord(_table);
   r.OutputWord(_table);
   //Dw.OutputWord(_table);

}
