  $( function() {
    var availableTags = [
      "Apple",
      "Orange",
      "Mango",
      "Coffee"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );
