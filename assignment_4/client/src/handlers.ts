function favMovieHandler() {
  $(document).on("submit", "#addToFavForm", function (e) {
    e.stopPropagation();
    e.preventDefault();
    const url = $(this).attr("action");
    const method = $(this).attr("method");
    const isFavorite = $(this).find("i").hasClass("fa-solid");
    $.ajax({
      url,
      method,
      success: function () {
        if (isFavorite)
          displayFlashMsg("Movie removed from favorites", "success");
        else displayFlashMsg("Movie added to favorites", "success");
      },
      error: function () {
        displayFlashMsg("Error occured", "error");
      },
    });
    $(this).find("i").toggleClass("fa-regular fa-solid");
  });
}

function flashMsgsAnimation() {
  // Slide down and fade in
  slideDownUpAnimation($(".alert"));
}

function displayFlashMsg(message: string, type: "success" | "error") {
  const flashMsgs = $(".flash-msgs");
  if (type === "success") {
    flashMsgs.append(`<div class="alert alert-success">${message}</div>`);
    slideDownUpAnimation(flashMsgs.children(".alert"));
  }
}

function slideDownUpAnimation(element: JQuery<HTMLElement>) {
  $(element)
    .hide()
    .slideDown(500, function () {
      $(this)
        .delay(1000)
        .slideUp(500, function () {
          $(this).remove();
        });
    });
}

const handlers = {
  favMovieHandler,
  flashMsgsAnimation,
};
export default handlers;
