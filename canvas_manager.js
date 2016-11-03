var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
context.rect(0, 0, canvas.width, canvas.height);


function Vector2(x,y)
{
  this.x = x;
  this.y = y;
}
Vector2.prototype.add = function(vec)
{
  return new Vector2(this.x + vec.x,this.y + vec.y);
}
Vector2.prototype.sub = function(vec)
{
  return new Vector2(this.x - vec.x,this.y - vec.y);
}

function Sticker(x, y, w, h, rot_deg, img_url) {
  this.x = x || 0;
  Sticker.c = 6;
  this.y = y || 0;
  this.width = w || 100;
  this.height = h || 100;
  this.rot_deg = rot_deg || 0;
  this.image = new Image();
  var instance = this;

  this.image.onload = function() {
    draw_scene();
  };

  this.image.src = img_url;
}

Sticker.prototype.rotate = function (degrees)
{
  this.rot_deg += degrees;
};
Sticker.prototype.draw = function ()
{
  context.save();
  var pos = this.position();
  context.translate(pos.x, pos.y);
  context.rotate(this.rot_deg * Math.PI /180);
  context.drawImage(this.image, 0 - this.width/2, 0 - this.height/2, this.width, this.height);
  context.restore();
};
Sticker.prototype.position = function ()
{
  return new Vector2(this.x + this.width/2, this.y + this.height /2);
};
Sticker.prototype.set_position = function( new_pos)
{
  this.x = new_pos.x - this.width/2;
  this.y = new_pos.y - this.height/2;
}
Sticker.prototype.contains = function(point)
{
  return ( point.x > this.x &&
           point.x < this.x + this.width &&
           point.y > this.y &&
           point.y < this.y + this.height
   );

};




var mouse_pos = new Vector2(0,0);
var mouse_down = false;
var mouse_offset = new Vector2(0,0);
var m_pos = function(e)
{
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  return new Vector2(x,y);
}
function draw_scene()
{
  context.clearRect(0, 0, 512, 512);
  stick.draw();
  circle.draw();

}
canvas.addEventListener('mousedown', function(e) {
  if(circle.contains(m_pos(e)))
  {
    mouse_down = true;
    mouse_pos = new Vector2(m_pos(e).x, m_pos(e).y);
    mouse_offset = circle.position().sub(mouse_pos);

    circle.set_position(mouse_pos.add(mouse_offset));

    draw_scene();
  }
});
canvas.addEventListener('mouseup', function(e) {

  mouse_down=false;
  load_threejs_texture(canvas.toDataURL());

});
canvas.addEventListener('mousemove', function(e) {
  if(mouse_down)
  {
    circle.set_position(m_pos(e).add(mouse_offset));
    draw_scene();

  }
});


var stick = new Sticker(0,0, 512, 512, 0, 'kartStickers.jpg');
var circle = new Sticker(10,10, 128,128, 0, 'red_circle.png');
