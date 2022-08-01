<template>
<section>
 <div style="width: 100%" v-html="excelHtml" class="ant-table-bordered">
  </div>
  <canvas ref="canvas" width="600" height="800">你好你的浏览器不支持</canvas>
</section>

</template>

<script>
import { reactive,toRefs,ref,onMounted} from '@vue/composition-api';
import initSqlJs from "sql.js";
import XLSX from 'xlsx';
import {Table} from 'ant-design-vue';
// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
export default {
    name: 'viewExcel',
    components:{
      Table
    },
      setup() {
        const state=reactive({
          excelHtml:'',
        })
        const canvas=ref(null);
       async function loadSql(sql, path) {
      return new Promise(async (reslove, relect) => {
      try {
      const SQL = await initSqlJs({ locateFile: () => sqlWasm });

      const dataPromise = await fetch(path).then(res => res.arrayBuffer());

      const db = new SQL.Database(new Uint8Array(dataPromise));
      const contents = db.exec(sql);
      reslove(contents)
    } catch (error) {
      relect(error)
    }
    })
  //select * from COMPANY
  
}
function drawCloud(){
  function drawArc(ctx,x,y,r,startPI,endPI){
  ctx.arc(x,y,r,startPI,endPI);
  }
  const canvasDom=canvas.value;
  const context=canvasDom.getContext('2d');
  let startx=80;
  const startY=80;
  const endX=240;
  const endY=240;
    
   context.strokeStyle  = "red"; 
   let x=startx+3;
   for(let  i=0;i<=Math.floor((endX-startx)/12);i++){
     context.beginPath();
      drawArc(context,x,startY,6,-Math.PI,0);
          context.stroke();
     context.closePath();
      x=x+12
  
   }
   console.log(x)

      let y=startY+3;
      for(let  i=0;i<=Math.floor((endY-startY)/12);i++){
         context.beginPath();
        drawArc(context,startx,y,6,0.5*(Math.PI),1.5*(Math.PI));
        context.stroke();
        context.closePath();
       y=y+12;
       
       }

       let x1=startx+3;
     for(let  i=0;i<=Math.floor((endX-startx)/12);i++){
     context.beginPath();
        drawArc(context,x1,endY,6,0,Math.PI);
          context.stroke();
       context.closePath();
       x1=x1+12
     
     }

       let y1=startY+3;
     for(let  i=0;i<=Math.floor((endY-startY)/12);i++){
     context.beginPath();
        drawArc(context,endX,y1,6,1.5*(Math.PI),0.5*(Math.PI));
          context.stroke();
       context.closePath();
       y1=y1+12;
     
     }
  
        //  drawArc(context,140,100,20,0.5*(Math.PI),1.5*(Math.PI));
        //      context.stroke();
        //    context.closePath();



        //       context.beginPath();
        //      drawArc(context,140,140,20,0.5*(Math.PI),1.5*(Math.PI));
        //       context.stroke();
        //   context.closePath();
  //  //设置线宽和描边颜色
  //context.lineWidth  =  3;
  
}
onMounted(async() => {
  drawCloud()
  document.addEventListener('copy',(e)=>{

    e.preventDefault();
    let selObj = window.getSelection();
    console.log(selObj,11);
    let clipboardData = e.clipboardData || window.clipboardData;
    clipboardData.setData('text/plain', selObj);
  });
  const _HW_EXPORT_REVIT_ORDER_Id_='_HW_EXPORT_REVIT_ORDER_Id_'
   const sqlData=`select * from DataTable order by ${_HW_EXPORT_REVIT_ORDER_Id_} desc`;
    const  sqlHeader="select * from HeaderTable order by id desc";
    const headerData=await loadSql(sqlHeader, './测试用的.db');
     const tableData= await loadSql(sqlData, './测试用的.db');
     //查出两个表的数据
    debugger
    console.log(headerData,tableData);
    const obj={}
     headerData[0].values.filter(res=>res[3]==0).forEach(res=>{
      obj[res[0]]=res[2]});
       //obj={'A':'value'}//两个表的映射表头


      const header=tableData[0].columns.filter(res=>res!='_HW_EXPORT_REVIT_ORDER_Id_').map(key=>{
        return obj[key]
      })
      //一级表头


      const mergesHea=headerData[0].values.filter(res=>res[3]>0).map(res=>{
        return res[3]
      });
     //表示几层合并的表头
        const merges=[];
        const mergesHeaer=[];
        const maxNum=Math.max.call(null,...mergesHea);//总共合并了几级表头
      for(let i=1;i<= maxNum;i++){
      
          const data=  headerData[0].values.filter(res=>res[3]>0 && res[3]==i);
          //console.log(data,33)
          
          const arr=[];
          header.forEach(res=>{
            arr.push(null)
          })
            data.forEach((item,index)=>{
              // arr.unshift(item[2]);
               const startIndex=tableData[0].columns.indexOf(item[0]);
               const endIndex=tableData[0].columns.indexOf(item[1]);
                // arr[startIndex]=item[2];
                // arr[endIndex]=null;
                arr.splice(startIndex,1,item[2]);
                merges.push({s: {r: (maxNum-item[3]), c: startIndex}, e: {r: (maxNum-item[3]), c: endIndex}});
              
            //  if(index==data.length-1){
            //    dataArr.unshift(arr);
            //  }
            })
           mergesHeaer.unshift(arr);
      }
      //['三维尺寸', null, null, null, null]//表示合并的表头
     const data2=tableData[0].values;
     const fileName='test.xlsx';
      const excleData=[...mergesHeaer,[...header]];
       data2.forEach(res=>{
         res.pop()
         excleData.push(res);
       })
       console.log(excleData);
        var ws_name = "Sheet1"; //Excel第一个sheet的名称
        var wb = XLSX.utils.book_new(), 
        ws = XLSX.utils.aoa_to_sheet(excleData);
                XLSX.utils.book_append_sheet(wb, ws, ws_name);  //将数据添加到工作薄
        var worksheet = wb.Sheets[ws_name];
        console.log(worksheet)
        worksheet['!merges'] = merges;


          // const blob=sheet2blob(worksheet);
          //  console.log(blob);
          //    const a = document.createElement('a');
          //     const href = URL.createObjectURL(blob);
          //     a.href = href;
          //     a.download = `${'明细表'}.${'xlsx'}`;
          //     a.click();
          //     URL.revokeObjectURL(blob);
             
           state.excelHtml=XLSX.utils.sheet_to_html(worksheet);
           
          // return worksheet
           //XLSX.writeFile(wb, fileName);

      function sheet2blob(sheet, sheetName) {
	sheetName = sheetName || 'sheet1';
	var workbook = {
		SheetNames: [sheetName],
		Sheets: {}
	};
	workbook.Sheets[sheetName] = sheet;
	// 生成excel的配置项
	var wopts = {
		bookType: 'xlsx', // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: 'binary'
	};
	var wbout = XLSX.write(workbook, wopts);
	var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
	// 字符串转ArrayBuffer
	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
	return blob;
}

        function csv2table(csv)
      	{
		var html = '<table>';
		var rows = csv.split('\n');
		rows.pop(); // 最后一行没用的
		rows.forEach(function(row, idx) {
			var columns = row.split(',');
			columns.unshift(idx+1); // 添加行索引
			if(idx == 0) { // 添加列索引
				html += '<thead class="ant-table-thead"><tr>';
				for(var i=1; i<columns.length; i++) {
					html += '<th>' + (i==0?'':String.fromCharCode(65+i-1)) + '</th>';
				}
				html += '</tr></thead><tbody class="ant-table-tbody">';
			}
			html += '<tr>';
			columns.forEach(function(column,index) {
        if(index>0){
          html +='<td>'+column+'</td>';
        }
			
			});
			html += '</tr>';
		});
		html += '</table></tbody>';
		return html;
	}

   
       //state.excelHtml=csv2table(XLSX.utils.sheet_to_csv(worksheet));

})
      
      return{
        ...toRefs(state),
        canvas,
      }
      
      }
  };
</script>
<style scoped lang='scss'>
::v-deep {
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
    padding: 8px;
  }
}
.ant-table-bordered{
  ::v-deep{
    table{
     border: 1px solid #e8e8e8;
     tr{
           width: 100%;
    text-align: left;
    border-radius: 4px 4px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    td{
      text-align: center;
      border-right: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;
      transition: background .3s;
          overflow-wrap: break-word;
      padding: 4px 8px;
    }
     }
    }
  }
}
canvas{
  border: 1px solid pink;
}
</style>