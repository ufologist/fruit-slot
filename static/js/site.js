$(function(){
  $('.highlight').on('click', '.code-toggle', function() {
    var pre = $(this).parents('.highlight')
    if (pre.hasClass('collapse')) {
      pre.removeClass('collapse')
      $(this).text('收起')
    } else {
      pre.addClass('collapse')
      $(this).text('展开')
    }
    return false
  });

  $('h4 em, h3 em, h3 code, h4 code').parent().addClass('doc-api');
  // 给 iframe 加链接
  $('.nico-iframe').each(function(i, item) {
    var src = $(item).find('iframe').attr('src')
    var html = '<a class="new-window" target="_blank" href="' + src + '">新窗口打开</a>'
    $(item).append(html)
  });
  // 给 code 加收起和展开
  $('.highlight').each(function(i, item) {
    var $item = $(item)
    if ($item.height() > 400) {
      $item.append('<a class="code-toggle" href="#">展开</a>')
      $item.addClass('collapse')
    }
  });
});
