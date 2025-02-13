import interact from 'interactjs'
import $ from 'jquery'

function initDragMove () {
  interact('.draggable')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      // enable autoScroll
      autoScroll: true,

      listeners: {
        // call this function on every dragmove event
        move: dragMoveListener,

        // call this function on every dragend event
        end (event) {
          var textEl = event.target.querySelector('p')

          textEl && (textEl.textContent =
            'moved a distance of ' +
            (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2) | 0))
              .toFixed(2) + 'px')
        }
      }
    })
  function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
}

function initDropZone () {
  let curAreaObj = undefined;
  let curAreaStyle = {
    originBackgroundColor: '',
  };
  interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.draggable',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
      // add active dropzone feedback
//      event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget
      var dropzoneElement = event.target
      curAreaObj = dropzoneElement;
      const $curAreaObj = $(curAreaObj);
      const targetAreaEvent = JSON.parse($curAreaObj.attr('event')).targetArea;
      if (targetAreaEvent.backgroundColor) {
        curAreaStyle.originBackgroundColor = $curAreaObj.css('background-color');
        $(curAreaObj).css('background-color', targetAreaEvent.backgroundColor);
      }

      console.log('enter');
      console.log(event);
      enterDropZone();
      // feedback the possibility of a drop
//      dropzoneElement.classList.add('drop-target')
//      draggableElement.classList.add('can-drop')
//      draggableElement.textContent = 'Dragged in'
    },
    ondragleave: function (event) {
      // remove the drop feedback style
//      event.target.classList.remove('drop-target')
//      event.relatedTarget.classList.remove('can-drop')
//      event.relatedTarget.textContent = 'Dragged out'
      console.log('leave');
      const $curAreaObj = $(curAreaObj);
      const targetAreaEvent = JSON.parse($curAreaObj.attr('event')).targetArea;
      if (targetAreaEvent.backgroundColor) {
//        curAreaStyle.originBackgroundColor = $curAreaObj.css('background-color');
        $(curAreaObj).css('background-color', curAreaStyle.originBackgroundColor);
      }
    },
    ondrop: function (event) {

//      event.relatedTarget.textContent = 'Dropped'
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active')
      event.target.classList.remove('drop-target')
    }
  })
}

function initTapTarget () {
  interact('.taptarget')
    .on('tap', function (event) {
      var $target = $(event.target);
      const tapTargetEvent = JSON.parse($target.attr('event')).tapTarget;
      console.log(tapTargetEvent);
      if (tapTargetEvent.backgroundColor) {
        $target.css(tapTargetEvent);
      }

      event.preventDefault()
    })
    .on('doubletap', function (event) {
//      console.log('abcd');
//      event.currentTarget.classList.toggle('large')
//      event.currentTarget.classList.remove('rotate')
      event.preventDefault()
    })
    .on('hold', function (event) {
//      console.log('sdf');
//      event.currentTarget.classList.toggle('rotate')
//      event.currentTarget.classList.remove('large')
      event.preventDefault()
    })
}

export function initDragger () {
  initDragMove();
  initDropZone();
  initTapTarget();
}

export function enterDropZone () {

}
