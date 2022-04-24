
function load_home(data){
    /* list available cocktails with links to learning pages */
    $.each(data, function(index, value){
        $("#cocktails").append(value["title"]+'<br>')
    })
}

function get_entry_time(user_data) {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log(dateTime);
  user_data["loginTime"] = dateTime
  console.log(user_data)
}

function startlearn(){
    window.location.href="/learn/0/materials/1"
}

$(document).ready(function(){
    load_home(data)
    get_entry_time(user_data)
    $("#startbutton").click(function(){
        startlearn()
    })
})
