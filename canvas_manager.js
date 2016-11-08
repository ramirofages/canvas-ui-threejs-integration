var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
context.rect(0, 0, canvas.width, canvas.height);


var offscreen_canvas = document.getElementById('offscreen_canvas');
var offscreen_context = offscreen_canvas.getContext('2d');
context.rect(0, 0, offscreen_canvas.width, offscreen_canvas.height);


var canvas_scene = new CanvasScene();

var active_controller = null;


var normalized_mouse_pos = function(e)
{
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  return new Vector2(x/canvas.width,y/canvas.height);
}

function draw_scene(show_controllers)
{

  context.clearRect(0, 0, canvas.width, canvas.height);
  offscreen_context.clearRect(0,0, offscreen_canvas.width, offscreen_canvas.height)

  if(background.complete)
  {
    context.drawImage(background, 0 , 0 , canvas.width, canvas.height);
    offscreen_context.drawImage(background, 0 , 0 , offscreen_canvas.width, offscreen_canvas.height)
  }

  canvas_scene.draw(context, true, 4);
  canvas_scene.draw(offscreen_context, true, 1);


}

canvas.addEventListener('mousedown', function(e) {
  active_controller = canvas_scene.get_active_controller(m_pos(e), canvas);

  if(active_controller !== null)
  {
    active_controller.init(normalized_mouse_pos(e));
  }

});
canvas.addEventListener('mouseup', function(e) {
  active_controller = null;
  draw_scene(false);
  load_threejs_texture(offscreen_canvas.toDataURL());

  draw_scene();


});
canvas.addEventListener('mousemove', function(e) {

  if(active_controller !== null)
  {
    active_controller.update(normalized_mouse_pos(e));
    draw_scene();
  }

});


var background = new Image();
background.src = 'kartStickers.jpg';
canvas_scene.add_sticker (new Sticker(new Vector2(0.5,0.5), 'calcomania.jpg'));

//###############################             ##############################//
//############################### FILE UPLOAD ##############################//
//###############################             ##############################//

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){

      canvas_scene.add_sticker (new Sticker(new Vector2(0.5,0.5), event.target.result));

    }
    reader.readAsDataURL(e.target.files[0]);
}
var input = document.createElement('input');
input.type ="file";
document.getElementById('body').appendChild(input);
input.addEventListener('change', handleImage, false);
