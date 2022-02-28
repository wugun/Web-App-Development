var names = [
    "Phyllis",
    "Angela"
    ]

var list1 = names
var list2 = []

function dragHandler(i, name) {
    var newName = $("<div></div>")
    newName.html(name)
    newName.addClass("name")
    return newName
}

function popNames() {
    $.each(["#list1-list", "#list2-list"], function (i, selector) {
        $(selector).empty()
        $.each([list1, list2]][i], function (i, name) {
            var person = dragHandler(i, name)
            $(selector).append(person)
        })
    })

    $(".name").draggable({
        revert: true,
        start: function(e, ui) { },
        stop: function(e, ui) { }
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

    current.removeClass("blue")
    name = ui.draggable.html()
    console.log(name)
    var pi = ui.draggable.parent().attr('id')
    var from = pi == "list1-list"? "list1" : "list2"
    updateNames(name, from, current.attr('id'))
    popNames()
}

$(document).ready(function () {
    popNames()
    $("#list2").droppable({
        over: function (e, ui) {
            $(this).addClass("blue")
        },
        out: function (e, ui) {
            $(this).removeClass("blue")
        },
        drop: function (e, ui) {
            dropHandler(e, ui, $(this))
        }
    })

    $("#list1").droppable({
        over: function (e, ui) {
            $(this).addClass("blue")
        },
        out: function (e, ui) {
            $(this).removeClass("blue")
        },
        drop: function (e, ui) {
            dropHandler(e, ui, $(this))
        }
    })
})
