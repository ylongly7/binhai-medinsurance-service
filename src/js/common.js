

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

__serviceTypeEnterAnim=function(){
	//$("#service_type").css({"display":"none"})
	for(var i=0;i<5;i++){		
        $("#main_service_type"+(i+1)).css({"display":"none"})
	}
	let factor = [1,0.95,0.92,0.88,0.8]
	for(var i=0;i<5;i++){		
        $("#main_service_type"+(i+1)).fadeIn(220*factor[i]*(i+1))
		console.log("#main_service_type"+(i+1))
	}
}

 
String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};
 

function getUrlParam(name)
{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r!=null) return unescape(r[2]);
  return null; //返回参数值
}