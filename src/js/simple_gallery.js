let initGallery = function(id,imgs){
    let arr =imgs
    console.log(arr)
    let intv = 3000
    setInterval(() => {
        let a1 = arr.shift()
        arr.push(a1)
        //console.log(a1)
        
        $("#"+id).fadeTo(200,0.9,()=>{
            $("#"+id).attr("src",a1)
            $("#"+id).fadeTo(200,1)
        })
    }, intv);
}