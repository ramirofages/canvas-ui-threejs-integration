var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
context.rect(0, 0, canvas.width, canvas.height);


var mouse_pos = new Vector2(0,0);
var mouse_pos_ctrl = new Vector2(0,0);
var mouse_down = false;
var mouse_down_ctrl = false;
var mouse_offset = new Vector2(0,0);
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

    mouse_down_ctrl = true;
    mouse_pos = new Vector2(m_pos(e).x, m_pos(e).y);
    mouse_pos_ctrl = new Vector2(m_pos(e).x, m_pos(e).y);
    mouse_offset = monster.position().sub(mouse_pos);
    return;
  }
  if(monster.contains(m_pos(e)))
  {
    mouse_down = true;
    mouse_pos = new Vector2(m_pos(e).x, m_pos(e).y);
    mouse_offset = monster.position().sub(mouse_pos);

    monster.set_position(mouse_pos.add(mouse_offset));

    draw_scene();
  }
});
canvas.addEventListener('mouseup', function(e) {
  active_controller = null;
  mouse_down=false;
  mouse_down_ctrl = false;
  draw_scene(false);
  load_threejs_texture(canvas.toDataURL());
  draw_scene();


});
canvas.addEventListener('mousemove', function(e) {

  if(mouse_down_ctrl)
  {

    var current_mouse_pos = m_pos(e);
    active_controller.update(mouse_pos_ctrl, current_mouse_pos)

    // var mouse_diff = current_mouse_pos.sub(mouse_pos_ctrl);
    // var mouse_positive = (mouse_diff.y > 0)? 1:-1;
    // var mouse_delta = current_mouse_pos.distance(mouse_pos_ctrl);
    // monster.set_rotation(mouse_delta * mouse_positive);
    draw_scene();

  }
  if(mouse_down)
  {

    monster.set_position(m_pos(e).add(mouse_offset));
    draw_scene();
  }
});

var background = new Image();
background.src = 'kartStickers.jpg';
var monster = new Sticker(new Vector2(30,30), new Vector2(128,128), 'calcomania.jpg');
