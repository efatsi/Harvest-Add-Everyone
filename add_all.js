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

addModal = function() {
  $("html").append('<div style="height: 100%;left: 0;position: fixed;top: 0;width: 100%;z-index: 9999;background-color: rgba(0,0,0,0.5);"><div style="position: absolute;top: 35%;left: 50%;width: 300px;line-height: 200px;height: 200px;margin-left: -150px;margin-top: -100px;background-color: #31C1C6;text-align: center;border-radius: 5px;z-index: 10;">Percent complete: <span id="percent-complete">0</span>%</div></div>')
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

commenceAdding = function(e, group) {
  e.preventDefault()
  addModal()

  if (group == "Everyone") {
    addEveryone()
  } else {
    addAll(group)
  }
}

div = $("#add_person_link")
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-everyone" href="#">+ Everyone</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-devs" href="#">+ DEV</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-feds" href="#">+ FED</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-ux" href="#">+ UX</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-des" href="#">+ DES</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-pms" href="#">+ PM</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-strat" href="#">+ STRAT</a>')
div.append('<a class="btn-submit btn-primary" style="float: none;" id="add-da" href="#">+ D&A</a>')

$("#add-everyone").click(function(e) {
  commenceAdding(e, "Everyone")
})

$("#add-devs").click(function(e) {
  commenceAdding(e, "Developers")
})

$("#add-feds").click(function(e) {
  commenceAdding(e, "Front-End Developers")
})

$("#add-ux").click(function(e) {
  commenceAdding(e, "User Experience")
})

$("#add-des").click(function(e) {
  commenceAdding(e, "Designers")
})

$("#add-pms").click(function(e) {
  commenceAdding(e, "Project Managers")
})

$("#add-strat").click(function(e) {
  commenceAdding(e, "Strategy")
})

$("#add-da").click(function(e) {
  commenceAdding(e, "Data & Analytics")
})
