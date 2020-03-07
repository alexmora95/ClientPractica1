$(document).ready(function() {
  let pageNumber = 1;
  let prevData;
  let dataLen = 0;
  $("#version").html("v0.14");

  $("#searchbutton").click( function (e) {
    displayModal();
  });

  $("#searchfield").keydown( function (e) {
    if(e.keyCode == 13) {
      displayModal();
    }
  });

  function displayModal() {
    $(  "#myModal").modal('show');

    $("#status").html("Searching...");
    $("#dialogtitle").html("Search for: "+$("#searchfield").val());
    $("#previous").hide();
    $("#next").hide();
    $.getJSON('/search/' + $("#searchfield").val() , function(data) {
      renderQueryResults(data);
    });
  }

  $("#next").click( function(e) {
    ++pageNumber;
    afterPreviousNextClickCheck();
    renderQueryResults(prevData);
  });

  $("#previous").click( function(e) {
    --pageNumber;
    afterPreviousNextClickCheck();
    renderQueryResults(prevData);
  });

  function afterPreviousNextClickCheck() {
    if(dataLen-4*pageNumber > 0) {
      $("#next").show();
    } else {
      $("#next").hide();
    }

    if(pageNumber > 1) {
      $("#previous").show();
    } else {
      $("#previous").hide();
    }
  }

  function renderQueryResults(data) {

    if (data.error != undefined) {
      $("#status").html("Error: "+data.error);
    } else {
      dataLen = data.num_results;
      prevData = data;
      $("#status").html(""+data.num_results+" result(s)");
      for(let i=(pageNumber-1)*4, j=0; i<data.num_results && j<4; ++i, ++j) {
        $("#photo"+j).html("<img src='"+data.results[i]+"' height='250' width='250'>");
      }
      afterPreviousNextClickCheck();
    }
  }
});
