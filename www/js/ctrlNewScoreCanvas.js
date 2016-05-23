angular.module('app.controllers').controller('RecordNewCtrl3', function($scope) {


   var canvas=document.getElementById("myCanvas");
   context2D = canvas.getContext("2d");  

   var image = new Image();;
   image.onload = function()
   {
      context2D.drawImage( image,0,0,canvas.width,canvas.width);   
   };
   image.src = "img/60ba.jpg";
   //alert(x.innerHTML);
   canvas.height = canvas.width;
})