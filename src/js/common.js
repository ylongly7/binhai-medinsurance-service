

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
	var factor = [1,0.95,0.92,0.88,0.8]
	for(var i=0;i<5;i++){		
        $("#main_service_type"+(i+1)).fadeIn(220*factor[i]*(i+1))
		console.log("#main_service_type"+(i+1))
	}
}
 

 
String.prototype.format = function(kv) {
    var formatted = this;
    for( var k in kv ) {
		var reg = new RegExp("\\{"+k+"\\}","g")		 
        formatted = formatted.replace (reg, kv[k]);
    }
    return formatted;
};

function __strFormat(ss,kv){
	var formatted = ss;
	for( var k in kv ) {
		var reg = new RegExp("\\{"+k+"\\}","g")		 
        formatted = formatted.replace (reg, kv[k]);
    }
	return formatted;
}

function getUrlParam(name)
{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r!=null) return unescape(r[2]);
  return null; //返回参数值
}


function __get_location() {
	navigator.geolocation.getCurrentPosition(__showlatlng, __handle_error, {});
	console.log("__get_location")
  }
  function __handle_error(err) {
	console.log(err)
	switch(err.code)  {  
	  case err.PERMISSION_DENIED: 
	  console.log("	  case err.PERMISSION_DENIED ") 
		break;  
	  case err.POSITION_UNAVAILABLE:  
	  console.log("	  POSITION_UNAVAILABLE ") 
		break;  
	  case err.TIMEOUT:  
	  console.log("	  TIMEOUT ")
		break;  
	  case err.UNKNOWN_ERROR:  
	  console.log("	  UNKNOWN_ERROR ")
		break;  
	}
  
  }
  function __showlatlng(position) {

	var latitude = position.coords.latitude;//获取纬度
  
	var longitude = position.coords.longitude;//获取经度
	console.log("__showlatlng",latitude, longitude)
  
  }

function __openBaiduMap(lng, lat, address,idx) {
	//console.log(lng,lat,address,idx)
	var bd09togcj02=coordtransform.bd09togcj02(lng, lat);
	if (idx==0){
		lng = bd09togcj02[0]
		lat = bd09togcj02[1]
		var web_url = `http://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${lng};addr:${address}`
		 
		window.location.href = web_url;
		 
	}
	else if(idx==2){
		lng = bd09togcj02[0]
		lat = bd09togcj02[1]
		var web_url = `http://uri.amap.com/marker?position=${lng},${lat}&name=${address}&coordinate=gaode&callnative=1`
		window.location.href = web_url;
		 
	}
	else{
		var geolocation = new BMapGL.Geolocation();
		geolocation.getCurrentPosition(function (result) {
			if (this.getStatus() == BMAP_STATUS_SUCCESS) {
				var queryString = `origin=latlng:${result.point.lat},${result.point.lng}|name:我的位置&destination=latlng:${lat},${lng}|name:${address}&mode=driving&coord_type=bd09ll`;
				var app_url = `baidumap://map/direction?${queryString}`;

				var web_url = `http://api.map.baidu.com/direction?${queryString}&region=中国&output=html`;
				//https://link.zhihu.com/?target=http%3A//api.map.baidu.com/marker%3Flocation%3D
				// if (idx==0){
				// 	web_url = `http://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${lng};addr:${address}`
				// }
				// if(idx==2){
				// 	web_url = `http://uri.amap.com/marker?position=${lng},${lat}&name=${address}&coordinate=gaode&callnative=1`
				// }

				//尝试唤起百度地图App
				window.location.href = web_url;
				
			
			} else {
					alert("获取不到定位，请检查手机设置！");
			}
			});
	}
}



// 加密
function encryptByAES (data) {
	var aeskey="0123456789abcdef"
	var key = CryptoJS.enc.Utf8.parse(aeskey);
	var encryptData = CryptoJS.AES.encrypt(data, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encryptData.toString();
}

// 解密
function decryptedByAES (data){
	var aeskey = "0123456789abcdef";
	var key = CryptoJS.enc.Utf8.parse(aeskey);
	var decryptedData =  CryptoJS.AES.decrypt(data, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return decryptedData.toString(CryptoJS.enc.Utf8);
}


function decrypHtmlByEleIds(ids){
	for (var k in ids){
		var h = $("#"+ids[k]).html()
		//console.log(h)
		h = h.trim()
		h = decryptedByAES(h)
		$("#"+ids[k]).html(h)
		$("#"+ids[k]).show()
	}
}

function getRootPath(){
		//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
		var curWwwPath=window.document.location.href;
		//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
		var pathName=window.document.location.pathname;
		var pos=curWwwPath.indexOf(pathName);
		//获取主机地址，如： http://localhost:8083
		var localhostPaht=curWwwPath.substring(0,pos);
		//获取带"/"的项目名，如：/uimcardprj
		var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
		return(projectName);
	}

var rootUrl = ""