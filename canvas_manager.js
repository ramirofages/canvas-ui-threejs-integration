var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
context.rect(0, 0, canvas.width, canvas.height);

var canvas_scene = new CanvasScene(canvas.width, canvas.height);

var active_controller = null;

var m_pos = function(e)
{
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  return new Vector2(x,y);
}

function draw_scene(show_controllers)
{

  context.clearRect(0, 0, 512, 512);
  if(background.complete)
    context.drawImage(background, 0 , 0 , 512, 512);

  canvas_scene.draw();
}

canvas.addEventListener('mousedown', function(e) {
  active_controller = canvas_scene.get_active_controller(m_pos(e));

  if(active_controller !== null)
  {
    active_controller.init(new Vector2(m_pos(e).x, m_pos(e).y));

  }

});
canvas.addEventListener('mouseup', function(e) {
  active_controller = null;
  draw_scene(false);
  load_threejs_texture(canvas.toDataURL());
  draw_scene();


});
canvas.addEventListener('mousemove', function(e) {

  if(active_controller !== null)
  {
    var current_mouse_pos = m_pos(e);
    active_controller.update(current_mouse_pos);

    draw_scene();

  }

});


var background = new Image();
background.src = 'kartStickers.jpg';
canvas_scene.add_sticker (new Sticker(new Vector2(80,80), new Vector2(128,128), 'calcomania.jpg'));
canvas_scene.add_sticker (new Sticker(new Vector2(150,180), new Vector2(128,128), 'car.png'));


var upload_image = function(){

  function handleImage(e){
      var reader = new FileReader();
      console.log(e);
      reader.readAsDataURL(e.target.files[0]);
  }
  var input = document.createElement('input');
  input.type ="file";

  input.addEventListener('change', handleImage, false);
  input.click( );
}
upload_image();
