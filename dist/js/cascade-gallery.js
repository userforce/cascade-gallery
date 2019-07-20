(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=g||self,g.CascadeGallery=f());}(this,function(){'use strict';var script = {
    name: "cascade-gallery-image",
    props: {
        images: { type: Array },
        defaultIndex: { type: Number },
        config: { type: Object },
        index: { type: Number }
    },
    data() {
        return {
            image: {
                element: null,
                styles: {
                    width: 'auto',
                    height: 'auto',
                    top: 0,
                    left: 0
                },
                classes: ['cascade-gallery-image-anim-hide']
            }
        };
    },
    methods: {
        loadConfig(event) {
            this.image.element = event.target;
            this.setImageStyles();
            this.waitPreviousImage();
        },
        waitPreviousImage() {
            let self = this;
            let waitForPrevious = setInterval(function() {
                if (self.previousImageLoaded()) {
                    self.showImage();
                    clearInterval(waitForPrevious);
                }
            }, 10);
        },
        showImage() {
            let self = this;
            self.animate();
            let waitForPrevious = setTimeout(function() {
                self.setLoaded();
            }, 170);
        },
        setLoaded() {
            this.config.images[this.index].loaded = true;
        },
        setImageStyles() {
            if(this.getImagePropHeight() < this.getWrapperWidth()) {
                this.image.styles.width = '100%';
                this.image.styles.top = '-'+(this.getImagePropWidth()-this.getWrapperHeight())/2+'px';
                return true;
            } else {
                this.image.styles.height = '100%';
                this.image.styles.left = '-'+(this.getImagePropHeight()-this.getWrapperWidth())/2+'px';
                return true;
            }
        },
        getImageHeight() {
            return this.image.element.offsetHeight;
        },
        getImageWidth() {
            return this.image.element.offsetWidth;
        },
        getWrapperHeight() {
            return this.config.images[this.index].height;
        },
        getWrapperWidth() {
            return this.config.images[this.index].width;
        },
        getImagePropHeight() {
            let diffHeightInPercentage = (100*this.getImageWidth())/this.getImageHeight();
            return this.getWrapperHeight()*diffHeightInPercentage/100;
        },
        getImagePropWidth() {
            let diffWidthInPercentage = (100*this.getImageHeight())/this.getImageWidth();
            return this.getWrapperWidth()*diffWidthInPercentage/100;
        },
        previousImageLoaded() {
            if (this.index == 0) {
                return true;
            }
            return this.config.images[this.index - 1].loaded;
        },
        animate() {
            this.image.classes.push('cascade-gallery-image-anim-fall');
        }
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
    _c("div", { staticClass: "cascade-gallery-image-wrapper" }, [
      _c("img", {
        class: this.image.classes,
        style: _vm.image.styles,
        attrs: {
          src: _vm.images[_vm.defaultIndex]
            ? _vm.images[_vm.defaultIndex]
            : _vm.images[0]
        },
        on: {
          load: function($event) {
            return _vm.loadConfig($event)
          }
        }
      })
    ])
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-3dbfc250_0", { source: "\n.cascade-gallery-image[data-v-3dbfc250] {\n    width: 100%;\n    height: 100%;\n}\n.cascade-gallery-image *[data-v-3dbfc250] {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\n.cascade-gallery-image .cascade-gallery-image-wrapper[data-v-3dbfc250] {\n    overflow: hidden;\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border: 5px solid transparent;\n}\n.cascade-gallery-image .cascade-gallery-image-wrapper img[data-v-3dbfc250] {\n    position: absolute;\n    height: 100%;\n}\n.cascade-gallery-image .cascade-gallery-image-wrapper img.cascade-gallery-image-anim-hide[data-v-3dbfc250] {\n    opacity: 0;\n}\n.cascade-gallery-image .cascade-gallery-image-wrapper img.cascade-gallery-image-anim-fall[data-v-3dbfc250] {\n    -webkit-transition: all .35s ease-in;\n    -moz-transition: all .35s ease-in;\n    -o-transition: all .35s ease-in;\n    transition: all .35s ease-in;\n    opacity: 1;\n}\n", map: {"version":3,"sources":["/home/vagrant/code/vue-pakajes/src/js/components/Image.vue"],"names":[],"mappings":";AAwGA;IACA,WAAA;IACA,YAAA;AACA;AACA;IACA,8BAAA;IACA,2BAAA;IACA,sBAAA;AACA;AACA;IACA,gBAAA;IACA,kBAAA;IACA,WAAA;IACA,YAAA;IACA,6BAAA;AACA;AACA;IACA,kBAAA;IACA,YAAA;AACA;AACA;IACA,UAAA;AACA;AACA;IACA,oCAAA;IACA,iCAAA;IACA,+BAAA;IACA,4BAAA;IACA,UAAA;AACA","file":"Image.vue","sourcesContent":["<script>\r\n    export default {\r\n        name: \"cascade-gallery-image\",\r\n        props: {\r\n            images: { type: Array },\r\n            defaultIndex: { type: Number },\r\n            config: { type: Object },\r\n            index: { type: Number }\r\n        },\r\n        data() {\r\n            return {\r\n                image: {\r\n                    element: null,\r\n                    styles: {\r\n                        width: 'auto',\r\n                        height: 'auto',\r\n                        top: 0,\r\n                        left: 0\r\n                    },\r\n                    classes: ['cascade-gallery-image-anim-hide']\r\n                }\r\n            };\r\n        },\r\n        methods: {\r\n            loadConfig(event) {\r\n                this.image.element = event.target;\r\n                this.setImageStyles();\r\n                this.waitPreviousImage();\r\n            },\r\n            waitPreviousImage() {\r\n                let self = this;\r\n                let waitForPrevious = setInterval(function() {\r\n                    if (self.previousImageLoaded()) {\r\n                        self.showImage();\r\n                        clearInterval(waitForPrevious);\r\n                    }\r\n                }, 10);\r\n            },\r\n            showImage() {\r\n                let self = this;\r\n                self.animate();\r\n                let waitForPrevious = setTimeout(function() {\r\n                    self.setLoaded();\r\n                }, 170);\r\n            },\r\n            setLoaded() {\r\n                this.config.images[this.index].loaded = true;\r\n            },\r\n            setImageStyles() {\r\n                if(this.getImagePropHeight() < this.getWrapperWidth()) {\r\n                    this.image.styles.width = '100%';\r\n                    this.image.styles.top = '-'+(this.getImagePropWidth()-this.getWrapperHeight())/2+'px';\r\n                    return true;\r\n                } else {\r\n                    this.image.styles.height = '100%';\r\n                    this.image.styles.left = '-'+(this.getImagePropHeight()-this.getWrapperWidth())/2+'px';\r\n                    return true;\r\n                }\r\n            },\r\n            getImageHeight() {\r\n                return this.image.element.offsetHeight;\r\n            },\r\n            getImageWidth() {\r\n                return this.image.element.offsetWidth;\r\n            },\r\n            getWrapperHeight() {\r\n                return this.config.images[this.index].height;\r\n            },\r\n            getWrapperWidth() {\r\n                return this.config.images[this.index].width;\r\n            },\r\n            getImagePropHeight() {\r\n                let diffHeightInPercentage = (100*this.getImageWidth())/this.getImageHeight();\r\n                return this.getWrapperHeight()*diffHeightInPercentage/100;\r\n            },\r\n            getImagePropWidth() {\r\n                let diffWidthInPercentage = (100*this.getImageHeight())/this.getImageWidth();\r\n                return this.getWrapperWidth()*diffWidthInPercentage/100;\r\n            },\r\n            previousImageLoaded() {\r\n                if (this.index == 0) {\r\n                    return true;\r\n                }\r\n                return this.config.images[this.index - 1].loaded;\r\n            },\r\n            animate() {\r\n                this.image.classes.push('cascade-gallery-image-anim-fall');\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<template>\r\n    <div class=\"cascade-gallery-image\">\r\n        <div class=\"cascade-gallery-image-wrapper\">\r\n            <img :src=\"images[defaultIndex]?images[defaultIndex]:images[0]\"\r\n                 :class=\"this.image.classes\"\r\n                 :style=\"image.styles\"\r\n                 @load=\"loadConfig($event)\"/>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<style scoped>\r\n    .cascade-gallery-image {\r\n        width: 100%;\r\n        height: 100%;\r\n    }\r\n    .cascade-gallery-image * {\r\n        -webkit-box-sizing: border-box;\r\n        -moz-box-sizing: border-box;\r\n        box-sizing: border-box;\r\n    }\r\n    .cascade-gallery-image .cascade-gallery-image-wrapper {\r\n        overflow: hidden;\r\n        position: relative;\r\n        width: 100%;\r\n        height: 100%;\r\n        border: 5px solid transparent;\r\n    }\r\n    .cascade-gallery-image .cascade-gallery-image-wrapper img {\r\n        position: absolute;\r\n        height: 100%;\r\n    }\r\n    .cascade-gallery-image .cascade-gallery-image-wrapper img.cascade-gallery-image-anim-hide {\r\n        opacity: 0;\r\n    }\r\n    .cascade-gallery-image .cascade-gallery-image-wrapper img.cascade-gallery-image-anim-fall {\r\n        -webkit-transition: all .35s ease-in;\r\n        -moz-transition: all .35s ease-in;\r\n        -o-transition: all .35s ease-in;\r\n        transition: all .35s ease-in;\r\n        opacity: 1;\r\n    }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-3dbfc250";
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
                maxWidth: 300,
                minWidth: 200,
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
        this.prepareImagesConfig();
    },
    watch: {
        images() {
            this.addNewImages();
            this.setGalleryHeight();
        }
    },
    methods: {
        prepareImagesConfig() {
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
        setNextImageConfig(index) {
            this.currentImageIndex = index;
            this.config.images[index] = {
                width: this.getWidth(),
                loaded: false
            };
            this.currentImageIndex = index;

            this.prepareCurrentLine();
        },
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
        addNewImages() {
            this.hasNewImages = true;
            this.newImagesStartIndex = this.currentImageIndex+1;
            this.prepareForNewImages();
            for ( let index = this.newImagesStartIndex; index < this.images.length; index++ ) {
                this.setNextImageConfig(index);
            }
            this.setGalleryHeight();
        },
        prepareForNewImages() {
            if (this.newImagesStartIndex%this.columnsAmount > 0) {
                this.lastLineStartIndex = this.previousLineStartIndex;
                this.previousLineStartIndex = this.lastLineStartIndex - this.columnsAmount;
                this.lineIndex--;
                this.isEndOfTheLine = false;
            }
        },
        getPositionX() {
            let posX = 0;
            if (this.currentImageIndex - this.lastLineStartIndex != 0) {
                let previousImage = this.config.images[this.currentImageIndex - 1];
                posX = previousImage.width + previousImage.left;
            }
            return posX;
        },
        getPositionY() {
            let posY = 0;
            if (!this.isFirstLine()) {
                let previousLineSibling = this.config.images[this.getPreviousLineSibling()];
                posY = previousLineSibling.height + previousLineSibling.top;
            }
            return posY;
        },
        getHeight() {
            return this.getRandomHeight();
        },
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
        getCurrentImageWidth() {
            let previousLineSibling = this.getPreviousLineSibling();
            return this.config.images[previousLineSibling].width;
        },
        getPreviousLineSibling() {
            return this.previousLineStartIndex + ( this.currentImageIndex - this.lastLineStartIndex );
        },
        getRandomWidth() {
            return this.getRandomNumber(this.config.minWidth, this.config.maxWidth);
        },
        getRandomHeight() {
            let approximateLineLength = Math.round((this.window.width/this.config.minWidth) * 10) / 10;
            let quarter = Math.round((this.window.width/approximateLineLength) * 10) / 10;
            return quarter + this.getBacklash(quarter)*2;
        },
        getLineWidth() {
            let lineWidth = 0;
            for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                lineWidth += parseInt(this.config.images[index].width);
            }
            return lineWidth;
        },
        notEnoughSpaceInLine(width) {
            return this.getLineWidth() + width + this.getBacklash(this.config.minWidth) > this.window.width;
        },
        getBacklash(size) {
            return this.getRandomNumber(0, Math.round((size/5)));
        },
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
        getLastPartWidth() {
            return this.window.width - this.getLineWidth()
        },
        isAligned(width) {
            return width + this.getLineWidth() === this.window.width;
        },
        getLineLengthDiff(width) {
            return (this.getLineWidth() + width) - this.window.width;
        },
        getRandomNumber(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        isFirstLine() {
            return !parseInt(this.lineIndex);
        },
        styles(index) {
            return {
                width: this.config.images[index].width + 'px',
                height: this.config.images[index].height + 'px',
                left: this.config.images[index].left + 'px',
                top: this.config.images[index].top + 'px'
            }
        },
        setGalleryHeight() {
            let columnsHeights = [];
            let currentColumn = 0;
            if (this.columnsAmount < 1) {
                this.columnsAmount = this.config.images.length;
            }
            console.log(this.config.images.length);
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
        },
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
    {
      staticClass: "cascade-gallery-columns-block",
      style: { height: _vm.galleryHeight + "px" }
    },
    _vm._l(_vm.images, function(image, index) {
      return _vm.config.images[index]
        ? _c(
            "div",
            {
              staticClass: "cascade-gallery-image-block",
              style: _vm.styles(index)
            },
            [
              _c("cascade-gallery-image", {
                attrs: {
                  images: image["src"],
                  config: _vm.config,
                  index: index,
                  defaultIndex: image["default_index"]
                },
                on: {
                  "update:images": function($event) {
                    return _vm.$set(image, "src", $event)
                  },
                  "update:config": function($event) {
                    _vm.config = $event;
                  }
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
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-5ed0c712_0", { source: "\n.cascade-gallery-columns-block[data-v-5ed0c712]{\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    width: 100%;\n    position: relative;\n}\n.cascade-gallery-image-block[data-v-5ed0c712] {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    position: absolute;\n    overflow: hidden;\n}\n", map: {"version":3,"sources":["/home/vagrant/code/vue-pakajes/src/js/components/templates/SmallSizeTemplate.vue"],"names":[],"mappings":";AA0QA;IACA,8BAAA;IACA,2BAAA;IACA,sBAAA;IACA,WAAA;IACA,kBAAA;AACA;AACA;IACA,8BAAA;IACA,2BAAA;IACA,sBAAA;IACA,SAAA;IACA,UAAA;IACA,kBAAA;IACA,gBAAA;AACA","file":"SmallSizeTemplate.vue","sourcesContent":["<script>\r\n    import CascadeGalleryImage from '../Image.vue';\r\n    export default {\r\n        name: \"cascade-gallery-small-template\",\r\n        components: {\r\n            'cascade-gallery-image': CascadeGalleryImage\r\n        },\r\n        props: {\r\n            images: { type: Array }\r\n        },\r\n        data() {\r\n            return {\r\n                galleryHeight: 0,\r\n                lineIndex: 0,\r\n                columnsAmount: 0,\r\n                previousLineStartIndex: 0,\r\n                lastLineStartIndex: 0,\r\n                currentImageIndex: 0,\r\n                isEndOfTheLine: false,\r\n                hasNewImages: false,\r\n                newImagesStartIndex: 0,\r\n                firstLineIsNotComplete: true,\r\n                config: {\r\n                    maxWidth: 300,\r\n                    minWidth: 200,\r\n                    images: [],\r\n                },\r\n                window: {\r\n                    width: 0,\r\n                    height: 0\r\n                }\r\n            };\r\n        },\r\n        mounted() {\r\n            this.window.width = this.$el.parentNode.offsetWidth;\r\n            this.window.height = this.$el.parentNode.offsetHeight;\r\n            this.prepareImagesConfig();\r\n        },\r\n        watch: {\r\n            images() {\r\n                this.addNewImages();\r\n                this.setGalleryHeight()\r\n            }\r\n        },\r\n        methods: {\r\n            prepareImagesConfig() {\r\n                for(let index in this.images) {\r\n                    this.setNextImageConfig(index);\r\n                }\r\n                let firstLineIsNotComplete = this.getLineWidth() < this.window.width && this.lineIndex < 1;\r\n                if(firstLineIsNotComplete) {\r\n                    let index = this.currentImageIndex;\r\n                    let limit = 5;\r\n                    let start = 0;\r\n                    while (this.firstLineIsNotComplete) {\r\n                        index++;\r\n                        this.setNextImageConfig(index);\r\n                        start++;\r\n                        if (start > limit) {\r\n                            break;\r\n                        }\r\n                    }\r\n                }\r\n                this.setGalleryHeight();\r\n            },\r\n            setNextImageConfig(index) {\r\n                this.currentImageIndex = index;\r\n                this.config.images[index] = {\r\n                    width: this.getWidth(),\r\n                    loaded: false\r\n                };\r\n                this.currentImageIndex = index;\r\n\r\n                this.prepareCurrentLine();\r\n            },\r\n            prepareCurrentLine() {\r\n                let startIndex = this.lastLineStartIndex;\r\n                if(this.isEndOfTheLine) {\r\n                    for(let index = startIndex; index < this.config.images.length; index++) {\r\n                        if (this.hasNewImages) {\r\n                            index = this.newImagesStartIndex;\r\n                            this.hasNewImages = false;\r\n                        }\r\n                        this.currentImageIndex = index;\r\n                        this.config.images[index].height = this.getHeight();\r\n                        this.config.images[index].left = this.getPositionX();\r\n                        this.config.images[index].top = this.getPositionY();\r\n                    }\r\n                    this.previousLineStartIndex = this.lastLineStartIndex;\r\n                    this.lastLineStartIndex = this.currentImageIndex + 1;\r\n                    this.lineIndex++;\r\n                    this.isEndOfTheLine = false;\r\n                }\r\n            },\r\n            addNewImages() {\r\n                this.hasNewImages = true;\r\n                this.newImagesStartIndex = this.currentImageIndex+1;\r\n                this.prepareForNewImages();\r\n                for ( let index = this.newImagesStartIndex; index < this.images.length; index++ ) {\r\n                    this.setNextImageConfig(index);\r\n                }\r\n                this.setGalleryHeight();\r\n            },\r\n            prepareForNewImages() {\r\n                if (this.newImagesStartIndex%this.columnsAmount > 0) {\r\n                    this.lastLineStartIndex = this.previousLineStartIndex;\r\n                    this.previousLineStartIndex = this.lastLineStartIndex - this.columnsAmount;\r\n                    this.lineIndex--;\r\n                    this.isEndOfTheLine = false;\r\n                }\r\n            },\r\n            getPositionX() {\r\n                let posX = 0;\r\n                if (this.currentImageIndex - this.lastLineStartIndex != 0) {\r\n                    let previousImage = this.config.images[this.currentImageIndex - 1];\r\n                    posX = previousImage.width + previousImage.left;\r\n                }\r\n                return posX;\r\n            },\r\n            getPositionY() {\r\n                let posY = 0;\r\n                if (!this.isFirstLine()) {\r\n                    let previousLineSibling = this.config.images[this.getPreviousLineSibling()];\r\n                    posY = previousLineSibling.height + previousLineSibling.top;\r\n                }\r\n                return posY;\r\n            },\r\n            getHeight() {\r\n                return this.getRandomHeight();\r\n            },\r\n            getWidth() {\r\n                let width = this.getRandomWidth();\r\n                this.isEndOfTheLine = false;\r\n                if (!this.isFirstLine()) {\r\n                    this.columnsAmount = this.lastLineStartIndex - this.previousLineStartIndex;\r\n                    let previousLineSibling = this.config.images[this.getPreviousLineSibling()];\r\n                    width = previousLineSibling.width;\r\n                    let length = this.lastLineStartIndex - this.previousLineStartIndex;\r\n                    this.isEndOfTheLine = this.currentImageIndex == (length - 1) + this.lastLineStartIndex\r\n                        || this.currentImageIndex == this.images.length - 1;\r\n                    return width;\r\n                } else if(this.notEnoughSpaceInLine(width)) {\r\n                    this.isEndOfTheLine = true;\r\n                    this.firstLineIsNotComplete = false;\r\n                    return this.adjustSiblingsWidth(width);\r\n                }\r\n                return width;\r\n            },\r\n            getCurrentImageWidth() {\r\n                let previousLineSibling = this.getPreviousLineSibling();\r\n                return this.config.images[previousLineSibling].width;\r\n            },\r\n            getPreviousLineSibling() {\r\n                return this.previousLineStartIndex + ( this.currentImageIndex - this.lastLineStartIndex );\r\n            },\r\n            getRandomWidth() {\r\n                return this.getRandomNumber(this.config.minWidth, this.config.maxWidth);\r\n            },\r\n            getRandomHeight() {\r\n                let approximateLineLength = Math.round((this.window.width/this.config.minWidth) * 10) / 10;\r\n                let quarter = Math.round((this.window.width/approximateLineLength) * 10) / 10;\r\n                return quarter + this.getBacklash(quarter)*2;\r\n            },\r\n            getLineWidth() {\r\n                let lineWidth = 0;\r\n                for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {\r\n                    lineWidth += parseInt(this.config.images[index].width);\r\n                }\r\n                return lineWidth;\r\n            },\r\n            notEnoughSpaceInLine(width) {\r\n                return this.getLineWidth() + width + this.getBacklash(this.config.minWidth) > this.window.width;\r\n            },\r\n            getBacklash(size) {\r\n                return this.getRandomNumber(0, Math.round((size/5)));\r\n            },\r\n            adjustSiblingsWidth(width) {\r\n                let limit = parseInt(this.config.maxWidth);\r\n                let iterator = 0;\r\n                while (!this.isAligned(width) && iterator < limit) {\r\n                    for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {\r\n                        let mustDecay = this.config.images[index].width > this.config.minWidth;\r\n                        if(mustDecay) {\r\n                            this.config.images[index].width = parseInt(this.config.images[index].width) - 1;\r\n                        }\r\n                        let limitReached = iterator === limit - 1;\r\n                        if (limitReached) {\r\n                            return this.getLastPartWidth();\r\n                        }\r\n                        if (this.isAligned(width)) {\r\n                            return width;\r\n                        }\r\n                    }\r\n                    iterator++;\r\n                }\r\n            },\r\n            getLastPartWidth() {\r\n                return this.window.width - this.getLineWidth()\r\n            },\r\n            isAligned(width) {\r\n                return width + this.getLineWidth() === this.window.width;\r\n            },\r\n            getLineLengthDiff(width) {\r\n                return (this.getLineWidth() + width) - this.window.width;\r\n            },\r\n            getRandomNumber(min, max) {\r\n                min = Math.ceil(min);\r\n                max = Math.floor(max);\r\n                return Math.floor(Math.random() * (max - min + 1)) + min;\r\n            },\r\n            isFirstLine() {\r\n                return !parseInt(this.lineIndex);\r\n            },\r\n            styles(index) {\r\n                return {\r\n                    width: this.config.images[index].width + 'px',\r\n                    height: this.config.images[index].height + 'px',\r\n                    left: this.config.images[index].left + 'px',\r\n                    top: this.config.images[index].top + 'px'\r\n                }\r\n            },\r\n            setGalleryHeight() {\r\n                let columnsHeights = [];\r\n                let currentColumn = 0;\r\n                if (this.columnsAmount < 1) {\r\n                    this.columnsAmount = this.config.images.length;\r\n                }\r\n                console.log(this.config.images.length);\r\n                for (let imageIndex in this.config.images) {\r\n                    let image = this.config.images[imageIndex];\r\n                    if (currentColumn >= this.columnsAmount) {\r\n                        currentColumn = 0;\r\n                    }\r\n                    if (!columnsHeights[currentColumn]) {\r\n                        columnsHeights[currentColumn] = 0;\r\n                    }\r\n                    columnsHeights[currentColumn] += image.height;\r\n                    currentColumn++;\r\n                }\r\n                for (let index in columnsHeights) {\r\n                    if (columnsHeights[index] > this.galleryHeight) {\r\n                        this.galleryHeight = columnsHeights[index];\r\n                    }\r\n                }\r\n            },\r\n        }\r\n    }\r\n</script>\r\n\r\n<template>\r\n    <div class=\"cascade-gallery-columns-block\"\r\n         :style=\"{ height: galleryHeight+'px' }\">\r\n        <div class=\"cascade-gallery-image-block\"\r\n             v-if=\"config.images[index]\"\r\n             :style=\"styles(index)\"\r\n             v-for=\"(image, index) in images\" >\r\n            <cascade-gallery-image :images.sync=\"image['src']\"\r\n                                   :config.sync=\"config\"\r\n                                   :index=\"index\"\r\n                                   :defaultIndex=\"image['default_index']\">\r\n            </cascade-gallery-image>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<style scoped>\r\n    .cascade-gallery-columns-block{\r\n        -webkit-box-sizing: border-box;\r\n        -moz-box-sizing: border-box;\r\n        box-sizing: border-box;\r\n        width: 100%;\r\n        position: relative;\r\n    }\r\n    .cascade-gallery-image-block {\r\n        -webkit-box-sizing: border-box;\r\n        -moz-box-sizing: border-box;\r\n        box-sizing: border-box;\r\n        margin: 0;\r\n        padding: 0;\r\n        position: absolute;\r\n        overflow: hidden;\r\n    }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-5ed0c712";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  

  
  var SmallSizeTemplate = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    browser,
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
          [
            _c("small-template", {
              attrs: { images: _vm.images },
              on: {
                "update:images": function($event) {
                  _vm.images = $event;
                }
              }
            })
          ],
          1
        )
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-3b66040e_0", { source: "\n.cascade-gallery-wrapper[data-v-3b66040e] {\n}\n", map: {"version":3,"sources":["/home/vagrant/code/vue-pakajes/src/js/components/Layout.vue"],"names":[],"mappings":";AAyBA;AACA","file":"Layout.vue","sourcesContent":["<script>\r\n    import SmallSizeTemplate from './templates/SmallSizeTemplate.vue';\r\n    export default {\r\n        components: {\r\n            'small-template': SmallSizeTemplate\r\n        },\r\n        props: {\r\n            images: { type: Array },\r\n            size: { type: String }\r\n        },\r\n        data() {\r\n            return {};\r\n        }\r\n    }\r\n</script>\r\n\r\n<template>\r\n    <div class=\"cascade-gallery\">\r\n        <div class=\"cascade-gallery-wrapper\" v-if=\"size == 'small'\">\r\n            <small-template :images.sync=\"images\"></small-template>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<style scoped>\r\n    .cascade-gallery-wrapper {\r\n    }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-3b66040e";
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