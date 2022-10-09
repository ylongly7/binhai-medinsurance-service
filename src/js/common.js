

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
 

 
String.prototype.format = function(kv) {
    var formatted = this;
    for( var k in kv ) {		 
        formatted = formatted.replaceAll ("{"+k+"}", kv[k]);
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
		let web_url = `http://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${lng};addr:${address}`
		 
		window.location.href = web_url;
		return 
	}
	if(idx==2){
		lng = bd09togcj02[0]
		lat = bd09togcj02[1]
		let web_url = `http://uri.amap.com/marker?position=${lng},${lat}&name=${address}&coordinate=gaode&callnative=1`
		window.location.href = web_url;
		return
	}
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



// 加密
function encryptByAES (data) {
	let aeskey="0123456789abcdef"
	let key = CryptoJS.enc.Utf8.parse(aeskey);
	let encryptData = CryptoJS.AES.encrypt(data, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encryptData.toString();
}

// 解密
function decryptedByAES (data){
	let aeskey = "0123456789abcdef";
	let key = CryptoJS.enc.Utf8.parse(aeskey);
	let decryptedData =  CryptoJS.AES.decrypt(data, key, {
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
	}
}