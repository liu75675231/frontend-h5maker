import VueI18n from 'vue-i18n'
import Vue from "vue";
Vue.use(VueI18n)

export default new VueI18n({
  locale: 'zh',
  messages: {
    zh: {
      preferences: '首选项',
      add: '新增',
      moreResolution: '更多分辨率',
      display: '显示方式',
      setting: '设置',
      structureTree: '结构树',
      node: '节点',
      style: '样式',
      animation: '动画',
      event: '事件',
      save: '保存',
      help: '帮助',
      titlePlaceholder: '请输入h5页面的标题',
      lengthUnit: '长度单位',
      custom: '自定义',
      recent: '最近',
      words: '文字',
      image: '图片',
      button: '按钮',
      icon: '图标',
      panel: '面板',
      layout: '布局',
      list: '列表',
      table: '表格',
      music: '音乐',
      width: '宽度',
      height: '高度',
      color: '颜色',
      fontSize: '字体大小',
      uploadImage: '上传图片',
      lineHeight: '行高',
      background: '背景',
      backgroundColor: '背景颜色',
      shadow: '阴影',
      solid: '实线',
      dashed: '虚线',
      none: '无',
      left: '左',
      center: '中',
      right: '右',
      top: '上',
      bottom: '下',
      double: '双线',
      align: '对齐方式',
      borderRadius: '圆角',
      position: '定位',
      default: '默认',
      absolute: '绝对定位',
      relative: '相对定位',
      letterSpacing: '文字间距',
      fontWeight: '是否加粗',
      margin: '外边距',
      padding: '内边距',
      border: '边框',
      placeSelect: '请选择',
      hidden: '隐藏',
      block: '块级显示',
      inlineBlock: '内联-块级显示',
      inline: '内联显示',
      wrap: '换行',
      nowrap: '不换行',
      isWrap: '是否换行',
      drag: '拖拽',
      on: '开启',
      status: '状态',
      horizontal: '水平',
      vertical: '垂直',
      blur: '模糊',
      gradients: '渐进',
      targetArea: '目标区域',
      size: '尺寸',
      edge: '边距',
      grow: '扩展',
      shrink: '收缩',
      basis: '基准值',
      copy: '复制',
      paste: '粘贴',
      columnNums: '{num}列',
      iamtitle: '我是标题',
      iamcontent: '我是内容',
      insertPosition: '插入位置',
      childElement: '子元素',
      beforeElement: '元素前面',
      afterElement: '元素后面',
      blankPanel: '空白面板',
      listDefaultMsg: '列表前面有一个圆圈',
      notice: '提示',
      removeNodeNotice: '确认要删除此节点吗？',
      ok: '确定',
      cancel: '取消',
      remove: '删除',
      howToUse: '如何使用',
      useNotice1: '1. 先点击"点击：root", 设置节点面板会出来根节点的一些设置，此时你可以设置根节点的内容，或者点击上面的新增，来在其根节点下面新增类型的节点',
      useNotice2: '2. 除了根节点，其他节点都是可以被删除的，点击新增附近的删除按钮，可以删除此节点',
      useNotice3: '3. 可以点击屏幕显示面板旁边的首选项，来设置您的页面的一些通用样式和字体大小，依次来加速您的页面构建过程',
      useNotice4: '4. 除了根节点外，其他节点都是可以复制的，可以尝试下复制节点来吧当前节点的内容替换到其他节点中',
      useNotice5: '5. 如果您在使用过程中遇到任何问题，请发邮件liu75675231@126.com, 谢谢您的反馈',
      tapTarget: '点击目标',
      type: '类型',
      delay: '延迟',
    },
    en: {
      preferences: 'Preferences',
      add: 'Add',
      moreResolution: 'More Resolution',
      display: 'Display',
      setting: 'Setting',
      structureTree: 'Structure Tree',
      node: 'Node',
      style: 'Style',
      animation: 'Animation',
      event: 'Event',
      save: 'Save',
      help: 'Help',
      titlePlaceholder: 'Please input the title of your mobile page',
      lengthUnit: 'Length unit',
      custom: 'Custom',
      recent: 'Recent',
      words: 'Words',
      image: 'Image',
      button: 'Button',
      icon: 'Icon',
      panel: 'Panel',
      layout: 'Layout',
      list: 'List',
      table: 'Table',
      music: 'Music',
      width: 'Width',
      height: 'Height',
      color: 'Color',
      fontSize: 'Font Size',
      uploadImage: 'Upload Image',
      lineHeight: 'Line Height',
      background: 'Background',
      backgroundColor: 'Background Color',
      shadow: 'Shadow',
      solid: 'Solid',
      dashed: 'Dashed',
      none: 'None',
      top: 'Top',
      left: 'Left',
      center: 'Center',
      right: 'Right',
      bottom: 'Bottom',
      double: 'Double',
      align: 'Align',
      borderRadius: 'Border Radius',
      position: 'Position',
      default: 'Default',
      absolute: 'Absolute',
      relative: 'Relative',
      letterSpacing: 'Letter Spacing',
      fontWeight: 'Font Weight',
      margin: 'Margin',
      padding: 'Padding',
      border: 'Border',
      placeSelect: 'Please select',
      hidden: 'Hidden',
      block: 'Block',
      inlineBlock: 'inline-block',
      inline: 'inline',
      wrap: 'Wrap',
      nowrap: 'No wrap',
      isWrap: 'Is Wrap',
      drag: 'Drag',
      on: 'On',
      status: 'Status',
      horizontal: 'Horizontal',
      vertical: 'Vertical',
      blur: 'Blur',
      gradients: 'Gradients',
      targetArea: 'Target Area',
      size: 'Size',
      edge: 'Edge',
      grow: 'Grow',
      shrink: 'Shrink',
      basis: 'Basis',
      copy: 'Copy',
      paste: 'Paste',
      columnNums: '{num} columns',
      iamtitle: 'I am title',
      iamcontent: 'I am content',
      insertPosition: 'Insert Position',
      childElement: 'Child Element',
      beforeElement: 'Before Element',
      afterElement: 'After Element',
      blankPanel: 'Blank Panel',
      listDefaultMsg: 'There is a circle before the list',
      notice: 'Notice',
      removeNodeNotice: 'Are you sure to remove the node?',
      ok: 'Ok',
      cancel: 'Cancel',
      remove: 'Remove',
      howToUse: 'How to use',
      useNotice1: '1. First, click the word "Node: root" at the structure tree node and its corresponding setting item shows at the setting panel.  you can set the content and attributes of the node inside the panel, or you click the add button to add a new panel inside or the siblings of the node. ',
      useNotice2: '2. except for the root node, other nodes can be removed. just click the remove button near the add button to remove.',
      useNotice3: '3. on the display panel, you can see the preference panel, you can click to open the dialog which you can change the default page settings, such as font unit, background color, font color, font size etc.',
      useNotice4: '4. except for the root node, other node can be copied, just try a node to another one.',
      useNotice5: '5. If you have any trouble using my online tool, please send liu75675231@126.com to me, thanks to your feedback.',
      tapTarget: 'Tap Target',
      type: 'Type',
      delay: 'Delay',
    },
  },
})