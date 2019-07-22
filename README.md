## Cascade gallery
VueJs cascade gallery generates random sizes for images.

### Dependencies
- VueJs 2.X

### Installation
```javascript
npm install cascade-gallery
```

### Usage
• import cascade gallery
```javascript
import CascadeGallery from 'cascade-gallery'
```
**• declare cascade gallery in your component**
```javascript
components: {
    'cascade-gallery': CascadeGallery
}
...
```
• prepare minimal configuration
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
• invoke cascade gallery
```javascript
<cascade-gallery :images="images"></cascade-gallery>
```

### Configuration

```javascript
<cascade-gallery :images="images" :config="config"></cascade-gallery>
```
```javascript
data() {
    return {
        images: {
           /**
            * each object must contain [src] property which is an array
            * of urls to the images.
            */
            {
                 src: [
                     'https://ibmachine.com/images/machine/87/7257/9004.jpg',
                     'https://ibmachine.com/images/machine/87/7257/3438.jpg',
                 ]
             },
            {
                 src: [
                     'https://ibmachine.com/images/machine/87/7257/9004.jpg',
                     'https://ibmachine.com/images/machine/87/7257/3438.jpg',
                 ]
             }
             ...
        },
        config: {
            
            /**
             * max and min for image width in pixels
             * min can't me bigger then max
             * the random number in between will be picked
             * both can be the same size
             * if it will be enough space to place last image after
             * all images will decay to min width last image will
             * take the width of the remained space.
             * defaults {max: 300, min: 200}
             */
            'width-range': {
                min: 250,
                max: 300
            },

            /**
             * max and min for image width in pixels (same as for width)
             *
             * for defaults is taken approximate image width for
             * the given (default) image min width and
             * sums it with it self fifth part.
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
             * milliseconds between loaded and for load images
             */
            'appending-delay': 150,
        
        }
    }
}
```

