(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=g||self,g.CascadeGallery=f());}(this,function(){'use strict';var script = {
    name: "cascade-gallery-spinner"
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm._m(0)
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "spinner" }, [
      _c("div", { staticClass: "spinner-1" }),
      _vm._v(" "),
      _c("div", { staticClass: "spinner-2" }),
      _vm._v(" "),
      _c("div", { staticClass: "spinner-3" }),
      _vm._v(" "),
      _c("div", { staticClass: "spinner-4" }),
      _vm._v(" "),
      _c("div", { staticClass: "spinner-5" })
    ])
  }
];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-cd6a1d3c_0", { source: "\n.spinner-1, .spinner-2, .spinner-3, .spinner-4, .spinner-5 {\n    width: 3px;\n    height: 7px;\n    position: absolute;\n    bottom: 0px;\n    background: #cccccc;\n}\n.spinner-1{\n    left: 5px;\n    animation: jump 1s .1s ease-out infinite;\n}\n.spinner-2{\n    left: 10px;\n    animation: jump 1s .2s ease-out infinite;\n}\n.spinner-3{\n    left: 15px;\n    animation: jump 1s .3s ease-out infinite;\n}\n.spinner-4{\n    left: 20px;\n    animation: jump 1s .4s ease-out infinite;\n}\n.spinner-5{\n    left: 25px;\n    animation: jump 1s .5s ease-out infinite;\n}\n@keyframes jump {\n0% {\n        bottom: 0px;\n}\n50% {\n        bottom: 10px;\n}\n100% {\n        bottom: 0px;\n}\n}\n", map: {"version":3,"sources":["/home/vagrant/code/vue-pakajes/src/js/components/spinner/Spinner.vue"],"names":[],"mappings":";AAiBA;IACA,UAAA;IACA,WAAA;IACA,kBAAA;IACA,WAAA;IACA,mBAAA;AACA;AACA;IACA,SAAA;IACA,wCAAA;AACA;AACA;IACA,UAAA;IACA,wCAAA;AACA;AACA;IACA,UAAA;IACA,wCAAA;AACA;AACA;IACA,UAAA;IACA,wCAAA;AACA;AACA;IACA,UAAA;IACA,wCAAA;AACA;AACA;AACA;QACA,WAAA;AACA;AACA;QACA,YAAA;AACA;AACA;QACA,WAAA;AACA;AACA","file":"Spinner.vue","sourcesContent":["<script>\r\n    export default {\r\n        name: \"cascade-gallery-spinner\"\r\n    }\r\n</script>\r\n\r\n<template>\r\n    <div class=\"spinner\">\r\n        <div class=\"spinner-1\"></div>\r\n        <div class=\"spinner-2\"></div>\r\n        <div class=\"spinner-3\"></div>\r\n        <div class=\"spinner-4\"></div>\r\n        <div class=\"spinner-5\"></div>\r\n    </div>\r\n</template>\r\n\r\n<style>\r\n    .spinner-1, .spinner-2, .spinner-3, .spinner-4, .spinner-5 {\r\n        width: 3px;\r\n        height: 7px;\r\n        position: absolute;\r\n        bottom: 0px;\r\n        background: #cccccc;\r\n    }\r\n    .spinner-1{\r\n        left: 5px;\r\n        animation: jump 1s .1s ease-out infinite;\r\n    }\r\n    .spinner-2{\r\n        left: 10px;\r\n        animation: jump 1s .2s ease-out infinite;\r\n    }\r\n    .spinner-3{\r\n        left: 15px;\r\n        animation: jump 1s .3s ease-out infinite;\r\n    }\r\n    .spinner-4{\r\n        left: 20px;\r\n        animation: jump 1s .4s ease-out infinite;\r\n    }\r\n    .spinner-5{\r\n        left: 25px;\r\n        animation: jump 1s .5s ease-out infinite;\r\n    }\r\n    @keyframes jump {\r\n        0% {\r\n            bottom: 0px;\r\n        }\r\n        50% {\r\n            bottom: 10px;\r\n        }\r\n        100% {\r\n            bottom: 0px;\r\n        }\r\n    }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var CascadeGalleryLoader = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );var c = {

    // COMPONENTS
    LAYOUT_COMPONENT_NAME: "cgl-layout",
    GALLERY_COMPONENT_NAME: "cgl-gallery",
    MODAL_COMPONENT_NAME: "cgl-modal",
    IMAGE_COMPONENT_NAME: "cgl-image",
    SPINNER_COMPONENT_NAME: "cgl-spinner",

    // EVENTS
    LOADED_EVENT_NAME: "cgl-image-loaded",

    // CSS
    ANIMATION_CSS_CLASS_HIDE: "cgl-image-anim-hide",
    ANIMATION_CSS_CLASS_APPEND: "cgl-image-anim-append",

    // CONFIG KEYS
    CONFIG_WIDTH_RANGE_KEY: 'width-range',
    CONFIG_HEIGHT_RANGE_KEY: 'height-range',

    CONFIG_RANGE_KEY_FROM: 'min',
    CONFIG_RANGE_KEY_TO: 'max',

    // CONFIG VALUES
    CONFIG_WIDTH_FROM: 200,
    CONFIG_WIDTH_TO: 300,

    // OTHER
    CONFIG_DELAY_KEY: 'appending-delay',
    CONFIG_APPENDING_DELAY: 75,
    CONFIG_GAP_KEY: 'gap',
    CONFIG_GAP: 0,
    DEFAULT_INDEX_KEY: 'default-index'

};const PATH = 'M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441' +
             ' L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082' +
             ' c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647' +
             ' c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z';

let ArrowClass = function () {
    this.svg = {
        path: PATH,
        width: 43,
        height: 50,
        viewBox: '0 0 284.929 284.929'
    };
};

var arrow = new ArrowClass();var script$1 = {
    name: c.GALLERY_COMPONENT_NAME,
    props: {
        images: { type: Object },
        config: { type: Object },
        index: { type: Number },
        defaultIndex: { type: Number }
    },
    data() {
        return {
            imageBlock: {},
            currentImageIndex: this.defaultIndex,
            currentImageElement: null,
            animation: {
                inProgress: false
            },
            navigationClicked: false,
            diff: 0,
            window: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            styles: {
                left: 0
            },
            classes: {
                transitionClass: 'cascade-gallery-modal-image-transition'
            },
            arrow: arrow
        };
    },
    mounted() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
    },
    methods: {
        /**
         * 'closeModal' event is listened in the mounted method of the
         * image component and it is closing the modal
         */
        closeModal() {
            this.$parent.$emit('closeModal');
        },

        /**
         * On image load prepare dragging and touch moving
         * @param event
         */
        prepareDragging(event) {
            this.addEventListeners(event.target, ["mousedown", "touchstart"], this.startDragging);
            this.addEventListeners(event.target, ["mouseup", "touchend", "mouseout"], this.stopDragging);
        },

        /**
         * Handle all events after dragging action finished [mouseup, touchend, mouseout]
         * @param event
         */
        stopDragging(event) {
            this.setClasses(event.target, this.classes.transitionClass);
            event.target.removeEventListener("mousemove", this.dragElement);
            event.target.removeEventListener("touchmove", this.dragElement);

            if (this.navigationClicked) return;

            if (this.isShiftedLeft(event) && !this.isTheLastImage(this.currentImageIndex)) {
                if (!this.animation.inProgress && event.type === "mouseout") {
                    this.showNextImage();
                } else {
                    this.animation.inProgress = false;
                }
                if ( event.type === "mouseup" || event.type === "touchend" ) {
                    this.animation.inProgress = true;
                    this.showNextImage();
                }
            } else if (this.isShiftedRight(event) && !this.isTheFirstImage(this.currentImageIndex)) {
                if (!this.animation.inProgress && event.type === "mouseout") {
                    this.showPreviousImage();
                } else {
                    this.animation.inProgress = false;
                }
                if ( event.type === "mouseup" || event.type === "touchend" ) {
                    this.animation.inProgress = true;
                    this.showPreviousImage();
                }
            } else {
                this.alignImage(event);
                this.animation.inProgress = true;
            }
        },

        /**
         * Check if image was dragged out of the given pixels to the left
         * @param event
         * @returns Boolean
         */
        isShiftedLeft(event) {
            return this.getAlignX(event) - 58 > event.target.offsetLeft;
        },

        /**
         * Check if image was dragged out of the given pixels to the right
         * @param event
         * @returns Boolean
         */
        isShiftedRight(event) {
            return this.getAlignX(event) + 58 < event.target.offsetLeft;
        },

        /**
         * On start dragging image prepare default position and
         * on end dragging events listeners
         * @param event
         */
        startDragging(event) {
            let imageLeft = event.target.offsetLeft;
            let mouseLeft = null;
            if (event.type === "touchstart") {
                mouseLeft = event.touches[0].pageX;
            } else {
                mouseLeft = event.pageX;
            }
            this.diff = mouseLeft - imageLeft;
            this.setClasses(event.target, '');
            this.addEventListeners(event.target, ["mousemove", "touchmove"], this.dragElement);
        },


        /**
         * Set the position on dragging image and prevent history
         * auto navigation on dragging to the right
         * @param event
         */
        dragElement(event) {
            event.preventDefault();
            let imageLeft = event.pageX - this.diff;
            if (event.type === "touchmove") {
                imageLeft = event.touches[0].pageX - this.diff;
            }
            this.setImagePositionX(imageLeft);
        },

        /**
         * Display (animate) next image if the previous animation finished
         */
        showNextImage() {
            if (this.waitAnimation()) return;
            if (!this.isTheLastImage(this.currentImageIndex)) {
                let self = this;
                this.setImagePositionX(-this.currentImageElement.offsetWidth);
                let index = self.currentImageIndex + 1;
                let lastIndex = self.images.src.length - 1;
                let nextIndex = index > lastIndex ? lastIndex : index;
                setTimeout(function () {
                    self.displayImage(nextIndex, self.currentImageElement.parentNode.offsetWidth);
                }, 340);
            }
        },

        /**
         * Display (animate) previous image if the previous animation finished
         */
        showPreviousImage() {
            if (this.waitAnimation()) return;
            if (!this.isTheFirstImage(this.currentImageIndex)) {
                let self = this;
                this.setImagePositionX(this.currentImageElement.parentNode.offsetWidth);
                let index = self.currentImageIndex - 1;
                let previousIndex = index < 0 ? 0 : index;
                setTimeout(function () {
                    self.displayImage(previousIndex, -self.currentImageElement.offsetWidth);
                }, 340);
            }
        },

        /**
         * Display given image with given position
         */
        displayImage(imageIndex, position) {
            this.currentImageIndex = imageIndex;
            this.setClasses(this.currentImageElement, this.classes.transitionClass);
            this.setImagePositionX(position);
        },

        /**
         * Define waiting animation delay
         * @returns {boolean}
         */
        waitAnimation() {
            let self = this;
            if (this.navigationClicked) return true;
            this.navigationClicked = true;
            setTimeout(function(){self.navigationClicked = false;}, 340);
            return false;
        },

        /**
         * Adds multiple event listeners at once
         * @param target
         * @param events
         * @param listener
         */
        addEventListeners(target, events = [], listener) {
            for (let index in events) {
                let event = events[index];
                target.addEventListener(events[index], listener, false);
            }
        },

        /**
         * Set css for the left position
         * @param position
         */
        setImagePositionX(position) {
            this.styles.left = position.toString()+'px';
        },

        /**
         * Set the default css for the image position
         * @param event
         */
        alignImage(event) {
            this.styles.left = this.getAlignX(event)+'px';
            this.styles.top = this.getAlignY(event)+'px';
        },

        /**
         * Define default image left position
         * @param event
         * @returns Number
         */
        getAlignX(event) {
            return event.target.parentNode.offsetWidth/2 - event.target.offsetWidth/2;
        },

        /**
         * Define default image top position
         * @param event
         * @returns {number}
         */
        getAlignY(event) {
            return event.target.parentNode.offsetHeight/2 - event.target.offsetHeight/2;
        },

        /**
         * Set element classes to the images
         * @param element
         * @param classes
         */
        setClasses(element, classes = '') {
            element.className = classes;
        },

        prepareImage(event) {
            this.currentImageElement = event.target;
            this.alignImage(event);
            this.prepareDragging(event);
            // Stop history navigation on touch and move
            event.target.parentNode.addEventListener('touchmove', function(e){
                e.preventDefault();
            });
            this.waitAnimation();
        },

        /**
         * Check if current image is the last in the list
         * @param index
         * @returns Boolean
         */
        isTheLastImage(index) {
            return index === this.images.src.length - 1;
        },

        /**
         * Check if current image is the first in the list
         * @param index
         * @returns Boolean
         */
        isTheFirstImage(index) {
            return index === 0;
        }
    },
    beforeDestroy() {
        this.addEventListeners(event.target, ["mousemove", "touchmove"], this.dragElement);
    }
};/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "cascade-gallery-modal" }, [
    _c(
      "div",
      { staticClass: "cascade-gallery-modal-image-wrapper" },
      [
        _vm._l(_vm.images.src, function(url, index) {
          return _vm.currentImageIndex === index
            ? _c("div", { staticClass: "cascade-gallery-modal-image" }, [
                _c("img", {
                  class: _vm.classes.transitionClass,
                  style: _vm.styles,
                  attrs: { src: url, draggable: "false" },
                  on: { load: _vm.prepareImage }
                })
              ])
            : _vm._e()
        }),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "cgl-arrow-wrapper cgl-arrow-left",
            on: { click: _vm.showPreviousImage }
          },
          [
            _c(
              "svg",
              {
                staticClass: "cgl-arrow",
                attrs: {
                  width: _vm.arrow.svg.width + "px",
                  height: _vm.arrow.svg.height + "px",
                  viewBox: _vm.arrow.svg.viewBox
                }
              },
              [_c("path", { attrs: { d: _vm.arrow.svg.path } })]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "cgl-arrow-wrapper cgl-arrow-right",
            on: { click: _vm.showNextImage }
          },
          [
            _c(
              "svg",
              {
                staticClass: "cgl-arrow",
                attrs: {
                  width: _vm.arrow.svg.width + "px",
                  height: _vm.arrow.svg.height + "px",
                  viewBox: _vm.arrow.svg.viewBox
                }
              },
              [_c("path", { attrs: { d: _vm.arrow.svg.path } })]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "cgl-modal-close",
            on: {
              click: function($event) {
                return _vm.closeModal()
              }
            }
          },
          [_vm._v("X")]
        )
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-60d8f684_0", { source: "\n.cascade-gallery-modal{\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0,0,0,.87);\n    z-index: 5000;\n}\n.cascade-gallery-modal-image {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    left: 0;\n    text-align: center;\n}\n.cascade-gallery-modal-image img {\n    touch-action: none;\n    max-height: 100%;\n    max-width: 70%;\n    position: absolute;\n    -webkit-box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);\n    -moz-box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);\n    box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);\n}\n@media only screen and (max-width: 900px) {\n.cascade-gallery-modal-image img {\n        max-width: 100%;\n}\n}\n.cascade-gallery-modal-image-transition {\n    -webkit-transition: left .34s ease-out;\n    -moz-transition: left .34s ease-out;\n    -o-transition: left .34s ease-out;\n    transition: left .34s ease-out;\n}\n.cgl-arrow {\n    position: absolute;\n    top: 50%;\n    fill: #ffffff;\n    opacity: .1;\n    -webkit-transition: all .34s ease-out;\n    -moz-transition: all .34s ease-out;\n    -o-transition: all .34s ease-out;\n    transition: all .34s ease-out;\n}\n.cgl-arrow-wrapper {\n    position: absolute;\n    width: 150px;\n    height: 100%;\n    top: 0;\n    z-index: 5;\n    background: rgba(0,0,0,0);\n    -webkit-transition: background .34s ease-out;\n    -moz-transition: background .34s ease-out;\n    -o-transition: background .34s ease-out;\n    transition: background .34s ease-out;\n}\n.cgl-arrow-wrapper:hover {\n    background: rgba(0,0,0,.4);\n    cursor: pointer;\n}\n.cgl-arrow-wrapper:hover .cgl-arrow {\n    opacity: .5;\n}\n.cgl-arrow-wrapper.cgl-arrow-left {\n    left: 0;\n}\n.cgl-arrow-wrapper.cgl-arrow-left .cgl-arrow {\n    transform: rotate(90deg);\n    left: 40px;\n}\n.cgl-arrow-wrapper.cgl-arrow-right {\n    right: 0;\n}\n.cgl-arrow-wrapper.cgl-arrow-right .cgl-arrow {\n    transform: rotate(-90deg);\n    right: 40px;\n}\n.cgl-modal-close {\n    position: absolute;\n    z-index: 15;\n    top: 15px;\n    right: 15px;\n    font-size: 20px;\n    padding: 5px 0 0 0;\n    color: white;\n    opacity: .2;\n    border: 4px solid white;\n    border-radius: 20px 20px 20px 20px;\n    -moz-border-radius: 20px 20px 20px 20px;\n    -webkit-border-radius: 20px 20px 20px 20px;\n    width: 40px;\n    height: 40px;\n    text-align: center;\n}\n.cgl-modal-close:hover {\n    opacity: .5;\n    cursor: pointer;\n}\n", map: {"version":3,"sources":["/home/vagrant/code/vue-pakajes/src/js/components/templates/Modal.vue"],"names":[],"mappings":";AAqUA;IACA,eAAA;IACA,OAAA;IACA,MAAA;IACA,WAAA;IACA,YAAA;IACA,2BAAA;IACA,aAAA;AACA;AACA;IACA,WAAA;IACA,YAAA;IACA,eAAA;IACA,OAAA;IACA,kBAAA;AACA;AACA;IACA,kBAAA;IACA,gBAAA;IACA,cAAA;IACA,kBAAA;IACA,qDAAA;IACA,kDAAA;IACA,6CAAA;AACA;AAEA;AACA;QACA,eAAA;AACA;AACA;AAEA;IACA,sCAAA;IACA,mCAAA;IACA,iCAAA;IACA,8BAAA;AACA;AAEA;IACA,kBAAA;IACA,QAAA;IACA,aAAA;IACA,WAAA;IACA,qCAAA;IACA,kCAAA;IACA,gCAAA;IACA,6BAAA;AACA;AAEA;IACA,kBAAA;IACA,YAAA;IACA,YAAA;IACA,MAAA;IACA,UAAA;IACA,yBAAA;IACA,4CAAA;IACA,yCAAA;IACA,uCAAA;IACA,oCAAA;AACA;AAEA;IACA,0BAAA;IACA,eAAA;AACA;AAEA;IACA,WAAA;AACA;AAEA;IACA,OAAA;AACA;AAEA;IACA,wBAAA;IACA,UAAA;AACA;AAEA;IACA,QAAA;AACA;AAEA;IACA,yBAAA;IACA,WAAA;AACA;AAEA;IACA,kBAAA;IACA,WAAA;IACA,SAAA;IACA,WAAA;IACA,eAAA;IACA,kBAAA;IACA,YAAA;IACA,WAAA;IACA,uBAAA;IACA,kCAAA;IACA,uCAAA;IACA,0CAAA;IACA,WAAA;IACA,YAAA;IACA,kBAAA;AACA;AAEA;IACA,WAAA;IACA,eAAA;AACA","file":"Modal.vue","sourcesContent":["<script>\r\n    import c from '../../constants';\r\n    import arrow from '../../resources/arrow';\r\n\r\n    export default {\r\n        name: c.GALLERY_COMPONENT_NAME,\r\n        props: {\r\n            images: { type: Object },\r\n            config: { type: Object },\r\n            index: { type: Number },\r\n            defaultIndex: { type: Number }\r\n        },\r\n        data() {\r\n            return {\r\n                imageBlock: {},\r\n                currentImageIndex: this.defaultIndex,\r\n                currentImageElement: null,\r\n                animation: {\r\n                    inProgress: false\r\n                },\r\n                navigationClicked: false,\r\n                diff: 0,\r\n                window: {\r\n                    width: window.innerWidth,\r\n                    height: window.innerHeight\r\n                },\r\n                styles: {\r\n                    left: 0\r\n                },\r\n                classes: {\r\n                    transitionClass: 'cascade-gallery-modal-image-transition'\r\n                },\r\n                arrow: arrow\r\n            };\r\n        },\r\n        mounted() {\r\n            this.window.width = window.innerWidth;\r\n            this.window.height = window.innerHeight;\r\n        },\r\n        methods: {\r\n            /**\r\n             * 'closeModal' event is listened in the mounted method of the\r\n             * image component and it is closing the modal\r\n             */\r\n            closeModal() {\r\n                this.$parent.$emit('closeModal');\r\n            },\r\n\r\n            /**\r\n             * On image load prepare dragging and touch moving\r\n             * @param event\r\n             */\r\n            prepareDragging(event) {\r\n                this.addEventListeners(event.target, [\"mousedown\", \"touchstart\"], this.startDragging);\r\n                this.addEventListeners(event.target, [\"mouseup\", \"touchend\", \"mouseout\"], this.stopDragging);\r\n            },\r\n\r\n            /**\r\n             * Handle all events after dragging action finished [mouseup, touchend, mouseout]\r\n             * @param event\r\n             */\r\n            stopDragging(event) {\r\n                this.setClasses(event.target, this.classes.transitionClass);\r\n                event.target.removeEventListener(\"mousemove\", this.dragElement);\r\n                event.target.removeEventListener(\"touchmove\", this.dragElement);\r\n\r\n                if (this.navigationClicked) return;\r\n\r\n                if (this.isShiftedLeft(event) && !this.isTheLastImage(this.currentImageIndex)) {\r\n                    if (!this.animation.inProgress && event.type === \"mouseout\") {\r\n                        this.showNextImage();\r\n                    } else {\r\n                        this.animation.inProgress = false;\r\n                    }\r\n                    if ( event.type === \"mouseup\" || event.type === \"touchend\" ) {\r\n                        this.animation.inProgress = true;\r\n                        this.showNextImage();\r\n                    }\r\n                } else if (this.isShiftedRight(event) && !this.isTheFirstImage(this.currentImageIndex)) {\r\n                    if (!this.animation.inProgress && event.type === \"mouseout\") {\r\n                        this.showPreviousImage();\r\n                    } else {\r\n                        this.animation.inProgress = false;\r\n                    }\r\n                    if ( event.type === \"mouseup\" || event.type === \"touchend\" ) {\r\n                        this.animation.inProgress = true;\r\n                        this.showPreviousImage();\r\n                    }\r\n                } else {\r\n                    this.alignImage(event);\r\n                    this.animation.inProgress = true;\r\n                }\r\n            },\r\n\r\n            /**\r\n             * Check if image was dragged out of the given pixels to the left\r\n             * @param event\r\n             * @returns Boolean\r\n             */\r\n            isShiftedLeft(event) {\r\n                return this.getAlignX(event) - 58 > event.target.offsetLeft;\r\n            },\r\n\r\n            /**\r\n             * Check if image was dragged out of the given pixels to the right\r\n             * @param event\r\n             * @returns Boolean\r\n             */\r\n            isShiftedRight(event) {\r\n                return this.getAlignX(event) + 58 < event.target.offsetLeft;\r\n            },\r\n\r\n            /**\r\n             * On start dragging image prepare default position and\r\n             * on end dragging events listeners\r\n             * @param event\r\n             */\r\n            startDragging(event) {\r\n                let imageLeft = event.target.offsetLeft;\r\n                let mouseLeft = null;\r\n                if (event.type === \"touchstart\") {\r\n                    mouseLeft = event.touches[0].pageX;\r\n                } else {\r\n                    mouseLeft = event.pageX;\r\n                }\r\n                this.diff = mouseLeft - imageLeft;\r\n                this.setClasses(event.target, '');\r\n                this.addEventListeners(event.target, [\"mousemove\", \"touchmove\"], this.dragElement);\r\n            },\r\n\r\n\r\n            /**\r\n             * Set the position on dragging image and prevent history\r\n             * auto navigation on dragging to the right\r\n             * @param event\r\n             */\r\n            dragElement(event) {\r\n                event.preventDefault();\r\n                let imageLeft = event.pageX - this.diff;\r\n                if (event.type === \"touchmove\") {\r\n                    imageLeft = event.touches[0].pageX - this.diff;\r\n                }\r\n                this.setImagePositionX(imageLeft);\r\n            },\r\n\r\n            /**\r\n             * Display (animate) next image if the previous animation finished\r\n             */\r\n            showNextImage() {\r\n                if (this.waitAnimation()) return;\r\n                if (!this.isTheLastImage(this.currentImageIndex)) {\r\n                    let self = this;\r\n                    this.setImagePositionX(-this.currentImageElement.offsetWidth);\r\n                    let index = self.currentImageIndex + 1;\r\n                    let lastIndex = self.images.src.length - 1;\r\n                    let nextIndex = index > lastIndex ? lastIndex : index;\r\n                    setTimeout(function () {\r\n                        self.displayImage(nextIndex, self.currentImageElement.parentNode.offsetWidth);\r\n                    }, 340);\r\n                }\r\n            },\r\n\r\n            /**\r\n             * Display (animate) previous image if the previous animation finished\r\n             */\r\n            showPreviousImage() {\r\n                if (this.waitAnimation()) return;\r\n                if (!this.isTheFirstImage(this.currentImageIndex)) {\r\n                    let self = this;\r\n                    this.setImagePositionX(this.currentImageElement.parentNode.offsetWidth);\r\n                    let index = self.currentImageIndex - 1;\r\n                    let previousIndex = index < 0 ? 0 : index;\r\n                    setTimeout(function () {\r\n                        self.displayImage(previousIndex, -self.currentImageElement.offsetWidth);\r\n                    }, 340);\r\n                }\r\n            },\r\n\r\n            /**\r\n             * Display given image with given position\r\n             */\r\n            displayImage(imageIndex, position) {\r\n                this.currentImageIndex = imageIndex;\r\n                this.setClasses(this.currentImageElement, this.classes.transitionClass);\r\n                this.setImagePositionX(position);\r\n            },\r\n\r\n            /**\r\n             * Define waiting animation delay\r\n             * @returns {boolean}\r\n             */\r\n            waitAnimation() {\r\n                let self = this;\r\n                if (this.navigationClicked) return true;\r\n                this.navigationClicked = true;\r\n                setTimeout(function(){self.navigationClicked = false}, 340);\r\n                return false;\r\n            },\r\n\r\n            /**\r\n             * Adds multiple event listeners at once\r\n             * @param target\r\n             * @param events\r\n             * @param listener\r\n             */\r\n            addEventListeners(target, events = [], listener) {\r\n                for (let index in events) {\r\n                    let event = events[index];\r\n                    target.addEventListener(events[index], listener, false);\r\n                }\r\n            },\r\n\r\n            /**\r\n             * Set css for the left position\r\n             * @param position\r\n             */\r\n            setImagePositionX(position) {\r\n                this.styles.left = position.toString()+'px';\r\n            },\r\n\r\n            /**\r\n             * Set the default css for the image position\r\n             * @param event\r\n             */\r\n            alignImage(event) {\r\n                this.styles.left = this.getAlignX(event)+'px';\r\n                this.styles.top = this.getAlignY(event)+'px';\r\n            },\r\n\r\n            /**\r\n             * Define default image left position\r\n             * @param event\r\n             * @returns Number\r\n             */\r\n            getAlignX(event) {\r\n                return event.target.parentNode.offsetWidth/2 - event.target.offsetWidth/2;\r\n            },\r\n\r\n            /**\r\n             * Define default image top position\r\n             * @param event\r\n             * @returns {number}\r\n             */\r\n            getAlignY(event) {\r\n                return event.target.parentNode.offsetHeight/2 - event.target.offsetHeight/2;\r\n            },\r\n\r\n            /**\r\n             * Set element classes to the images\r\n             * @param element\r\n             * @param classes\r\n             */\r\n            setClasses(element, classes = '') {\r\n                element.className = classes;\r\n            },\r\n\r\n            prepareImage(event) {\r\n                this.currentImageElement = event.target;\r\n                this.alignImage(event);\r\n                this.prepareDragging(event);\r\n                // Stop history navigation on touch and move\r\n                event.target.parentNode.addEventListener('touchmove', function(e){\r\n                    e.preventDefault();\r\n                });\r\n                this.waitAnimation();\r\n            },\r\n\r\n            /**\r\n             * Check if current image is the last in the list\r\n             * @param index\r\n             * @returns Boolean\r\n             */\r\n            isTheLastImage(index) {\r\n                return index === this.images.src.length - 1;\r\n            },\r\n\r\n            /**\r\n             * Check if current image is the first in the list\r\n             * @param index\r\n             * @returns Boolean\r\n             */\r\n            isTheFirstImage(index) {\r\n                return index === 0;\r\n            }\r\n        },\r\n        beforeDestroy() {\r\n            this.addEventListeners(event.target, [\"mousemove\", \"touchmove\"], this.dragElement);\r\n        }\r\n    }\r\n</script>\r\n\r\n<template>\r\n    <div class=\"cascade-gallery-modal\">\r\n        <div class=\"cascade-gallery-modal-image-wrapper\">\r\n            <div class=\"cascade-gallery-modal-image\"\r\n                 v-for=\"(url, index) in images.src\"\r\n                 v-if=\"currentImageIndex === index\">\r\n                <img :src=\"url\"\r\n                     :style=\"styles\"\r\n                     :class=\"classes.transitionClass\"\r\n                     draggable=\"false\"\r\n                     @load=\"prepareImage\"/>\r\n            </div>\r\n            <div class=\"cgl-arrow-wrapper cgl-arrow-left\" @click=\"showPreviousImage\">\r\n                <svg class=\"cgl-arrow\"\r\n                     :width=\"arrow.svg.width+'px'\"\r\n                     :height=\"arrow.svg.height+'px'\"\r\n                     :viewBox=\"arrow.svg.viewBox\">\r\n                    <path :d=\"arrow.svg.path\"/>\r\n                </svg>\r\n            </div>\r\n            <div class=\"cgl-arrow-wrapper cgl-arrow-right\" @click=\"showNextImage\">\r\n                <svg class=\"cgl-arrow\"\r\n                     :width=\"arrow.svg.width+'px'\"\r\n                     :height=\"arrow.svg.height+'px'\"\r\n                     :viewBox=\"arrow.svg.viewBox\">\r\n                    <path :d=\"arrow.svg.path\"/>\r\n                </svg>\r\n            </div>\r\n            <div class=\"cgl-modal-close\" @click=\"closeModal()\">X</div>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<style>\r\n    .cascade-gallery-modal{\r\n        position: fixed;\r\n        left: 0;\r\n        top: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        background: rgba(0,0,0,.87);\r\n        z-index: 5000;\r\n    }\r\n    .cascade-gallery-modal-image {\r\n        width: 100%;\r\n        height: 100%;\r\n        position: fixed;\r\n        left: 0;\r\n        text-align: center;\r\n    }\r\n    .cascade-gallery-modal-image img {\r\n        touch-action: none;\r\n        max-height: 100%;\r\n        max-width: 70%;\r\n        position: absolute;\r\n        -webkit-box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);\r\n        -moz-box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);\r\n        box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);\r\n    }\r\n\r\n    @media only screen and (max-width: 900px) {\r\n        .cascade-gallery-modal-image img {\r\n            max-width: 100%;\r\n        }\r\n    }\r\n\r\n    .cascade-gallery-modal-image-transition {\r\n        -webkit-transition: left .34s ease-out;\r\n        -moz-transition: left .34s ease-out;\r\n        -o-transition: left .34s ease-out;\r\n        transition: left .34s ease-out;\r\n    }\r\n\r\n    .cgl-arrow {\r\n        position: absolute;\r\n        top: 50%;\r\n        fill: #ffffff;\r\n        opacity: .1;\r\n        -webkit-transition: all .34s ease-out;\r\n        -moz-transition: all .34s ease-out;\r\n        -o-transition: all .34s ease-out;\r\n        transition: all .34s ease-out;\r\n    }\r\n\r\n    .cgl-arrow-wrapper {\r\n        position: absolute;\r\n        width: 150px;\r\n        height: 100%;\r\n        top: 0;\r\n        z-index: 5;\r\n        background: rgba(0,0,0,0);\r\n        -webkit-transition: background .34s ease-out;\r\n        -moz-transition: background .34s ease-out;\r\n        -o-transition: background .34s ease-out;\r\n        transition: background .34s ease-out;\r\n    }\r\n\r\n    .cgl-arrow-wrapper:hover {\r\n        background: rgba(0,0,0,.4);\r\n        cursor: pointer;\r\n    }\r\n\r\n    .cgl-arrow-wrapper:hover .cgl-arrow {\r\n        opacity: .5;\r\n    }\r\n\r\n    .cgl-arrow-wrapper.cgl-arrow-left {\r\n        left: 0;\r\n    }\r\n\r\n    .cgl-arrow-wrapper.cgl-arrow-left .cgl-arrow {\r\n        transform: rotate(90deg);\r\n        left: 40px;\r\n    }\r\n\r\n    .cgl-arrow-wrapper.cgl-arrow-right {\r\n        right: 0;\r\n    }\r\n\r\n    .cgl-arrow-wrapper.cgl-arrow-right .cgl-arrow {\r\n        transform: rotate(-90deg);\r\n        right: 40px;\r\n    }\r\n\r\n    .cgl-modal-close {\r\n        position: absolute;\r\n        z-index: 15;\r\n        top: 15px;\r\n        right: 15px;\r\n        font-size: 20px;\r\n        padding: 5px 0 0 0;\r\n        color: white;\r\n        opacity: .2;\r\n        border: 4px solid white;\r\n        border-radius: 20px 20px 20px 20px;\r\n        -moz-border-radius: 20px 20px 20px 20px;\r\n        -webkit-border-radius: 20px 20px 20px 20px;\r\n        width: 40px;\r\n        height: 40px;\r\n        text-align: center;\r\n    }\r\n\r\n    .cgl-modal-close:hover {\r\n        opacity: .5;\r\n        cursor: pointer;\r\n    }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  

  
  var CascadeGalleryModal = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    browser,
    undefined
  );var script$2 = {
    name: c.IMAGE_COMPONENT_NAME,
    components: (function(){
        let components = {};
        components[c.SPINNER_COMPONENT_NAME] = CascadeGalleryLoader;
        components[c.MODAL_COMPONENT_NAME] = CascadeGalleryModal;
        return components;
    })(),
    props: {
        imagesData: {type: Object},
        config: {type: Object},
        index: {type: Number}
    },
    data() {
        return {
            showModal: false,
            showSpinner: true,
            defaultIndex: this.imagesData[c.DEFAULT_INDEX_KEY] ? this.imagesData[c.DEFAULT_INDEX_KEY] : 0,
            image: {
                element: null,
                styles: {
                    width: 'auto',
                    height: 'auto',
                    top: 0,
                    left: 0
                },
                classes: [c.ANIMATION_CSS_CLASS_HIDE]
            }
        };
    },
    mounted() {
        let self = this;
        this.$on('closeModal', function () {
            self.setShowModal(false);
        });
    },
    methods: {

        /**
         * On image load prepare image config
         * @param event
         */
        loadConfig(event) {
            this.image.element = event.target;
            this.setImageStyles();
            this.waitPreviousImage();
        },

        /**
         * Wait until previous image is loaded and
         * just after that display the current one
         */
        waitPreviousImage() {
            let self = this;
            let waitForPrevious = setInterval(function () {
                if (self.previousImageLoaded()) {
                    self.showSpinner = false;
                    self.showImage();
                    clearInterval(waitForPrevious);
                }
            }, 10);
        },

        /**
         * Display the image after a given delay time.
         */
        showImage() {
            let self = this;
            self.animate();
            let waitForPrevious = setTimeout(function () {
                self.setLoaded();
            }, self.config[c.CONFIG_DELAY_KEY]);
        },

        /**
         * Loaded property is synced with Gallery that
         * can be read in the next image which is
         * waiting current one loading time
         */
        setLoaded() {
            this.config.images[this.index].loaded = true;
        },

        /**
         * Displays image in the best way, if the image is
         * taller then image block it will proportionally
         * set it by width otherwise will set it by height
         * also align it by center the same way.
         * @see this.getImagePropHeight()
         * @see this.getImagePropWidth()
         * @returns {boolean}
         */
        setImageStyles() {
            let gap = this.config.gap ? this.config.gap : 0;
            if ((this.getImagePropHeight() - gap) < this.getWrapperWidth()) {
                this.image.styles.width = '100%';
                this.image.styles.top = '-' + (this.getImagePropWidth() - this.getWrapperHeight()) / 2 + 'px';
                return true;
            } else {
                this.image.styles.height = '100%';
                this.image.styles.left = '-' + (this.getImagePropHeight() - (this.getWrapperWidth() + gap)) / 2 + 'px';
                return true;
            }
        },

        /**
         * Gets image height from element
         * @returns Number
         */
        getImageHeight() {
            return this.image.element.offsetHeight;
        },

        /**
         * Gets image width from element
         * @returns Number
         */
        getImageWidth() {
            return this.image.element.offsetWidth;
        },

        /**
         * Gets image block (parent) height from element
         * @returns Number
         */
        getWrapperHeight() {
            return this.config.images[this.index].height;
        },

        /**
         * Gets image block (parent) width from element
         * @returns Number
         */
        getWrapperWidth() {
            return this.config.images[this.index].width;
        },

        /**
         * Finds in advance the image height if it is
         * proportionally resize to the (parent) image
         * block height
         * @returns Number
         */
        getImagePropHeight() {
            let diffHeightInPercentage = (100 * this.getImageWidth()) / this.getImageHeight();
            return this.getWrapperHeight() * diffHeightInPercentage / 100;
        },

        /**
         * Finds in advance the image width if it was
         * proportionally resized to the (parent) image
         * block width
         * @returns Number
         */
        getImagePropWidth() {
            let diffWidthInPercentage = (100 * this.getImageHeight()) / this.getImageWidth();
            return this.getWrapperWidth() * diffWidthInPercentage / 100;
        },

        /**
         * Check if the image is the first in list
         * @returns Boolean
         */
        isFirstImage() {
            return parseInt(this.index) === 0;
        },

        /**
         * Check if previous image was loaded
         * @see this.waitPreviousImage()
         * @returns Boolean
         */
        previousImageLoaded() {
            if (this.isFirstImage()) {
                return true;
            }
            return this.config.images[this.index - 1].loaded;
        },

        /**
         * Add animation classes to the image
         * TODO: css animations
         * @returns Boolean
         */
        animate() {
            this.image.classes.push(c.ANIMATION_CSS_CLASS_APPEND);
        },

        /**
         * Display image modal
         * @param value
         */
        setShowModal(value) {
            this.showModal = value;
        }
    }
};/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "cgl-image" },
    [
      _c("div", { staticClass: "cgl-image-wrapper" }, [
        _c("div", { staticClass: "cgl-image-back" }, [
          _c("img", {
            class: _vm.image.classes,
            style: _vm.image.styles,
            attrs: { src: _vm.imagesData.src[_vm.defaultIndex] },
            on: {
              load: function($event) {
                return _vm.loadConfig($event)
              },
              click: function($event) {
                return _vm.setShowModal(true)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.showSpinner,
                expression: "showSpinner"
              }
            ],
            staticClass: "cgl-loader-box"
          },
          [_c("cgl-spinner")],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !_vm.showSpinner,
                expression: "!showSpinner"
              }
            ],
            staticClass: "cgl-info-card-block"
          },
          [_vm._t("default", null, { index: _vm.index })],
          2
        )
      ]),
      _vm._v(" "),
      _vm.showModal
        ? _c("cgl-modal", {
            attrs: {
              images: _vm.imagesData,
              config: _vm.config,
              index: _vm.index,
              defaultIndex: _vm.defaultIndex
            },
            on: {
              "update:images": function($event) {
                _vm.imagesData = $event;
              },
              "update:config": function($event) {
                _vm.config = $event;
              }
            }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-315c8cd8_0", { source: "\n.cgl-image {\n    width: 100%;\n    height: 100%;\n}\n.cgl-image * {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\n.cgl-image .cgl-image-wrapper {\n    overflow: hidden;\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n.cgl-image .cgl-image-wrapper img {\n    position: absolute;\n}\n.cgl-image .cgl-image-wrapper .cgl-image-back {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0,0,0,0.08);\n    background: -moz-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);\n    background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(0,0,0,0.08)), color-stop(46%, rgba(0,0,0,0.04)), color-stop(46%, rgba(0,0,0,0.04)), color-stop(100%, rgba(255,255,255,0.1)));\n    background: -webkit-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);\n    background: -o-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);\n    background: -ms-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);\n    background: linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#ffffff', GradientType=1 );\n}\n.cgl-image .cgl-image-wrapper img.cgl-image-anim-hide {\n    opacity: 0;\n}\n.cgl-image .cgl-image-wrapper img.cgl-image-anim-append {\n    -webkit-transition: all .35s ease-in;\n    -moz-transition: all .35s ease-in;\n    -o-transition: all .35s ease-in;\n    transition: all .35s ease-in;\n    opacity: 1;\n}\n.cgl-image .cgl-image-wrapper .cgl-loader-box {\n    position: relative;\n    left: 50%;\n    margin-left: -15px;\n    top: 35%;\n}\n.cgl-info-card-block{\n    width: 0;\n    top: 0;\n    position: static;\n}\n", map: {"version":3,"sources":["/home/vagrant/code/vue-pakajes/src/js/components/templates/Image.vue"],"names":[],"mappings":";AAyOA;IACA,WAAA;IACA,YAAA;AACA;AAEA;IACA,8BAAA;IACA,2BAAA;IACA,sBAAA;AACA;AAEA;IACA,gBAAA;IACA,kBAAA;IACA,WAAA;IACA,YAAA;AACA;AAEA;IACA,kBAAA;AACA;AAEA;IACA,kBAAA;IACA,OAAA;IACA,MAAA;IACA,WAAA;IACA,YAAA;IACA,4BAAA;IACA,oIAAA;IACA,qMAAA;IACA,uIAAA;IACA,kIAAA;IACA,mIAAA;IACA,+HAAA;IACA,oHAAA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,oCAAA;IACA,iCAAA;IACA,+BAAA;IACA,4BAAA;IACA,UAAA;AACA;AACA;IACA,kBAAA;IACA,SAAA;IACA,kBAAA;IACA,QAAA;AACA;AACA;IACA,QAAA;IACA,MAAA;IACA,gBAAA;AACA","file":"Image.vue","sourcesContent":["<script>\r\n    import CascadeGalleryLoader from '../spinner/Spinner.vue';\r\n    import CascadeGalleryModal from './Modal.vue';\r\n    import c from '../../constants';\r\n\r\n    export default {\r\n        name: c.IMAGE_COMPONENT_NAME,\r\n        components: (function(){\r\n            let components = {};\r\n            components[c.SPINNER_COMPONENT_NAME] = CascadeGalleryLoader;\r\n            components[c.MODAL_COMPONENT_NAME] = CascadeGalleryModal;\r\n            return components;\r\n        })(),\r\n        props: {\r\n            imagesData: {type: Object},\r\n            config: {type: Object},\r\n            index: {type: Number}\r\n        },\r\n        data() {\r\n            return {\r\n                showModal: false,\r\n                showSpinner: true,\r\n                defaultIndex: this.imagesData[c.DEFAULT_INDEX_KEY] ? this.imagesData[c.DEFAULT_INDEX_KEY] : 0,\r\n                image: {\r\n                    element: null,\r\n                    styles: {\r\n                        width: 'auto',\r\n                        height: 'auto',\r\n                        top: 0,\r\n                        left: 0\r\n                    },\r\n                    classes: [c.ANIMATION_CSS_CLASS_HIDE]\r\n                }\r\n            };\r\n        },\r\n        mounted() {\r\n            let self = this;\r\n            this.$on('closeModal', function () {\r\n                self.setShowModal(false)\r\n            });\r\n        },\r\n        methods: {\r\n\r\n            /**\r\n             * On image load prepare image config\r\n             * @param event\r\n             */\r\n            loadConfig(event) {\r\n                this.image.element = event.target;\r\n                this.setImageStyles();\r\n                this.waitPreviousImage();\r\n            },\r\n\r\n            /**\r\n             * Wait until previous image is loaded and\r\n             * just after that display the current one\r\n             */\r\n            waitPreviousImage() {\r\n                let self = this;\r\n                let waitForPrevious = setInterval(function () {\r\n                    if (self.previousImageLoaded()) {\r\n                        self.showSpinner = false;\r\n                        self.showImage();\r\n                        clearInterval(waitForPrevious);\r\n                    }\r\n                }, 10);\r\n            },\r\n\r\n            /**\r\n             * Display the image after a given delay time.\r\n             */\r\n            showImage() {\r\n                let self = this;\r\n                self.animate();\r\n                let waitForPrevious = setTimeout(function () {\r\n                    self.setLoaded();\r\n                }, self.config[c.CONFIG_DELAY_KEY]);\r\n            },\r\n\r\n            /**\r\n             * Loaded property is synced with Gallery that\r\n             * can be read in the next image which is\r\n             * waiting current one loading time\r\n             */\r\n            setLoaded() {\r\n                this.config.images[this.index].loaded = true;\r\n            },\r\n\r\n            /**\r\n             * Displays image in the best way, if the image is\r\n             * taller then image block it will proportionally\r\n             * set it by width otherwise will set it by height\r\n             * also align it by center the same way.\r\n             * @see this.getImagePropHeight()\r\n             * @see this.getImagePropWidth()\r\n             * @returns {boolean}\r\n             */\r\n            setImageStyles() {\r\n                let gap = this.config.gap ? this.config.gap : 0;\r\n                if ((this.getImagePropHeight() - gap) < this.getWrapperWidth()) {\r\n                    this.image.styles.width = '100%';\r\n                    this.image.styles.top = '-' + (this.getImagePropWidth() - this.getWrapperHeight()) / 2 + 'px';\r\n                    return true;\r\n                } else {\r\n                    this.image.styles.height = '100%';\r\n                    this.image.styles.left = '-' + (this.getImagePropHeight() - (this.getWrapperWidth() + gap)) / 2 + 'px';\r\n                    return true;\r\n                }\r\n            },\r\n\r\n            /**\r\n             * Gets image height from element\r\n             * @returns Number\r\n             */\r\n            getImageHeight() {\r\n                return this.image.element.offsetHeight;\r\n            },\r\n\r\n            /**\r\n             * Gets image width from element\r\n             * @returns Number\r\n             */\r\n            getImageWidth() {\r\n                return this.image.element.offsetWidth;\r\n            },\r\n\r\n            /**\r\n             * Gets image block (parent) height from element\r\n             * @returns Number\r\n             */\r\n            getWrapperHeight() {\r\n                return this.config.images[this.index].height;\r\n            },\r\n\r\n            /**\r\n             * Gets image block (parent) width from element\r\n             * @returns Number\r\n             */\r\n            getWrapperWidth() {\r\n                return this.config.images[this.index].width;\r\n            },\r\n\r\n            /**\r\n             * Finds in advance the image height if it is\r\n             * proportionally resize to the (parent) image\r\n             * block height\r\n             * @returns Number\r\n             */\r\n            getImagePropHeight() {\r\n                let diffHeightInPercentage = (100 * this.getImageWidth()) / this.getImageHeight();\r\n                return this.getWrapperHeight() * diffHeightInPercentage / 100;\r\n            },\r\n\r\n            /**\r\n             * Finds in advance the image width if it was\r\n             * proportionally resized to the (parent) image\r\n             * block width\r\n             * @returns Number\r\n             */\r\n            getImagePropWidth() {\r\n                let diffWidthInPercentage = (100 * this.getImageHeight()) / this.getImageWidth();\r\n                return this.getWrapperWidth() * diffWidthInPercentage / 100;\r\n            },\r\n\r\n            /**\r\n             * Check if the image is the first in list\r\n             * @returns Boolean\r\n             */\r\n            isFirstImage() {\r\n                return parseInt(this.index) === 0;\r\n            },\r\n\r\n            /**\r\n             * Check if previous image was loaded\r\n             * @see this.waitPreviousImage()\r\n             * @returns Boolean\r\n             */\r\n            previousImageLoaded() {\r\n                if (this.isFirstImage()) {\r\n                    return true;\r\n                }\r\n                return this.config.images[this.index - 1].loaded;\r\n            },\r\n\r\n            /**\r\n             * Add animation classes to the image\r\n             * TODO: css animations\r\n             * @returns Boolean\r\n             */\r\n            animate() {\r\n                this.image.classes.push(c.ANIMATION_CSS_CLASS_APPEND);\r\n            },\r\n\r\n            /**\r\n             * Display image modal\r\n             * @param value\r\n             */\r\n            setShowModal(value) {\r\n                this.showModal = value;\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<template>\r\n    <div class=\"cgl-image\">\r\n        <div class=\"cgl-image-wrapper\">\r\n            <div class=\"cgl-image-back\">\r\n                <img :src=\"imagesData.src[defaultIndex]\"\r\n                     :class=\"image.classes\"\r\n                     :style=\"image.styles\"\r\n                     @load=\"loadConfig($event)\"\r\n                     @click=\"setShowModal(true)\"/>\r\n            </div>\r\n            <div class=\"cgl-loader-box\"\r\n                v-show=\"showSpinner\">\r\n                <cgl-spinner></cgl-spinner>\r\n            </div>\r\n            <div class=\"cgl-info-card-block\"\r\n                 v-show=\"!showSpinner\">\r\n                <slot v-bind:index=\"index\"></slot>\r\n            </div>\r\n        </div>\r\n        <cgl-modal :images.sync=\"imagesData\"\r\n                   :config.sync=\"config\"\r\n                   :index=\"index\"\r\n                   :defaultIndex=\"defaultIndex\"\r\n                   v-if=\"showModal\">\r\n        </cgl-modal>\r\n    </div>\r\n</template>\r\n\r\n<style>\r\n    .cgl-image {\r\n        width: 100%;\r\n        height: 100%;\r\n    }\r\n\r\n    .cgl-image * {\r\n        -webkit-box-sizing: border-box;\r\n        -moz-box-sizing: border-box;\r\n        box-sizing: border-box;\r\n    }\r\n\r\n    .cgl-image .cgl-image-wrapper {\r\n        overflow: hidden;\r\n        position: relative;\r\n        width: 100%;\r\n        height: 100%;\r\n    }\r\n\r\n    .cgl-image .cgl-image-wrapper img {\r\n        position: absolute;\r\n    }\r\n\r\n    .cgl-image .cgl-image-wrapper .cgl-image-back {\r\n        position: absolute;\r\n        left: 0;\r\n        top: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        background: rgba(0,0,0,0.08);\r\n        background: -moz-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);\r\n        background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(0,0,0,0.08)), color-stop(46%, rgba(0,0,0,0.04)), color-stop(46%, rgba(0,0,0,0.04)), color-stop(100%, rgba(255,255,255,0.1)));\r\n        background: -webkit-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);\r\n        background: -o-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);\r\n        background: -ms-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);\r\n        background: linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);\r\n        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#ffffff', GradientType=1 );\r\n    }\r\n\r\n    .cgl-image .cgl-image-wrapper img.cgl-image-anim-hide {\r\n        opacity: 0;\r\n    }\r\n\r\n    .cgl-image .cgl-image-wrapper img.cgl-image-anim-append {\r\n        -webkit-transition: all .35s ease-in;\r\n        -moz-transition: all .35s ease-in;\r\n        -o-transition: all .35s ease-in;\r\n        transition: all .35s ease-in;\r\n        opacity: 1;\r\n    }\r\n    .cgl-image .cgl-image-wrapper .cgl-loader-box {\r\n        position: relative;\r\n        left: 50%;\r\n        margin-left: -15px;\r\n        top: 35%;\r\n    }\r\n    .cgl-info-card-block{\r\n        width: 0;\r\n        top: 0;\r\n        position: static;\r\n    }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  

  
  var CascadeGalleryImage = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    browser,
    undefined
  );let Validator = function() {

    let self = this;

    /**
     * @param path
     * @returns void
     */
    let logError = function(path) {
        let message = 'Config error: [';
        for (let item in path) {
            message += path[item].toString()+'.';
        }
        console.error(message.substring(0, message.length - 1)+']');
    };

    /**
     * @param input
     * @returns Boolean
     */
    self.validate = function (input) {
        if (typeof input == "object") {
            let hasWidth = self.hasConfig(input, c.CONFIG_WIDTH_RANGE_KEY);
            let isValidWidth = self.hasRangesFor(input, c.CONFIG_WIDTH_RANGE_KEY);
            let hasHeight = self.hasConfig(input, c.CONFIG_HEIGHT_RANGE_KEY);
            let isValidHeight = self.hasRangesFor(input, c.CONFIG_HEIGHT_RANGE_KEY);
            return (!hasWidth || isValidWidth) && (!hasHeight || isValidHeight);
        }
        return true;
    };

    /**
     * @param config
     * @returns Boolean
     */
    self.hasDelay = function(config) {
        return config.hasOwnProperty(c.CONFIG_DELAY_KEY) ? self.isNumber(config[c.CONFIG_DELAY_KEY]) : false;
    };

    /**
     * @param config
     * @returns Boolean
     */
    self.hasGap = function(config) {
        return config.hasOwnProperty(c.CONFIG_GAP_KEY) ? self.isNumber(config[c.CONFIG_GAP_KEY]) : false;
    };

    /**
     * @param value
     * @returns Boolean
     */
    self.isNumber = function(value) {
        return !!value.toString().match(/^[\d.]+$/g)
    };

    /**
     * @param config
     * @param rangeKey
     * @param showErrors
     * @returns Boolean
     */
    self.hasRangesFor = function(config, rangeKey, showErrors = true) {
        if (typeof config !== "object") return false;
        if (self.hasConfig(config, rangeKey)) {
            return self.hasRanges(config, rangeKey, showErrors);
        }
        return false;
    };

    /**
     * @param config
     * @param rangeKey
     * @returns Boolean
     */
    self.hasConfig = function(config, rangeKey) {
        return config.hasOwnProperty(rangeKey);
    };

    /**
     * Checks if the given config option has predefined ranges
     * with valid keys.
     * @see constants.js
     *
     * @param config
     * @param key
     * @param showErrors
     * @returns Boolean
     */
    self.hasRanges = function(config, key, showErrors) {
        let isValid = false;
        let hasFrom = config[key].hasOwnProperty(c.CONFIG_RANGE_KEY_FROM);
        let isValidFrom = hasFrom ? self.isNumber(config[key][c.CONFIG_RANGE_KEY_FROM]) : false;
        let hasTo = config[key].hasOwnProperty(c.CONFIG_RANGE_KEY_TO);
        let isValidTo = hasTo ? self.isNumber(config[key][c.CONFIG_RANGE_KEY_TO]) : false;

        if (isValidFrom && isValidTo) {
            isValid = config[key][c.CONFIG_RANGE_KEY_TO] >= config[key][c.CONFIG_RANGE_KEY_FROM];
        }
        if (showErrors) {
            if (!isValidFrom) logError([key,c.CONFIG_RANGE_KEY_FROM]);
            if (!isValidTo) logError([key,c.CONFIG_RANGE_KEY_TO]);
            if (!isValid) logError([key]);
        }
        return isValid;
    };



};

var validator = new Validator();var script$3 = {
    name: c.GALLERY_COMPONENT_NAME,
    components: (function(){
        let components = {};
        components[c.IMAGE_COMPONENT_NAME] = CascadeGalleryImage;
        return components;
    })(),
    props: {
        images: { type: Array },
        options: { type: Object }
    },
    data() {
        return {
            galleryHeight: 0,
            lineIndex: 0,
            columnsAmount: 0,
            previousLineStartIndex: 0,
            lastLineStartIndex: 0,
            currentImageIndex: 0,
            isEndOfTheLine: false,
            hasNewImages: false,
            newImagesStartIndex: 0,
            firstLineIsNotComplete: true,
            config: {
                maxWidth: c.CONFIG_WIDTH_TO,
                minWidth: c.CONFIG_WIDTH_FROM,
                images: [],
            },
            window: {
                width: 0,
                height: 0
            }
        };
    },
    mounted() {
        this.window.width = this.$el.parentNode.offsetWidth;
        this.window.height = this.$el.parentNode.offsetHeight;
        this.prepareConfigOptions();
        this.prepareConfigImages();
    },
    watch: {
        /**
         * Watch for the images list and add incoming images
         * TODO: Rebuild configuration on image removing
         */
        images() {
            this.addNewImages();
            this.setGalleryHeight();
        }
    },
    methods: {

        /**
         * Prepare configuration options
         * Not all configuration options is handled in this
         * method, just those that must be prepared in advance
         */
        prepareConfigOptions() {
            if (validator.hasRangesFor(this.options, c.CONFIG_WIDTH_RANGE_KEY, false)) {
                this.config.maxWidth = this.options[c.CONFIG_WIDTH_RANGE_KEY][c.CONFIG_RANGE_KEY_TO];
                this.config.minWidth = this.options[c.CONFIG_WIDTH_RANGE_KEY][c.CONFIG_RANGE_KEY_FROM];
            }
            if (validator.hasRangesFor(this.options, c.CONFIG_HEIGHT_RANGE_KEY, false)) {
                this.config.maxHeight = this.options[c.CONFIG_HEIGHT_RANGE_KEY][c.CONFIG_RANGE_KEY_TO];
                this.config.minHeight = this.options[c.CONFIG_HEIGHT_RANGE_KEY][c.CONFIG_RANGE_KEY_FROM];
            }
            if (validator.hasDelay(this.options)) {
                this.config[c.CONFIG_DELAY_KEY] = this.options[c.CONFIG_DELAY_KEY];
            }
            if (validator.hasGap(this.options)) {
                this.config[c.CONFIG_GAP_KEY] = this.options[c.CONFIG_GAP_KEY];
            }
        },

        /**
         * After configuration options are ready apply them to
         * the images block (parent)
         * That is invoked just on mounting
         * NOTE: By defining image configuration we meant image block
         *       (parent) configuration so image it self can detect
         *       future sizes or displaying modes
         */
        prepareConfigImages() {
            for(let index in this.images) {
                this.setNextImageConfig(index);
            }
            let firstLineIsNotComplete = this.getLineWidth() < this.window.width && this.lineIndex < 1;
            if(firstLineIsNotComplete) {
                let index = this.currentImageIndex;
                let limit = 5;
                let start = 0;
                while (this.firstLineIsNotComplete) {
                    index++;
                    this.setNextImageConfig(index);
                    start++;
                    if (start > limit) {
                        break;
                    }
                }
            }
            this.setGalleryHeight();
        },

        /**
         * Sets configuration for the current image in the list
         * @param index Given image index
         */
        setNextImageConfig(index) {
            this.currentImageIndex = index;
            /**
             * Before a setting the height we have to define widths
             * of the future columns (images in the first line)
             */
            this.config.images[index] = {
                width: this.getWidth(),
                loaded: false
            };
            this.currentImageIndex = index;
            this.prepareGapStyles();
            this.prepareCurrentLine();
        },

        /**
         * Prepare gap configuration
         */
        prepareGapStyles() {
            let gap = this.config[c.CONFIG_GAP_KEY];
            if (gap > 0) {

                this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY] = {};
                this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-top-width'] = gap+'px';
                this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-right-width'] = gap+'px';
                if (this.lastLineStartIndex === 0) {
                    this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-top-width'] = '0px';
                }
                if (this.isLastInTheLine(this.currentImageIndex)) {
                    this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-right-width'] = '0px';
                }
            }
        },

        /**
         * Check if the given image index is the last in the line
         */
        isLastInTheLine(index) {
            return this.config.images[index].width + this.getLineWidth() === this.window.width;
        },

        /**
         * After wee have all of the widths for given images we check
         * the line order number that we left, and continue to set
         * other image block properties
         */
        prepareCurrentLine() {
            let startIndex = this.lastLineStartIndex;
            if(this.isEndOfTheLine) {
                for(let index = startIndex; index < this.config.images.length; index++) {
                    if (this.hasNewImages) {
                        index = this.newImagesStartIndex;
                        this.hasNewImages = false;
                    }
                    this.currentImageIndex = index;
                    this.config.images[index].height = this.getHeight();
                    this.config.images[index].left = this.getPositionX();
                    this.config.images[index].top = this.getPositionY();
                }
                this.previousLineStartIndex = this.lastLineStartIndex;
                this.lastLineStartIndex = this.currentImageIndex + 1;
                this.lineIndex++;
                this.isEndOfTheLine = false;
            }
        },

        /**
         * After new images was added to the images list we prepare the
         * new state of gallery config and continue to build it
         */
        addNewImages() {
            this.hasNewImages = true;
            this.newImagesStartIndex = this.currentImageIndex+1;
            this.prepareForNewImages();
            for ( let index = this.newImagesStartIndex; index < this.images.length; index++ ) {
                this.setNextImageConfig(index);
            }
            this.setGalleryHeight();
        },

        /**
         * Resets the state of the previous gallery configuration
         * @see this.addNewImages()
         */
        prepareForNewImages() {
            if (this.newImagesStartIndex%this.columnsAmount > 0) {
                this.lastLineStartIndex = this.previousLineStartIndex;
                this.previousLineStartIndex = this.lastLineStartIndex - this.columnsAmount;
                this.lineIndex--;
                this.isEndOfTheLine = false;
            }
        },

        /**
         * Detects left X axe position for the current image
         * @returns Number
         */
        getPositionX() {
            let posX = 0;
            if (this.currentImageIndex - this.lastLineStartIndex !== 0) {
                let previousImage = this.config.images[this.currentImageIndex - 1];
                posX = previousImage.width + previousImage.left;
            }
            return posX;
        },

        /**
         * Detects top Y axe position for the current image
         * @returns Number
         */
        getPositionY() {
            let posY = 0;
            if (!this.isFirstLine()) {
                let previousLineSibling = this.config.images[this.getPreviousLineSibling()];
                posY = previousLineSibling.height + previousLineSibling.top;
            }
            return posY;
        },

        /**
         * Generate random/given height for the current image
         * @returns Number
         */
        getHeight() {
            return this.getRandomHeight();
        },

        /**
         * Generates random width/given also if the generated width do
         * not fit in the last remained portion of the parent block
         * width all the images blocks will be adjusted
         * @returns Number
         */
        getWidth() {
            let width = this.getRandomWidth();
            this.isEndOfTheLine = false;
            if (!this.isFirstLine()) {
                this.columnsAmount = this.lastLineStartIndex - this.previousLineStartIndex;
                let previousLineSibling = this.config.images[this.getPreviousLineSibling()];
                width = previousLineSibling.width;
                let length = this.lastLineStartIndex - this.previousLineStartIndex;
                this.isEndOfTheLine = this.currentImageIndex == (length - 1) + this.lastLineStartIndex
                    || this.currentImageIndex == this.images.length - 1;
                return width;
            } else if(this.notEnoughSpaceInLine(width)) {
                this.isEndOfTheLine = true;
                this.firstLineIsNotComplete = false;
                return this.adjustSiblingsWidth(width);
            }
            return width;
        },

        /**
         * Get the width for the current image block from the image block
         * on the same order number of the previous line to keep the columns
         * width equal in the each line
         * TODO: display one image block in the tow lines
         * @see this.getPreviousLineSibling()
         * @returns Number
         */
        getCurrentImageWidth() {
            let previousLineSibling = this.getPreviousLineSibling();
            return this.config.images[previousLineSibling].width;
        },

        /**
         * Find index of the previous line block image that has the
         * same order number
         * @see this.getCurrentImageWidth()
         * @returns Number
         */
        getPreviousLineSibling() {
            return this.previousLineStartIndex + ( this.currentImageIndex - this.lastLineStartIndex );
        },

        /**
         * Generate random width in the given range
         * @returns Number
         */
        getRandomWidth() {
            return this.getRandomNumber(this.config.minWidth, this.config.maxWidth);
        },

        /**
         * Generate random height in the given range. By default and average
         * height will be picked base on images width range
         * @returns Number
         */
        getRandomHeight() {
            if (!this.config.minHeight || !this.config.maxHeight) {
                let amountOfImages = Math.round((this.window.width/this.config.minWidth) * 10) / 10;
                let approximateImageWidth = Math.round((this.window.width/amountOfImages) * 10) / 10;
                return approximateImageWidth + this.getBacklash(approximateImageWidth);
            }
            return this.getRandomNumber(this.config.minHeight, this.config.maxHeight);
        },

        /**
         * Counts the current line width based on the current images
         * blocks in the line widths sum
         * @returns Number
         */
        getLineWidth() {
            let lineWidth = 0;
            for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                lineWidth += parseInt(this.config.images[index].width);
            }
            return lineWidth;
        },

        /**
         * Checks if the sum of the width images blocks is to big to leave
         * space for one another image
         * @see this.getWidth()
         * @returns Boolean
         */
        notEnoughSpaceInLine(width) {
            return this.getLineWidth() + width + this.getBacklash(this.config.minWidth) > this.window.width;
        },

        /**
         * Is used to add little bet more space to the last image in order
         * to increase visual consistency on random width generating
         * @see this.notEnoughSpaceInLine()
         * @returns Number
         */
        getBacklash(width) {
            return this.getRandomNumber(0, Math.round((width/5)));
        },

        /**
         * After it was detected that last image block width has not enough
         * space in the line other blocks width will be adjusted. If the
         * given proportion are tow wide spreader and after minimize all images
         * to the given minWidth it is still not enough space the remaining
         * space in the line will be set as the current image with
         * @returns Number
         */
        adjustSiblingsWidth(width) {
            let limit = parseInt(this.config.maxWidth);
            let iterator = 0;
            while (!this.isAligned(width) && iterator < limit) {
                for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                    let mustDecay = this.config.images[index].width > this.config.minWidth;
                    if(mustDecay) {
                        this.config.images[index].width = parseInt(this.config.images[index].width) - 1;
                    }
                    let limitReached = iterator === limit - 1;
                    if (limitReached) {
                        return this.getLastPartWidth();
                    }
                    if (this.isAligned(width)) {
                        return width;
                    }
                }
                iterator++;
            }
        },

        /**
         * Get the remaining width in the line
         * @see this.adjustSiblingsWidth()
         * @returns Number
         */
        getLastPartWidth() {
            return this.window.width - this.getLineWidth()
        },

        /**
         * Check if there is enough space for the last image block width
         * @returns Boolean
         */
        isAligned(width) {
            return width + this.getLineWidth() === this.window.width;
        },

        /**
         * Get the difference between window and the current image blocks width
         * @returns Number
         */
        getLineLengthDiff(width) {
            return (this.getLineWidth() + width) - this.window.width;
        },

        /**
         * Generates random number in the given range
         * @returns Number
         */
        getRandomNumber(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        /**
         * Checks if the current line is the first
         * @returns Boolean
         */
        isFirstLine() {
            return !parseInt(this.lineIndex);
        },

        /**
         * After all configuration was prepared apply them to the DOM
         */
        getStyles(index) {
            let styles = {
                width: this.config.images[index].width + 'px',
                height: this.config.images[index].height + 'px',
                left: this.config.images[index].left + 'px',
                top: this.config.images[index].top + 'px'
            };
            styles = this.getGapStyles(styles, index);
            return styles;
        },

        /**
         * Sipecific styles for the gap between columns
         * @return Object
         */
        getGapStyles(styles, index) {
            if (validator.hasGap(this.options)) {
                for (let key in this.config.images[index][c.CONFIG_GAP_KEY]) {
                    styles[key] = this.config.images[index][c.CONFIG_GAP_KEY][key];
                }
            }

            return styles;
        },

        /**
         * Finds the tallest column and sets the height of the gallery
         * That needs as an workaround to the css position absolute of
         * the gallery wrapper
         * @returns Number
         */
        setGalleryHeight() {
            let columnsHeights = [];
            let currentColumn = 0;
            if (this.columnsAmount < 1) {
                this.columnsAmount = this.config.images.length;
            }
            for (let imageIndex in this.config.images) {
                let image = this.config.images[imageIndex];
                if (currentColumn >= this.columnsAmount) {
                    currentColumn = 0;
                }
                if (!columnsHeights[currentColumn]) {
                    columnsHeights[currentColumn] = 0;
                }
                columnsHeights[currentColumn] += image.height;
                currentColumn++;
            }
            for (let index in columnsHeights) {
                if (columnsHeights[index] > this.galleryHeight) {
                    this.galleryHeight = columnsHeights[index];
                }
            }
        }
    }
};/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "cgl-columns-block",
      style: { height: _vm.galleryHeight + "px" }
    },
    _vm._l(_vm.images, function(image, index) {
      return _vm.config.images[index]
        ? _c(
            "div",
            { staticClass: "cgl-image-block", style: _vm.getStyles(index) },
            [
              _c("cgl-image", {
                attrs: { imagesData: image, config: _vm.config, index: index },
                on: {
                  "update:config": function($event) {
                    _vm.config = $event;
                  }
                },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "default",
                      fn: function(images) {
                        return [
                          _vm._t("default", null, { index: images.index })
                        ]
                      }
                    }
                  ],
                  null,
                  true
                )
              })
            ],
            1
          )
        : _vm._e()
    }),
    0
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-769eccb0_0", { source: "\n.cgl-columns-block{\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    width: 100%;\n    position: relative;\n}\n.cgl-image-block {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    position: absolute;\n    left: 0;\n    top: 0;\n    border: 0px solid transparent;\n}\n", map: {"version":3,"sources":["/home/vagrant/code/vue-pakajes/src/js/components/templates/Gallery.vue"],"names":[],"mappings":";AA6eA;IACA,8BAAA;IACA,2BAAA;IACA,sBAAA;IACA,WAAA;IACA,kBAAA;AACA;AACA;IACA,8BAAA;IACA,2BAAA;IACA,sBAAA;IACA,SAAA;IACA,UAAA;IACA,kBAAA;IACA,OAAA;IACA,MAAA;IACA,6BAAA;AACA","file":"Gallery.vue","sourcesContent":["<script>\r\n    import CascadeGalleryImage from './Image.vue';\r\n    import c from '../../constants';\r\n    import validator from '../../validator';\r\n\r\n    export default {\r\n        name: c.GALLERY_COMPONENT_NAME,\r\n        components: (function(){\r\n            let components = {};\r\n            components[c.IMAGE_COMPONENT_NAME] = CascadeGalleryImage;\r\n            return components;\r\n        })(),\r\n        props: {\r\n            images: { type: Array },\r\n            options: { type: Object }\r\n        },\r\n        data() {\r\n            return {\r\n                galleryHeight: 0,\r\n                lineIndex: 0,\r\n                columnsAmount: 0,\r\n                previousLineStartIndex: 0,\r\n                lastLineStartIndex: 0,\r\n                currentImageIndex: 0,\r\n                isEndOfTheLine: false,\r\n                hasNewImages: false,\r\n                newImagesStartIndex: 0,\r\n                firstLineIsNotComplete: true,\r\n                config: {\r\n                    maxWidth: c.CONFIG_WIDTH_TO,\r\n                    minWidth: c.CONFIG_WIDTH_FROM,\r\n                    images: [],\r\n                },\r\n                window: {\r\n                    width: 0,\r\n                    height: 0\r\n                }\r\n            };\r\n        },\r\n        mounted() {\r\n            this.window.width = this.$el.parentNode.offsetWidth;\r\n            this.window.height = this.$el.parentNode.offsetHeight;\r\n            this.prepareConfigOptions();\r\n            this.prepareConfigImages();\r\n        },\r\n        watch: {\r\n            /**\r\n             * Watch for the images list and add incoming images\r\n             * TODO: Rebuild configuration on image removing\r\n             */\r\n            images() {\r\n                this.addNewImages();\r\n                this.setGalleryHeight()\r\n            }\r\n        },\r\n        methods: {\r\n\r\n            /**\r\n             * Prepare configuration options\r\n             * Not all configuration options is handled in this\r\n             * method, just those that must be prepared in advance\r\n             */\r\n            prepareConfigOptions() {\r\n                if (validator.hasRangesFor(this.options, c.CONFIG_WIDTH_RANGE_KEY, false)) {\r\n                    this.config.maxWidth = this.options[c.CONFIG_WIDTH_RANGE_KEY][c.CONFIG_RANGE_KEY_TO];\r\n                    this.config.minWidth = this.options[c.CONFIG_WIDTH_RANGE_KEY][c.CONFIG_RANGE_KEY_FROM];\r\n                }\r\n                if (validator.hasRangesFor(this.options, c.CONFIG_HEIGHT_RANGE_KEY, false)) {\r\n                    this.config.maxHeight = this.options[c.CONFIG_HEIGHT_RANGE_KEY][c.CONFIG_RANGE_KEY_TO];\r\n                    this.config.minHeight = this.options[c.CONFIG_HEIGHT_RANGE_KEY][c.CONFIG_RANGE_KEY_FROM];\r\n                }\r\n                if (validator.hasDelay(this.options)) {\r\n                    this.config[c.CONFIG_DELAY_KEY] = this.options[c.CONFIG_DELAY_KEY];\r\n                }\r\n                if (validator.hasGap(this.options)) {\r\n                    this.config[c.CONFIG_GAP_KEY] = this.options[c.CONFIG_GAP_KEY];\r\n                }\r\n            },\r\n\r\n            /**\r\n             * After configuration options are ready apply them to\r\n             * the images block (parent)\r\n             * That is invoked just on mounting\r\n             * NOTE: By defining image configuration we meant image block\r\n             *       (parent) configuration so image it self can detect\r\n             *       future sizes or displaying modes\r\n             */\r\n            prepareConfigImages() {\r\n                for(let index in this.images) {\r\n                    this.setNextImageConfig(index);\r\n                }\r\n                let firstLineIsNotComplete = this.getLineWidth() < this.window.width && this.lineIndex < 1;\r\n                if(firstLineIsNotComplete) {\r\n                    let index = this.currentImageIndex;\r\n                    let limit = 5;\r\n                    let start = 0;\r\n                    while (this.firstLineIsNotComplete) {\r\n                        index++;\r\n                        this.setNextImageConfig(index);\r\n                        start++;\r\n                        if (start > limit) {\r\n                            break;\r\n                        }\r\n                    }\r\n                }\r\n                this.setGalleryHeight();\r\n            },\r\n\r\n            /**\r\n             * Sets configuration for the current image in the list\r\n             * @param index Given image index\r\n             */\r\n            setNextImageConfig(index) {\r\n                this.currentImageIndex = index;\r\n                /**\r\n                 * Before a setting the height we have to define widths\r\n                 * of the future columns (images in the first line)\r\n                 */\r\n                this.config.images[index] = {\r\n                    width: this.getWidth(),\r\n                    loaded: false\r\n                };\r\n                this.currentImageIndex = index;\r\n                this.prepareGapStyles();\r\n                this.prepareCurrentLine();\r\n            },\r\n\r\n            /**\r\n             * Prepare gap configuration\r\n             */\r\n            prepareGapStyles() {\r\n                let gap = this.config[c.CONFIG_GAP_KEY];\r\n                if (gap > 0) {\r\n\r\n                    this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY] = {};\r\n                    this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-top-width'] = gap+'px';\r\n                    this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-right-width'] = gap+'px';\r\n                    if (this.lastLineStartIndex === 0) {\r\n                        this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-top-width'] = '0px';\r\n                    }\r\n                    if (this.isLastInTheLine(this.currentImageIndex)) {\r\n                        this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-right-width'] = '0px';\r\n                    }\r\n                }\r\n            },\r\n\r\n            /**\r\n             * Check if the given image index is the last in the line\r\n             */\r\n            isLastInTheLine(index) {\r\n                return this.config.images[index].width + this.getLineWidth() === this.window.width;\r\n            },\r\n\r\n            /**\r\n             * After wee have all of the widths for given images we check\r\n             * the line order number that we left, and continue to set\r\n             * other image block properties\r\n             */\r\n            prepareCurrentLine() {\r\n                let startIndex = this.lastLineStartIndex;\r\n                if(this.isEndOfTheLine) {\r\n                    for(let index = startIndex; index < this.config.images.length; index++) {\r\n                        if (this.hasNewImages) {\r\n                            index = this.newImagesStartIndex;\r\n                            this.hasNewImages = false;\r\n                        }\r\n                        this.currentImageIndex = index;\r\n                        this.config.images[index].height = this.getHeight();\r\n                        this.config.images[index].left = this.getPositionX();\r\n                        this.config.images[index].top = this.getPositionY();\r\n                    }\r\n                    this.previousLineStartIndex = this.lastLineStartIndex;\r\n                    this.lastLineStartIndex = this.currentImageIndex + 1;\r\n                    this.lineIndex++;\r\n                    this.isEndOfTheLine = false;\r\n                }\r\n            },\r\n\r\n            /**\r\n             * After new images was added to the images list we prepare the\r\n             * new state of gallery config and continue to build it\r\n             */\r\n            addNewImages() {\r\n                this.hasNewImages = true;\r\n                this.newImagesStartIndex = this.currentImageIndex+1;\r\n                this.prepareForNewImages();\r\n                for ( let index = this.newImagesStartIndex; index < this.images.length; index++ ) {\r\n                    this.setNextImageConfig(index);\r\n                }\r\n                this.setGalleryHeight();\r\n            },\r\n\r\n            /**\r\n             * Resets the state of the previous gallery configuration\r\n             * @see this.addNewImages()\r\n             */\r\n            prepareForNewImages() {\r\n                if (this.newImagesStartIndex%this.columnsAmount > 0) {\r\n                    this.lastLineStartIndex = this.previousLineStartIndex;\r\n                    this.previousLineStartIndex = this.lastLineStartIndex - this.columnsAmount;\r\n                    this.lineIndex--;\r\n                    this.isEndOfTheLine = false;\r\n                }\r\n            },\r\n\r\n            /**\r\n             * Detects left X axe position for the current image\r\n             * @returns Number\r\n             */\r\n            getPositionX() {\r\n                let posX = 0;\r\n                if (this.currentImageIndex - this.lastLineStartIndex !== 0) {\r\n                    let previousImage = this.config.images[this.currentImageIndex - 1];\r\n                    posX = previousImage.width + previousImage.left;\r\n                }\r\n                return posX;\r\n            },\r\n\r\n            /**\r\n             * Detects top Y axe position for the current image\r\n             * @returns Number\r\n             */\r\n            getPositionY() {\r\n                let posY = 0;\r\n                if (!this.isFirstLine()) {\r\n                    let previousLineSibling = this.config.images[this.getPreviousLineSibling()];\r\n                    posY = previousLineSibling.height + previousLineSibling.top;\r\n                }\r\n                return posY;\r\n            },\r\n\r\n            /**\r\n             * Generate random/given height for the current image\r\n             * @returns Number\r\n             */\r\n            getHeight() {\r\n                return this.getRandomHeight();\r\n            },\r\n\r\n            /**\r\n             * Generates random width/given also if the generated width do\r\n             * not fit in the last remained portion of the parent block\r\n             * width all the images blocks will be adjusted\r\n             * @returns Number\r\n             */\r\n            getWidth() {\r\n                let width = this.getRandomWidth();\r\n                this.isEndOfTheLine = false;\r\n                if (!this.isFirstLine()) {\r\n                    this.columnsAmount = this.lastLineStartIndex - this.previousLineStartIndex;\r\n                    let previousLineSibling = this.config.images[this.getPreviousLineSibling()];\r\n                    width = previousLineSibling.width;\r\n                    let length = this.lastLineStartIndex - this.previousLineStartIndex;\r\n                    this.isEndOfTheLine = this.currentImageIndex == (length - 1) + this.lastLineStartIndex\r\n                        || this.currentImageIndex == this.images.length - 1;\r\n                    return width;\r\n                } else if(this.notEnoughSpaceInLine(width)) {\r\n                    this.isEndOfTheLine = true;\r\n                    this.firstLineIsNotComplete = false;\r\n                    return this.adjustSiblingsWidth(width);\r\n                }\r\n                return width;\r\n            },\r\n\r\n            /**\r\n             * Get the width for the current image block from the image block\r\n             * on the same order number of the previous line to keep the columns\r\n             * width equal in the each line\r\n             * TODO: display one image block in the tow lines\r\n             * @see this.getPreviousLineSibling()\r\n             * @returns Number\r\n             */\r\n            getCurrentImageWidth() {\r\n                let previousLineSibling = this.getPreviousLineSibling();\r\n                return this.config.images[previousLineSibling].width;\r\n            },\r\n\r\n            /**\r\n             * Find index of the previous line block image that has the\r\n             * same order number\r\n             * @see this.getCurrentImageWidth()\r\n             * @returns Number\r\n             */\r\n            getPreviousLineSibling() {\r\n                return this.previousLineStartIndex + ( this.currentImageIndex - this.lastLineStartIndex );\r\n            },\r\n\r\n            /**\r\n             * Generate random width in the given range\r\n             * @returns Number\r\n             */\r\n            getRandomWidth() {\r\n                return this.getRandomNumber(this.config.minWidth, this.config.maxWidth);\r\n            },\r\n\r\n            /**\r\n             * Generate random height in the given range. By default and average\r\n             * height will be picked base on images width range\r\n             * @returns Number\r\n             */\r\n            getRandomHeight() {\r\n                if (!this.config.minHeight || !this.config.maxHeight) {\r\n                    let amountOfImages = Math.round((this.window.width/this.config.minWidth) * 10) / 10;\r\n                    let approximateImageWidth = Math.round((this.window.width/amountOfImages) * 10) / 10;\r\n                    return approximateImageWidth + this.getBacklash(approximateImageWidth);\r\n                }\r\n                return this.getRandomNumber(this.config.minHeight, this.config.maxHeight);\r\n            },\r\n\r\n            /**\r\n             * Counts the current line width based on the current images\r\n             * blocks in the line widths sum\r\n             * @returns Number\r\n             */\r\n            getLineWidth() {\r\n                let lineWidth = 0;\r\n                for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {\r\n                    lineWidth += parseInt(this.config.images[index].width);\r\n                }\r\n                return lineWidth;\r\n            },\r\n\r\n            /**\r\n             * Checks if the sum of the width images blocks is to big to leave\r\n             * space for one another image\r\n             * @see this.getWidth()\r\n             * @returns Boolean\r\n             */\r\n            notEnoughSpaceInLine(width) {\r\n                return this.getLineWidth() + width + this.getBacklash(this.config.minWidth) > this.window.width;\r\n            },\r\n\r\n            /**\r\n             * Is used to add little bet more space to the last image in order\r\n             * to increase visual consistency on random width generating\r\n             * @see this.notEnoughSpaceInLine()\r\n             * @returns Number\r\n             */\r\n            getBacklash(width) {\r\n                return this.getRandomNumber(0, Math.round((width/5)));\r\n            },\r\n\r\n            /**\r\n             * After it was detected that last image block width has not enough\r\n             * space in the line other blocks width will be adjusted. If the\r\n             * given proportion are tow wide spreader and after minimize all images\r\n             * to the given minWidth it is still not enough space the remaining\r\n             * space in the line will be set as the current image with\r\n             * @returns Number\r\n             */\r\n            adjustSiblingsWidth(width) {\r\n                let limit = parseInt(this.config.maxWidth);\r\n                let iterator = 0;\r\n                while (!this.isAligned(width) && iterator < limit) {\r\n                    for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {\r\n                        let mustDecay = this.config.images[index].width > this.config.minWidth;\r\n                        if(mustDecay) {\r\n                            this.config.images[index].width = parseInt(this.config.images[index].width) - 1;\r\n                        }\r\n                        let limitReached = iterator === limit - 1;\r\n                        if (limitReached) {\r\n                            return this.getLastPartWidth();\r\n                        }\r\n                        if (this.isAligned(width)) {\r\n                            return width;\r\n                        }\r\n                    }\r\n                    iterator++;\r\n                }\r\n            },\r\n\r\n            /**\r\n             * Get the remaining width in the line\r\n             * @see this.adjustSiblingsWidth()\r\n             * @returns Number\r\n             */\r\n            getLastPartWidth() {\r\n                return this.window.width - this.getLineWidth()\r\n            },\r\n\r\n            /**\r\n             * Check if there is enough space for the last image block width\r\n             * @returns Boolean\r\n             */\r\n            isAligned(width) {\r\n                return width + this.getLineWidth() === this.window.width;\r\n            },\r\n\r\n            /**\r\n             * Get the difference between window and the current image blocks width\r\n             * @returns Number\r\n             */\r\n            getLineLengthDiff(width) {\r\n                return (this.getLineWidth() + width) - this.window.width;\r\n            },\r\n\r\n            /**\r\n             * Generates random number in the given range\r\n             * @returns Number\r\n             */\r\n            getRandomNumber(min, max) {\r\n                min = Math.ceil(min);\r\n                max = Math.floor(max);\r\n                return Math.floor(Math.random() * (max - min + 1)) + min;\r\n            },\r\n\r\n            /**\r\n             * Checks if the current line is the first\r\n             * @returns Boolean\r\n             */\r\n            isFirstLine() {\r\n                return !parseInt(this.lineIndex);\r\n            },\r\n\r\n            /**\r\n             * After all configuration was prepared apply them to the DOM\r\n             */\r\n            getStyles(index) {\r\n                let styles = {\r\n                    width: this.config.images[index].width + 'px',\r\n                    height: this.config.images[index].height + 'px',\r\n                    left: this.config.images[index].left + 'px',\r\n                    top: this.config.images[index].top + 'px'\r\n                };\r\n                styles = this.getGapStyles(styles, index);\r\n                return styles;\r\n            },\r\n\r\n            /**\r\n             * Sipecific styles for the gap between columns\r\n             * @return Object\r\n             */\r\n            getGapStyles(styles, index) {\r\n                if (validator.hasGap(this.options)) {\r\n                    for (let key in this.config.images[index][c.CONFIG_GAP_KEY]) {\r\n                        styles[key] = this.config.images[index][c.CONFIG_GAP_KEY][key]\r\n                    }\r\n                }\r\n\r\n                return styles;\r\n            },\r\n\r\n            /**\r\n             * Finds the tallest column and sets the height of the gallery\r\n             * That needs as an workaround to the css position absolute of\r\n             * the gallery wrapper\r\n             * @returns Number\r\n             */\r\n            setGalleryHeight() {\r\n                let columnsHeights = [];\r\n                let currentColumn = 0;\r\n                if (this.columnsAmount < 1) {\r\n                    this.columnsAmount = this.config.images.length;\r\n                }\r\n                for (let imageIndex in this.config.images) {\r\n                    let image = this.config.images[imageIndex];\r\n                    if (currentColumn >= this.columnsAmount) {\r\n                        currentColumn = 0;\r\n                    }\r\n                    if (!columnsHeights[currentColumn]) {\r\n                        columnsHeights[currentColumn] = 0;\r\n                    }\r\n                    columnsHeights[currentColumn] += image.height;\r\n                    currentColumn++;\r\n                }\r\n                for (let index in columnsHeights) {\r\n                    if (columnsHeights[index] > this.galleryHeight) {\r\n                        this.galleryHeight = columnsHeights[index];\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<template>\r\n    <div class=\"cgl-columns-block\"\r\n         :style=\"{ height: galleryHeight+'px' }\">\r\n        <div class=\"cgl-image-block\"\r\n             v-if=\"config.images[index]\"\r\n             :style=\"getStyles(index)\"\r\n             v-for=\"(image, index) in images\" >\r\n            <cgl-image :imagesData=\"image\"\r\n                       :config.sync=\"config\"\r\n                       :index=\"index\"\r\n                       v-slot:default=\"images\">\r\n                <slot v-bind:index=\"images.index\"></slot>\r\n            </cgl-image>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<style>\r\n    .cgl-columns-block{\r\n        -webkit-box-sizing: border-box;\r\n        -moz-box-sizing: border-box;\r\n        box-sizing: border-box;\r\n        width: 100%;\r\n        position: relative;\r\n    }\r\n    .cgl-image-block {\r\n        -webkit-box-sizing: border-box;\r\n        -moz-box-sizing: border-box;\r\n        box-sizing: border-box;\r\n        margin: 0;\r\n        padding: 0;\r\n        position: absolute;\r\n        left: 0;\r\n        top: 0;\r\n        border: 0px solid transparent;\r\n    }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  

  
  var CascadeGallery = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    browser,
    undefined
  );var script$4 = {
    name: c.LAYOUT_COMPONENT_NAME,
    components: (function(){
        let components = {};
        components[c.GALLERY_COMPONENT_NAME] = CascadeGallery;
        return components;
    })(),
    props: {
        images: { type: Array },
        config: {
            type: Object,
            validator: validator.validate
        }
    },
    data() {
        let default_config = {};
        // Set default width range
        default_config[c.CONFIG_WIDTH_RANGE_KEY] = {};
        default_config[c.CONFIG_WIDTH_RANGE_KEY][c.CONFIG_RANGE_KEY_FROM] = c.CONFIG_WIDTH_FROM;
        default_config[c.CONFIG_WIDTH_RANGE_KEY][c.CONFIG_RANGE_KEY_TO] = c.CONFIG_WIDTH_TO;
        // Set default height range
        default_config[c.CONFIG_HEIGHT_RANGE_KEY] = {};
        // Set default animation delay
        default_config[c.CONFIG_DELAY_KEY] = c.CONFIG_APPENDING_DELAY;
        // Set default animation range
        default_config[c.CONFIG_GAP_KEY] = c.CONFIG_GAP;
        return {
            default: default_config
        }
    },
    methods: {

        /**
         * Retrieve config from props or get defaults.
         * @returns Object
         */
        getConfig() {
            let config = {};
            config[c.CONFIG_WIDTH_RANGE_KEY] = this.getRangeFor(this.config, c.CONFIG_WIDTH_RANGE_KEY);
            config[c.CONFIG_HEIGHT_RANGE_KEY] = this.getRangeFor(this.config, c.CONFIG_HEIGHT_RANGE_KEY);
            config[c.CONFIG_DELAY_KEY] = this.getDelay();
            config[c.CONFIG_GAP_KEY] = this.getGap();
            return config;
        },

        /**
         * @returns Number
         */
        getDelay() {
            if (validator.hasDelay(this.config)) {
                return this.config[c.CONFIG_DELAY_KEY];
            }
            return this.default[c.CONFIG_DELAY_KEY];
        },

        /**
         * @returns Number
         */
        getGap() {
            if (validator.hasGap(this.config)) {
                return this.config[c.CONFIG_GAP_KEY];
            }
            return this.default[c.CONFIG_GAP_KEY];
        },

        /**
         * @param config
         * @param key Range option key
         * @returns Boolean
         */
        getRangeFor(config, key) {
            let hasRange = validator.hasRangesFor(config, key);
            let defaultRange = this.default[key];
            return hasRange ? config[key] : defaultRange;
        },

    }
};/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "cgl" }, [
    _c(
      "div",
      { staticClass: "cgl-wrapper" },
      [
        _c("cgl-gallery", {
          attrs: { images: _vm.images, options: _vm.getConfig() },
          on: {
            "update:images": function($event) {
              _vm.images = $event;
            }
          },
          scopedSlots: _vm._u(
            [
              {
                key: "default",
                fn: function(images) {
                  return [_vm._t("default", null, { index: images.index })]
                }
              }
            ],
            null,
            true
          )
        })
      ],
      1
    )
  ])
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var CascadeGallery$1 = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );return CascadeGallery$1;}));