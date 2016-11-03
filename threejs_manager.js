var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 60, 1, 0.1, 100 );

var renderer = new THREE.WebGLRenderer({antialias : true, alpha: true, canvas: document.getElementById("myCanvasTHREE")});

renderer.setSize( 512, 512  );
document.body.appendChild( renderer.domElement );

camera.position.set(0,0,30);
camera.position.z = 5;


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
var render = function () {

  requestAnimationFrame( render );
  renderer.render(scene, camera);
};

render();
