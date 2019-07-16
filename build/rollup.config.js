import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/js/index.js',
    output: {
        format: 'umd',
        file: 'dist/js/cascade-gallery.js',
        compact: true,
        name: 'CascadeGallery',
    },
    plugins: [
        commonjs(),
        vue()
    ],
}