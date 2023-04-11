$(function () {
  $("#openModalBtn").on("click", function () {
    $("#recipieName").trigger("focus");
    $("input, textarea").val("");
  });
  renderRecipies();
  $("#addRecipieBtn").on("click", function (e) {
    const data = {
      title: $("#recipieName").val(),
      body: $("#recipieBody").val(),
    };
    addRecipie(data);
    toggleModal();
  });

  $("#exampleModal").on("hidden.bs.modal", function () {
    hideUpdateButton();
  });

  function renderRecipies() {
    showSpinner();
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/recipes",
      method: "get",
      success: getRecipieHandler,
    });
  }
  function addRecipie(data) {
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/recipes",
      method: "post",
      data: data,
      success: renderRecipies,
    });
  }
  function updateRecipie(id, data) {
    $.ajax({
      url: `https://usman-fake-api.herokuapp.com/api/recipes/${id}`,
      method: "put",
      data: data,
      success: renderRecipies,
    });
  }
  function toggleModal(hideUpdate, idToEdit) {
    if (hideUpdate) {
      hideUpdateButton();
    } else {
      showUpdateButton(idToEdit);
    }
    $("#exampleModal").modal("toggle");
  }

  function showSpinner() {
    $(".spinner").removeClass("d-none");
  }
  function hideSpinner() {
    $(".spinner").addClass("d-none");
  }
  function deleteRecipieHandler() {
    showSpinner();
    const idToDelete = $(this).parent().parent().attr("id");
    $.ajax({
      url: `https://usman-fake-api.herokuapp.com/api/recipes/${idToDelete}`,
      method: "delete",
      success: renderRecipies,
    });
  }
  function editRecipieHandler() {
    toggleModal();
    const parentRow = $(this).parent();
    const idToEdit = parentRow.parent().attr("id");
    const title = parentRow.siblings("td.rTitle").text();
    const body = parentRow.siblings("td.rBody").text();
    $("#recipieBody").val(body);
    $("#recipieName").val(title);
    toggleModal(false, idToEdit);
  }

  function hideUpdateButton() {
    $("#updateRecipieBtn").addClass("d-none");
    $("#addRecipieBtn").removeClass("d-none");
    $("#updateRecipieBtn").attr("data-id", "");
  }
  function showUpdateButton(id) {
    $("#updateRecipieBtn").removeClass("d-none");
    $("#addRecipieBtn").addClass("d-none");
    $("#updateRecipieBtn").attr("data-id", id);
  }

  $("#updateRecipieBtn").on("click", function (e) {
    const id = $(this).attr("data-id");
    const data = {
      title: $("#recipieName").val(),
      body: $("#recipieBody").val(),
    };
    updateRecipie(id, data);
    toggleModal(true);
  });
  function getRecipieHandler(recipes) {
    const tbody = $("tbody").empty();
    hideSpinner();
    console.log(recipes);
    recipes.forEach((recipe, index) => {
      tbody.append(`<tr id='${recipe._id}'>
      <td>${index + 1}</td>
      <td class='rTitle'>${recipe.title}</td>
      <td class='rBody'>${recipe.body}</td>
      <td>
      <button class='btn btn-danger delete-recipie-btn'>Delete</button>
      <button class='btn btn-success edit-recipie-btn'>Edit</button>
      </td>
    </tr>`);
    });
    $(".delete-recipie-btn").on("click", deleteRecipieHandler);
    $(".edit-recipie-btn").on("click", editRecipieHandler);
  }
});
