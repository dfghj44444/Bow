angular.module('app.controllers').controller('RecordNewCtrl3', function($scope,$state,$cordovaCamera,DateService) {


  var canvas=document.getElementById("myCanvas");
  var context2D =canvas.getContext("2d");  
  
           context2D.beginPath();  
         context2D.moveTo(50,50);  
         context2D.lineTo(100,100);  
         context2D.moveTo(200,50);  
         context2D.lineTo(100,100);  
         context2D.stroke();  
         //绘制与这两条线段相切的红色圆弧  
         context2D.beginPath();  
         context2D.strokeStyle= "#ff0000";  
         context2D.moveTo(50,50);  
         context2D.arcTo(100,100, 200, 50, 100);  
         context2D.stroke();  
         //绘制一个蓝色的圆  
         context2D.beginPath();  
         context2D.strokeStyle= "#0000ff";  
         context2D.arc(300,250, 100, 0, Math.PI * 2, false);  
         context2D.stroke();  
         //将上面的圆填充为灰色  
         context2D.fillStyle ="#00a3a3";  
         context2D.fill();  
         //在上面的圆中剪辑一个圆形方形区域  
         context2D.beginPath();  
         context2D.rect(250,200, 100, 100);  
         context2D.clip();  
         //在剪辑区域中填充一个大于该区域尺寸的矩形  
         context2D.fillStyle ="yellow";  
         context2D.fillRect(0,0, 400, 400);  
   var pic = new Image();  
   pic.src ="../img/60ba.jpg";  
   context2D.drawImage(pic,0, 0);  
 //alert(x.innerHTML);
})