var url        = "user_assignments"
var auth_token = $("meta[name=csrf-token]").attr("content")

var children = $("#people-select").children()

var ids     = []
var idCount = 0
var idIndex = 0

var employeeData
$.ajax({
  url     : "https://cropduster.vigetx.com/api/labs",
  success : function(r) {
    employeeData = r
  }
})

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

  if (idCount == 0 || idIndex == idCount) {
    setTimeout(reloadPage, 200)
  }
  else {
    setTimeout(postTheData, 100)
  }
}

grayOutScreen = function() {
  $("html").append('<div style="position: absolute;top: 50%;left: 50%;width: 300px;line-height: 200px;height: 200px;margin-left: -150px;margin-top: -100px;background-color:#31C1C6;text-align: center;border-radius: 5px;z-index: 10;box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);">Percent complete: <span id="percent-complete">0</span>%</div>')
}

addEveryone = function() {
  for (i = 1; i < children.length; i++) {
    ids.push(children[i].value)
  }

  idCount = ids.length

  postTheData()
}

addAll = function(lab) {
  labNames = employeeData[lab]

  for (i = 1; i < children.length; i++) {
    if (labNames.indexOf(children[i].text) != -1) {
      ids.push(children[i].value)
    }
  }

  idCount = ids.length

  postTheData()
}

div = $("#add_person_link")
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-everyone" href="#">+ All</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-devs" href="#">+ DEV</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-feds" href="#">+ FED</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-ux" href="#">+ UX</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-des" href="#">+ DES</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-pms" href="#">+ PM</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-strat" href="#">+ STRAT</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-da" href="#">+ D&A</a>')

$("#add-everyone").click(function(e) {
  e.preventDefault()
  grayOutScreen()

  addEveryone()
})

$("#add-devs").click(function(e) {
  e.preventDefault()
  grayOutScreen()

  addAll("Developers")
})

$("#add-feds").click(function(e) {
  e.preventDefault()
  grayOutScreen()

  addAll("Front-End Developers")
})

$("#add-ux").click(function(e) {
  e.preventDefault()
  grayOutScreen()

  addAll("User Experience")
})

$("#add-des").click(function(e) {
  e.preventDefault()
  grayOutScreen()

  addAll("Designers")
})

$("#add-pms").click(function(e) {
  e.preventDefault()
  grayOutScreen()

  addAll("Project Managers")
})

$("#add-strat").click(function(e) {
  e.preventDefault()
  grayOutScreen()

  addAll("Strategy")
})

$("#add-da").click(function(e) {
  e.preventDefault()
  grayOutScreen()

  addAll("Data & Analytics")
})



// var jq = document.createElement('script');
// jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
// document.getElementsByTagName('head')[0].appendChild(jq);
