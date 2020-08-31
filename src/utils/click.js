import $ from 'jquery';
export function initClick () {
  $(".clickable").bind("click", function () {
    console.log('abcd');
  });
  console.log($(document).find(".clickable"));
  $(document).on("click", ".clickable", (e) => {
    const $origin = $(e.target);
    const clickConf = JSON.parse($origin.attr('event'))['clickable'];
    clickConf.actionList.forEach((item) => {
      if (!item.target.nickName) {
        return;
      }
      const $target = $("[nickname="+ item.target.nickName +"]");
      $target.css({
        display: item.target.display,
      });

      if (['video', 'audio'].indexOf(item.target.tag) > -1) {
        if (item.target.play) {
          $target.get(0).play();
        } else {
          $target.get(0).pause();
        }
      }
    });

  });
}
