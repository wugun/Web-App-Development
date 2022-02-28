var sales = [
  {
    salesperson: "James D. Halpert",
    client: "Shake Shack",
    reams: 100
  },
  {
    salesperson: "Stanley Hudson",
    client: "Toast",
    reams: 400
  },
  {
    salesperson: "Michael G. Scott",
    client: "Computer Science Department",
    reams: 1000
  }
];

var clientList = [
      "Shake Shack",
      "Toast",
      "Computer Science Department",
      "Teacher's College",
      "Starbucks",
      "Subsconsious",
      "Flat Top",
      "Joe's Coffee",
      "Max Caffe",
      "Nussbaum & Wu",
      "Taco Bell"];

function popSales(idx, val) {

  let newSale = $("<div></div>");
  newSale.addClass("row");

  let salesperson = $("<div></div>");
  salesperson.addClass("col-md-2");
  salesperson.html(val.salesperson);
  newSale.append(salesperson);

  let client = $("<div></div>");
  client.addClass("col-md-5");
  client.html(val.client);
  newSale.append(client);

  let number = $("<div></div>");
  number.addClass("col-md-2");
  number.html(val.reams);
  newSale.append(number);

  let buttonList = $("<div></div>");
  buttonList.addClass("col-md-1");

  let button = $("<button></button>");
  button.addClass("btn btn-warning");
  button.prop("id", idx);
  button.html("X");

  buttonList.append(button);
  newSale.append(buttonList);

  return newSale;
}

function updateSales() {
  $("#list").empty();

  $.each(sales, function(i, v) {
    let newSale = popSales(i, v);
    $("#list").append(newSale);
  });

  $(".btn-warning").click(function() {
    var index = $(this).attr("id");
    sales.splice(index, 1);
    updateSales();
  });
}

function submitSale() {
  let client = $("#clients").val();
  let reams = $("#reams").val();

  if (warningOrNot(client, reams)) {
    $("#cwarning").empty();
    $("#rwarning").empty();

    let newSale = {};
    const salespersonName = "salesperson";
    newSale["salesperson"] = salespersonName;
    newSale["client"] = client;
    newSale["reams"] = +reams;

    sales.unshift(newSale);

    if (!clientList.includes(client)) {
      clientList.push(client);
    }
    updateSales();

    $("#clients").val("");
    $("#reams").val("");
    $("#clients").focus();
  } else {
    warning(client, reams);
  }
}

function warningOrNot(client, reams) {
  if (typeof client == "undefined" || typeof reams == "undefined") {
    return false;
  } else {
    let valid = true;
    if (client.replace(/\s+/g, "").length == 0) {
      valid = false;
    } else if (reams.replace(/\s+/g, "").length == 0) {
      valid = false;
    } else if (!/^\d+$/.test(reams.replace(/\s+/g, ""))) {
      valid = false;
    }
    return valid;
  }
}

function warning(client, reams) {
  $("#cwarning").empty();
  $("#rwarning").empty();

  if (reams.replace(/\s+/g, "").length == 0) {
    let rWarning = $("<div></div>");
    rWarning.html("The number of reams is empty.");
    $("#rwarning").append(rWarning);
    $("#reams").focus();
  } else if (!/^\d+$/.test(reams.replace(/\s+/g, ""))) {
    let rWarning = $("<div></div>");
    rWarning.html("The number of reams is invalid.");
    $("#rwarning").append(rWarning);
    $("#reams").focus();
  }

  if (client.replace(/\s+/g, "").length == 0) {
    var cWarning = $("<div></div>");
    cWarning.html("The client is empty.");
    $("#cwarning").append(cWarning);
    $("#client").focus();
  }
}

$(document).ready(function() {
  updateSales();
  $("#clients").autocomplete({
    source: clientList
  });

  $("#submit").click(function() {
    submitSale();
  });

  $("#reams").keyup(function(e) {
    if (e.which == 13) {
      $("#reams").val(
        $("#reams")
          .val()
          .replace(/(\r\n|\n|\r)/gm, "")
      );
      submitSale();
    }
  });

})
