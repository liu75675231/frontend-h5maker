import $ from 'jquery';
export function initEvent () {
  // video play end event handler
  $(".playend").on("ended", (e) => {
    const $origin = $(e.target);
    const clickConf = JSON.parse($origin.attr('event'))['playend'];
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
