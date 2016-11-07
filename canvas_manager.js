var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
context.rect(0, 0, canvas.width, canvas.height);


var mouse_down_ctrl = false;
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
  var show_ctrl = false;
  if(show_controllers == null)
    show_ctrl = true;
  else
    show_ctrl = show_controllers;

  context.clearRect(0, 0, 512, 512);
  if(background.complete)
    context.drawImage(background, 0 , 0 , 512, 512);
  monster.draw(show_ctrl);
}

canvas.addEventListener('mousedown', function(e) {

  if(monster.contains_controller(m_pos(e)))
  {

    active_controller = monster.get_controller(m_pos(e));
    active_controller.init(new Vector2(m_pos(e).x, m_pos(e).y));
    mouse_down_ctrl = true;
  }

});
canvas.addEventListener('mouseup', function(e) {
  mouse_down_ctrl = false;
  draw_scene(false);
  load_threejs_texture(canvas.toDataURL());
  draw_scene();


});
canvas.addEventListener('mousemove', function(e) {

  if(mouse_down_ctrl)
  {

    var current_mouse_pos = m_pos(e);
    active_controller.update(current_mouse_pos);

    draw_scene();

  }

});


var background = new Image();
background.src = 'kartStickers.jpg';
var monster = new Sticker(new Vector2(80,80), new Vector2(128,128), 'calcomania.jpg');
