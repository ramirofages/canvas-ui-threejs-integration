var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 60, 1, 0.1, 100 );

var renderer = new THREE.WebGLRenderer({antialias : true, alpha: true, canvas: document.getElementById("myCanvasTHREE")});

renderer.setSize( 512, 512  );
document.body.appendChild( renderer.domElement );

camera.position.z = 4;


var geometry = new THREE.BoxGeometry( 3, 3, 3 );
var material = new THREE.MeshBasicMaterial( );
var cube = new THREE.Mesh( geometry, material );

cube.rotateX(26 * Math.PI /180);
cube.rotateY(36 * Math.PI / 180);
scene.add( cube );


//#################################################################################
//#################################################################################

var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

var onError = function ( xhr ) {
  console.log("EXPLOTO");
};


var load_threejs_texture = function(url)
{
  var tex_loader = new THREE.TextureLoader().load(url, function(tex){
    material.map = tex;
    material.needsUpdate = true;

  }, onProgress, onError );
}


//#################################################################################
//#################################################################################
var three_canvas = document.getElementById("myCanvasTHREE");

var t_mouse_pos = function(e)
{
  var rect = three_canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  return new Vector2(x/three_canvas.width,y/three_canvas.height);
}

var t_mouse_down = false;
var t_current_mouse_p = new Vector2(0,0);
var t_last_mouse_p = new Vector2(0,0);

three_canvas.addEventListener('mousedown', function(e) {
  t_mouse_down = true;
  t_current_mouse_p = t_mouse_pos(e);
  t_last_mouse_p = t_mouse_pos(e);

});
three_canvas.addEventListener('mouseup', function(e) {
  t_mouse_down = false;
});
three_canvas.addEventListener('mousemove', function(e) {

  if(t_mouse_down)
  {

    t_last_mouse_p = t_current_mouse_p.copy();
    t_current_mouse_p = t_mouse_pos(e);

    var mouse_diff = t_current_mouse_p.sub(t_last_mouse_p);
    var rotation_speed = 128;
    cube.rotateOnAxis(new THREE.Vector3(0,1,0), mouse_diff.x * Math.PI / 180 * rotation_speed);
  }
});
var render = function () {

  requestAnimationFrame( render );
  renderer.render(scene, camera);


};

render();
