# Pageloader SVG performance testing
This is a standard (empty) template for using webpack (with live reload) with babel-loader and SASS loader.

## Why this
Within wirelab we make use of pageloaders for some websites to create a nice effect when opening the page for the first time

## Summary
The slow down is caused, according to my testing, by the fill rate of the browser/device. This means: More pixels = less frames. But, the browser doesn't have to redraw everything everytime if we use the right svg's. 

In short:
 * __If you can, reduce the size of your SVG's and especially reduce the size of all the 'large' parts__. Reducing the size of your SVG (actual pixel size) by two can already increase the performance 4 times. If you remove backgrounds or other large bits you can improve the performance much, much more.
 * __Use static backgrounds__. Try and always use static (or no) backgrounds whenever possible to avoid having to redraw the background.
 * __Use clip path instead of mask whenever possible__. Clip path is pretty fast as long as you use just one node in your clip path. It is 
 * __Avoid using masks__. If at all possible, try and avoid masks. They are slow. A lot of things where you use masks can also be achieved by using clip path. 


## Mask vs Clipping path
This is just conjecture, but my hypothesis is: 
 * __The mask has to render a grayscale image at the very least__. This is already slower than rendering a black white (visible invisible) only clipping path. 
 * __The clipping path can make use of GPU features__. The GPU has stencil buffers for example, which is very fast for clipping features (exactly the goal for this) 
 * __Masks have to enable alpha blending__. Because masks use grayscale they have to also be able to blend in with the background. So a grayscale has to blend the foreground pixel with the background. This also might cause something else:
 * __No concurrency possible__. If you use blending (which masks _need_) you have to draw from bottom to top (otherwise you can't blend :') ). This means you can't draw masked things to textures at the same time, you have to wait for one to finish before drawing the other one.

## Examples
A few examples of SVG's and code that is fast or slow

### Example 1
This example below is pretty fast, even when stretching acros your entire window.

__GOOD__
```HTML
<svg viewbox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
   
   <clipPath id="clip-test">
      <circle cx="50" cy="50" r="10" fill="black">
   </clipPath>
   
   <rect width="100" height="50" fill="#6d6bdb" clip-path="url(#clip-test)"/>
   <rect y="50" width="100" height="50" fill="#a31f6c" clip-path="url(#clip-test)"/>
</svg>
```
If you animate either the circle, rectangles or both it works almost without problems.

__BAD__
```HTML
<svg viewbox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
   
   <mask id="mask-test">
      <rect width="100" height="100" fill="black">
      <circle cx="50" cy="50" r="10" fill="white">
   </mask>
   
   <rect width="100" height="50" fill="#6d6bdb" mask="url(#mask-test)"/>
   <rect y="50" width="100" height="50" fill="#a31f6c" mask="url(#mask-test)"/>
</svg>
```
The resulting SVG is basically exactly the same, but the performance if vastly different. 
