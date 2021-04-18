let bt = $(".btn-classified");

// add background color if the button selected
$(".btn-group > button").on("click", function() {

  $(".btn-group > button").removeClass("btn-select")

  $(this).addClass("btn-select")

});

// init Isotope
let grid = $('.grid').isotope({});
  // filter items on button click
  $('.filter-button-group').on( 'click', 'button', function() {
    let filterValue = $(this).attr('data-filter');
    grid.isotope({ filter: filterValue });
  });