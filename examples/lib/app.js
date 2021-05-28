const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// distable context menu
window.addEventListener('contextmenu', (evt) => { evt.preventDefault(); });

const callbacks = [ ];
const onUpdate = function(fn) {
    callbacks.push(fn);
};

// last frame time
let lastTime = 0;

// update function to call on every frame
function update(time) {
    requestAnimationFrame(update);

    const elapsed = time - lastTime;
    const dt = elapsed / 1000.0;
    lastTime = time;

    // resize canvas to fullscreen
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    for(let i = 0; i < callbacks.length; i++) {
        callbacks[i](dt);
    }
}
requestAnimationFrame(update);

export { canvas, ctx, onUpdate };
