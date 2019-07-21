## Cascade gallery
VueJs cascade gallery generates random sizes for images.

#### Installation
```javascript
npm install cascade-gallery
```

#### Usage
**• import cascade gallery**
```javascript
import YourRandomName from 'cascade-gallery'
```
```javascript
const CASCADE_GALLERY_COMPONENT_NAME = 'your-random-name';
...
```
**• declare cascade gallery in your component**
```javascript
components: (function(){
    let components = {};
    components[CASCADE_GALLERY_COMPONENT_NAME] = YourRandomName;
    return components;
})(),
...
```
**• prepare minimal configuration**
```javascript
config: [
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
]
```
**• invoke cascade gallery**
```javascript
<your-random-name :images="config"></your-random-name>
```

#### Configuration
TODO
