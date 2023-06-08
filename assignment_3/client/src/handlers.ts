function favMovieHandler() {
  $(document).on("click", ".fav-icon", function (e) {
    e.stopPropagation();
    $(this).children("i").toggleClass("fa-solid fa-regular");
  });
}

function flashMsgsAnimation() {
  // Slide down and fade in
  $(".alert")
    .hide()
    .slideDown(500, function () {
      $(this).delay(1000).slideUp(500);
    });
}

const handlers = {
  favMovieHandler,
  flashMsgsAnimation,
};
export default handlers;
