 
    function makeDrugStoreList(ss){
        var ret = ""
        for(var k in village_drugstore){
            let dat = village_drugstore[k]
           // console.log(dat)
            let s1 = ss.format({
                0:dat["name"],             
                1:dat["tel"],                
                2:dat["address"],
                3:dat["tel"],
                "k":dat["name"],
                "idx":k
                }
                )
            ret = ret+s1
        }
        return ret
    }

    
       
    
        function bindNavBtnClick(dat){
            for(var k in dat){
                let id = "#naviToBtn"+k
                $(id).on("click", (function( pa){
                    let clouser = function( ){
                        var $iosActionsheet = $('#iosActionsheet');
                        var $iosMask = $('#iosMask');
                        
                        console.log( pa)
                        let posstr = dat[pa]["point"]
                        let postrarr = posstr.split(",")      
                        $("#stmap_para_lng").html(postrarr[0])
                        $("#stmap_para_lat").html(postrarr[1])
                        $("#stmap_para_address").html( dat[pa]["name"])
                        
                        function hideActionSheet() {
                                $iosActionsheet.removeClass('weui-actionsheet_toggle').attr('aria-hidden','true');
                                $iosMask.fadeOut(200);
                                $('#naviToBtn').trigger('focus');
                            }

                        $iosMask.on('click', hideActionSheet);
                        $('#iosActionsheetCancel').on('click', hideActionSheet);
                                //console.log("naviToBtn0",$iosActionsheet)
                    
                        $iosActionsheet.attr('aria-hidden','false').addClass('weui-actionsheet_toggle');

                        $iosMask.fadeIn(200);
                        setTimeout(function(){
                        $('#current1').trigger('focus');
                        },200)
                     }
                     return clouser
                })(k));
        }
    }

    function openAppNavi(idx){
         
            var lng = parseFloat( $("#stmap_para_lng").html())
            var lat = parseFloat( $("#stmap_para_lat").html())
            var address =  $("#stmap_para_address").html()
            __openBaiduMap(lng,lat,address,idx)
            return;
        
    }

    // function openNaviDlg(k){
    //     console.log(k)
    //     $iosActionsheet.attr('aria-hidden','false').addClass('weui-actionsheet_toggle');
    //         $iosMask.fadeIn(200);
    //         setTimeout(function(){
    //           $('#current1').trigger('focus');
    //         },200)
    // }

 