var $trigger = $('.trigger');
var $expandable = $('.expandable');

$trigger.click(function() {
  $expandable.toggleClass('expanded');
});
