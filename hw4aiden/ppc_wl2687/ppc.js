var employees = [
"Phyllis",
"Angela",
"Dwight",
"Oscar",
"Creed",
"Pam",
"Jim",
"Stanley",
"Michael",
"Kevin",
"Kelly"
]

//popNames -> droppable -> dropHandler -> updateNames -> popNames

var list1 = employees
var list2 = []

function dragHandler(i, name) {
    var newName = $("<div></div>")
    newName.html((i + 1) + ": " + name)
    newName.addClass("name")
    return newName
}

function popNames() {
    $.each(["#list1-list", "#list2-list"], function (i, selector) {
        $(selector).empty()
        $.each([list1, list2][i], function (i, name) {
            var person = dragHandler(i, name)
            $(selector).append(person)
        })
    })

    $(".name").draggable({
        revert: true,
        start: function(e, ui) {
          $("#list1").addClass("blue")
          $("#list2").addClass("blue")
        },
        stop: function(e, ui) {
          $("#list1").removeClass("blue")
          $("#list2").removeClass("blue")
        }
    })

    $(".name").hover(
        function() {
            $(this).addClass("lightyellow")
        },
        function() {
            $(this).removeClass("lightyellow")
        }
    )
}

function updateNames(name, from, to) {
    var i = eval(from).indexOf(name)
    eval(from).splice(i,1)
    eval(to).push(name)
}

function dropHandler(e, ui, current) {

    current.removeClass("bluest")
    name = ui.draggable.html().slice(3)
    var pi = ui.draggable.parent().attr('id')
    var from = pi == "list1-list"? "list1" : "list2"
    updateNames(name, from, current.attr('id'))
    popNames()
}

$(document).ready(function () {
    popNames()
    $("#list2").droppable({
        over: function (e, ui) {
            $(this).addClass("bluest")
        },
        out: function (e, ui) {
            $(this).removeClass("bluest")
        },
        drop: function (e, ui) {
            dropHandler(e, ui, $(this))
        }
    })

    $("#list1").droppable({
        over: function (e, ui) {
            $(this).addClass("bluest")
        },
        out: function (e, ui) {
            $(this).removeClass("bluest")
        },
        drop: function (e, ui) {
            dropHandler(e, ui, $(this))
        }
    })
})
