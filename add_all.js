var url        = "user_assignments"
var auth_token = $("meta[name=csrf-token]").attr("content")

var children = $("#people-select").children()
var ids      = []
var idIndex  = 0

for (i = 1; i < children.length; i++) {
  ids.push(children[i].value)
}

var idCount = ids.length

alertTest = function() {
  alert("TEST")
}

reloadPage = function() {
  location.reload()
}

updateCounter = function(numberDone) {
  percentage = ((numberDone / idCount) * 100).toFixed(0)
  $("#percent-complete").html(percentage)
}

postTheData = function() {
  data = {user: {id: ids[idIndex]}, authenticity_token: auth_token}
  $.post(url, data)

  idIndex += 1
  updateCounter(idIndex)

  if (idIndex == idCount) {
    setTimeout(reloadPage, 200)
  }
  else {
    setTimeout(postTheData, 100)
  }
}

grayOutScreen = function() {
  $("html").append('<div style="position: absolute;top: 50%;left: 50%;width: 300px;line-height: 200px;height: 200px;margin-left: -150px;margin-top: -100px;background-color:#31C1C6;text-align: center;border-radius: 5px;z-index: 10;box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);">Percent complete: <span id="percent-complete">0</span>%</div>')
}

addEveryone = function(e) {
  e.preventDefault()

  grayOutScreen()

  postTheData()
}

div = $("#add_person_link")
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-everyone" href="#">Add Everyone</a>')

$("#add-everyone").click(addEveryone)


// var jq = document.createElement('script');
// jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
// document.getElementsByTagName('head')[0].appendChild(jq);
