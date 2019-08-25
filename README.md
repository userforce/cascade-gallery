## Cascade gallery
VueJs cascade gallery generates random sizes for images.

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

