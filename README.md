## Cascade gallery
VueJs image gallery which randomizes image sizes in the given range on each load.

![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/userforce/cascade-gallery/master/package.json&label=name&query=$.name&color=blue)
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/userforce/cascade-gallery/master/package.json&label=version&query=$.version&color=blue)
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/userforce/cascade-gallery/master/package.json&label=license&query=$.license&color=lightgrey)
![version](https://img.shields.io/badge/build-passing-green)
![version](https://david-dm.org/userforce/cascade-gallery.svg)
![version](https://img.shields.io/npm/dt/cascade-gallery)
- [Example](https://userforce.github.io/cascade-gallery/example/)
- [Example config](https://github.com/userforce/cascade-gallery/blob/master/example/index.html#L128)
### Dependencies
- VueJs 2.X

### Installation
```javascript
npm install cascade-gallery
```

### Usage
Import cascade gallery
```javascript
import CascadeGallery from 'cascade-gallery'
```
Declare cascade gallery in your component
```javascript
components: {
    'cascade-gallery': CascadeGallery
}
...
```
Minimal configuration
```javascript
images: [
    {
        src: [
            'https://ibmachine.com/images/machine/87/7257/9004.jpg',
            'https://ibmachine.com/images/machine/87/7257/3438.jpg',
        ]
    }
    ...
]
```
Invoke cascade gallery
```javascript
<cascade-gallery :images="images"></cascade-gallery>
```

### Configuration

```javascript
<cascade-gallery :images="images" :config="config"></cascade-gallery>
```

Each object must contain src property which is an array of urls to the images.
Also you can set additional data that can be used within solts to embed additional content.

```javascript
images: {
    {
         src: [
             'https://ibmachine.com/images/machine/87/7257/9004.jpg',
             'https://ibmachine.com/images/machine/87/7257/3438.jpg',
         ],
         mydata: {
             'my-custom-data-1': 'Hello',
             'my-custom-data-2': true
         }
     },
    {
         src: [
             'https://ibmachine.com/images/machine/87/7257/9004.jpg',
             'https://ibmachine.com/images/machine/87/7257/3438.jpg',
         ],
         mydata: {
             'my-custom-data-1': 'World!',
             'my-custom-data-2': false
         }
     }
     ...
}

config: {
    
    /**
     * Images width range
     */
    'width-range': {
        min: 250,
        max: 300
    },

    /**
     * Images height range
     */
    'height-range': {
        min: 200,
        max: 250
    },

    /**
     * Gap in between a columns in pixels
     */
    'gap': 5,

    /**
     * Milliseconds between images displaying
     */
    'appending-delay': 150,

}
```

### Content customization

If you want to embed custom content into the image block you can use default Vue slots approach.
Use ```v-slot:default="image"``` property to get access to the each image configuration.


**TODO:** Customize image content as well as modal content

```javascript
<cascade-gallery v-slot:default="image">
    {{ images[image.index].mydata['my-custom-data-1'] }}
    {{ images[image.index].mydata['my-custom-data-2'] ? 'Check Configuration! =]' : '' }}
```

You can replace ```mydata```  with any name you wish to use.