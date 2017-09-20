function getSum(total, num) {
  return total + num;
}

function getArr(array, min) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === min) {
      return [i];
    }
  }
}

function post(info) {
  $.post("/api/new", info)
  .done(function(data) {
    console.log(data);
  });
}

function showFriend(data, num) {
  $("#matchName").text(data[num].name);
  $("#matchImg").attr("src", data[num].photo);
}

$("#subAns").on("click", function(event) {
  event.preventDefault();
  var results = {
    name: $("#name").val().trim(),
    photo: $("#photo").val().trim(),
    scores: [
      $('input[name=q1]:checked').val() || 0,
      $('input[name=q2]:checked').val() || 0,
      $('input[name=q3]:checked').val() || 0,
      $('input[name=q4]:checked').val() || 0,
      $('input[name=q5]:checked').val() || 0,
      $('input[name=q6]:checked').val() || 0,
      $('input[name=q7]:checked').val() || 0,
      $('input[name=q8]:checked').val() || 0,
      $('input[name=q9]:checked').val() || 0,
      $('input[name=q10]:checked').val() || 0,
    ]
  }

  var comp = false;
  for (var i = 0; i < results.scores.length; i++) {
    if (results.scores[i] < 1) {
      comp = false;
      $("#matchName").text("Please answer all questions.");
      return
    } else {
      comp = true;
    }
    console.log(comp);
  }

  if (comp) {
    $.get("/api/", function(data) {
      var diff = [];

      for (var i = 0; i < data.length; i++) {
        var math = [];
        for (var j = 0; j < data[i].scores.length; j++) {
          var friendPoints = parseInt(data[i].scores[j]);
          var userPoints = parseInt(results.scores[j]);
          math.push(Math.abs(friendPoints - userPoints));
        }
        diff.push(math.reduce(getSum));
        console.log(diff);
      }

      Array.min = function(array) {
        return Math.min.apply(Math, array);
      };
      var minDiff = Array.min(diff);
      var minArr = getArr(diff, minDiff);

      console.log(minDiff);
      console.log(minArr);
      showFriend(data, minArr);
      post(results);
    });
  }
});
