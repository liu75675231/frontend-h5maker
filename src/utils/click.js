import $ from 'jquery';
export function initClick () {
  $(document).on("click", ".clickable", (e) => {
    const $origin = $(e.target);
    const clickConf = JSON.parse($origin.attr('event'))['clickable'];
    if (clickConf.validate && clickConf.validate.length > 0) {
      const errMsg = validate(clickConf.validate);
      if (errMsg) {
        alert(errMsg);
        return false;
      }
    }

    runConfData(clickConf.actionList);

  });
}

function runConfData (actionList) {
  actionList.forEach((item) => {
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

    if (item.target.tag === 'input' && ['radio'].indexOf($target.attr('type')) > -1) {
      $("input[name=" + $target.attr("name") + "]").attr('checked', null);

      $target.attr('checked', 'checked');
      console.log($("input[name=" + $target.attr("name") + "]:checked").val());
    }

    if (item.target.customEvent) {
      const customEventList = JSON.parse($target.attr('event'))['customEvent'];
      customEventList.some((customEventItem) => {
        if (customEventItem.name === item.target.customEvent) {
          runConfData(customEventItem.actionList);
          return true;
        }
        return false;
      });
    }
  });
}

function validate (confList) {
  let errMsg = '';
  confList.forEach((conf) => {
    const $target = $("[nickname=" + conf.target + "]");

    console.log('sdsdf');
    conf.rules.forEach((rule) => {
      const val = $target.val(),
        type = $target[0].getAttribute("type");
      if (['checkbox', 'radio'].indexOf(type) > -1) {
        if ($("input[name=" + $target.attr('name') + "]:checked").length === 0) {
          errMsg = '请至少选择一个' + $target.attr('nickname');
        }
      } else {
        if (rule === 'required' && (val === '' || $target.val() == null)) {
          errMsg = '请填写' + conf.target;
        }
      }

    });
  });

  return errMsg;
}
