function display_step(step, page, materials, tools){
    /* print the step for the corresponding page */
    $("#instruction").append("STEP "+page+":<br>")
    $("#instruction").append(step["text"])
    /* put in the images for the tools and ingredients req */
    $.each(step["ingredients"], function(index, value){
        $.each(materials, function(i,v){
            console.log("material matches needed ing")
            if(v["name"].toLowerCase()===value.toLowerCase()){
                let img=v["img"]
                let to_append="<img src='"+img+"' alt='"+value+"' class='img img-fluid img-size'></img></div>"
                $("#ing_images").append(to_append)
            }
        })
    })
    $.each(step["tools"], function(index, value){
        $.each(tools, function(i,v){
            console.log("tool matches needed ing")
            if(v["name"].toLowerCase()===value.toLowerCase()){
                let img=v["img"]
                let to_append="<img src='"+img+"' alt='"+value+"' class='img img-fluid img-size'></img></div>"
                $("#tool_images").append(to_append)
            }
        })
    })
    /* put in next column visuals */
    $.each(step["img"], function(index, value){
        let alt="filler"
        let to_append="<div class='col'><img src='"+value+"' alt='"+alt+"' class='img img-fluid'></img></div>"
        $("#visuals").append(to_append)
    })
    let nextbutton = '<button class="next large-top-margin">Next</button>'
    $('#nextbutton').append(nextbutton)
    let backbutton = '<button class="back large-top-margin">Back</button>'
    $('#backbutton').append(backbutton)
}

function next(page, id){
    let pagenum = page
    if(pagenum<3){
        let nextpage = parseInt(page)
        nextpage = nextpage+1
        window.location.href="/learn/"+id+"/steps/"+nextpage
    }
    else{
        if(id==2){
            window.location.href="/quiz/1/0"
        }
        else{
            let nextid = parseInt(id)
            nextid = nextid+1
            window.location.href="/learn/"+nextid+"/materials/1"
        }
    }
    
}
function back(page, id){
    if(page==1){
        window.location.href="/learn/"+id+"/materials/2"
    }
    else{
        let prevpage = parseInt(page)
        prevpage = prevpage-1
        window.location.href="/learn/"+id+"/steps/"+prevpage
    }
    
}

$(document).ready(function(){
    display_step(step, page, materials, tools)
    
    $(".next").click(function(){
        next(page, id)
    })

    $(".back").click(function(){
        back(page, id)
    })
})
