let page = 1;

$('#left_arr').click(function () {
  if (page > 1) {
    $(`#user${page}`).css('display', 'none')
    page--;
    $(`#user${page}`).css('display', 'block')
  }
})
$('#right_arr').click(function () {
  if (page < 3) {
    $(`#user${page}`).css('display', 'none')
    page++;
    $(`#user${page}`).css('display', 'block')
  }
})
$(`#user${page}`).css('display', 'block')
