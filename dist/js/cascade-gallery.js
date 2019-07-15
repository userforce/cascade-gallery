(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=g||self,g.CascadeGallery=f());}(this,function(){'use strict';var script = {
    name: "cascade-gallery-image",
    props: {
        images: { type: Array },
        default_index: { type: Number },
        config: { type: Number }
    },
    data() {
        return {

        };
    },
    computed: {
        defaultIndex() {
            let index = parseInt(this.default_index);
            return !!index ? index : 0;
        }
    },
    mounted() {
        console.log(this.config);
    }
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
  return _c("div", { staticClass: "cascade-gallery-image" }, [
    _c("img", {
      style: { width: _vm.config.width + "px" },
      attrs: { src: _vm.images[_vm.defaultIndex] }
    })
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-1aad8471_0", { source: "\n.cascade-gallery-image[data-v-1aad8471] {\n    float: left;\n}\n", map: {"version":3,"sources":["/home/vagrant/code/vue-pakajes/src/js/components/Image.vue"],"names":[],"mappings":";AAgCA;IACA,WAAA;AACA","file":"Image.vue","sourcesContent":["<script>\r\n    export default {\r\n        name: \"cascade-gallery-image\",\r\n        props: {\r\n            images: { type: Array },\r\n            default_index: { type: Number },\r\n            config: { type: Number }\r\n        },\r\n        data() {\r\n            return {\r\n\r\n            };\r\n        },\r\n        computed: {\r\n            defaultIndex() {\r\n                let index = parseInt(this.default_index);\r\n                return !!index ? index : 0;\r\n            }\r\n        },\r\n        mounted() {\r\n            console.log(this.config);\r\n        }\r\n    }\r\n</script>\r\n\r\n<template>\r\n    <div class=\"cascade-gallery-image\">\r\n        <img :src=\"images[defaultIndex]\" v-bind:style=\"{width: config.width + 'px'}\"/>\r\n    </div>\r\n</template>\r\n\r\n<style scoped>\r\n    .cascade-gallery-image {\r\n        float: left;\r\n    }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-1aad8471";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var CascadeGalleryImage = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );var script$1 = {
    name: "cascade-gallery-small-template",
    components: {
        'cascade-gallery-image': CascadeGalleryImage
    },
    props: {
        images: { type: Array }
    },
    data() {
        return {
            ready: false,
            lastLineStartIndex: 0,
            currentImageIndex: 0,
            config: {
                maxWidth: 300,
                minWidth: 200,
                images: {}
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
        this.prepareImagesConfig();
    },
    methods: {
        prepareImagesConfig() {
            for(let index in this.images) {
                this.currentImageIndex = index;
                this.config.images[index] = {
                    width: this.getWidth()
                };
            }
            this.ready = true;
        },
        getWidth() {
            let width = this.getRandomNumber(this.config.minWidth, this.config.maxWidth);
            if(this.notEnoughSpaceInLine(width)) {
                this.adjustSiblingsWidth(width);
                this.lastLineStartIndex = parseInt(this.currentImageIndex) + 1;
            }
            return width;
        },
        getLineWidth() {
            let lineWidth = 0;
            for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                lineWidth += parseInt(this.config.images[index].width);
            }
            return lineWidth;
        },
        notEnoughSpaceInLine(width) {
            return this.getLineWidth() + width > this.window.width;
        },
        getLastImageBacklash() {
            return this.getRandomNumber(0, Math.round((this.config.minWidth/5)));
        },
        adjustSiblingsWidth(width) {
            let limit = 100;
            let iterator = 0;
            while (!this.aligned(width) && iterator < limit) {
                for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                    let mustDecay = this.config.images[index].width > this.config.minWidth;
                    let itemsCount = parseInt(this.currentImageIndex) - parseInt(this.lastLineStartIndex) - 1;
                    let diff = this.getLineLengthDiff(width) / itemsCount;
                    if(mustDecay) {
                        this.config.images[index].width = parseInt(this.config.images[index].width) - 1;
                    }
                    if (this.aligned(width)) {
                        break;
                    }
                }
                iterator++;
            }
        },
        aligned(width) {
            return width + this.getLineWidth() === parseInt(this.window.width);
        },
        getLineLengthDiff(width) {
            return (this.getLineWidth() + width) - this.window.width;
        },
        getRandomNumber(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
};/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._l(_vm.images, function(image, index) {
      return _vm.ready
        ? _c(
            "div",
            [
              _c("cascade-gallery-image", {
                attrs: {
                  images: image["src"],
                  default_index: image["default_index"],
                  config: _vm.config.images[index]
                }
              })
            ],
            1
          )
        : _vm._e()
    }),
    0
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SmallSizeTemplate = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );var script$2 = {
    components: {
        'small-template': SmallSizeTemplate
    },
    props: {
        images: { type: Array },
        size: { type: String }
    },
    data() {
        return {};
    },
    mounted() {
        console.log(this.size);
    }
};/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "cascade-gallery" }, [
    _vm.size == "small"
      ? _c(
          "div",
          { staticClass: "cascade-gallery-wrapper" },
          [_c("small-template", { attrs: { images: _vm.images } })],
          1
        )
      : _vm.size == "large"
      ? _c("div", { staticClass: "cascade-gallery-wrapper" }, [
          _vm._v("\n        large\n    ")
        ])
      : _c("div", { staticClass: "cascade-gallery-wrapper" }, [
          _vm._v("\n        medium\n    ")
        ])
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-4cc53838_0", { source: "\n.cascade-gallery[data-v-4cc53838] {\n    width: 1200px;\n    margin: 0 auto;\n}\n", map: {"version":3,"sources":["/home/vagrant/code/vue-pakajes/src/js/components/Layout.vue"],"names":[],"mappings":";AAkCA;IACA,aAAA;IACA,cAAA;AACA","file":"Layout.vue","sourcesContent":["<script>\r\n    import SmallSizeTemplate from './templates/SmallSizeTemplate.vue';\r\n    export default {\r\n        components: {\r\n            'small-template': SmallSizeTemplate\r\n        },\r\n        props: {\r\n            images: { type: Array },\r\n            size: { type: String }\r\n        },\r\n        data() {\r\n            return {};\r\n        },\r\n        mounted() {\r\n            console.log(this.size);\r\n        }\r\n    }\r\n</script>\r\n\r\n<template>\r\n    <div class=\"cascade-gallery\">\r\n        <div class=\"cascade-gallery-wrapper\" v-if=\"size == 'small'\">\r\n            <small-template :images=\"images\"></small-template>\r\n        </div>\r\n        <div class=\"cascade-gallery-wrapper\" v-else-if=\"size == 'large'\">\r\n            large\r\n        </div>\r\n        <div class=\"cascade-gallery-wrapper\" v-else>\r\n            medium\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<style scoped>\r\n    .cascade-gallery {\r\n        width: 1200px;\r\n        margin: 0 auto;\r\n    }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-4cc53838";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  

  
  var CascadeGallery = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    browser,
    undefined
  );return CascadeGallery;}));