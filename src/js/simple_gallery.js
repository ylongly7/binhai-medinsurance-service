var initGallery = function(id,imgs){
    var arr =imgs
    console.log(arr)
    var intv = 3000
    setInterval(() => {
        var a1 = arr.shift()
        arr.push(a1)
        //console.log(a1)
        
        $("#"+id).fadeTo(200,0.9,()=>{
            $("#"+id).attr("src",a1)
            $("#"+id).fadeTo(200,1)
        })
    }, intv);
}