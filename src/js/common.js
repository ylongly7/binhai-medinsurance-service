__getClientWH=function(){
	var height = document.documentElement.clientHeight;
	var width = document.documentElement.clientWidth;	
	return [width,height];
	}
 

__listenWH = function(fun){
 
	window.onresize = function (){		
		var height = document.documentElement.clientHeight;
		var width = document.documentElement.clientWidth;
		//console.log(width,height)
		if(fun){
			fun(width,height)
		}
		 
	}
	
}
 