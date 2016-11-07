function CanvasElement(x, y, w, h, rot_deg, img_url) {
  this.x = x - w/2;

  this.y = y - h/2;
  this.width = w;
  this.height = h;
  this.rot_deg = rot_deg || 0;
  this.scale = 1;
  this.image = new Image();

  var instance = this;

  this.image.onload = function() {
    draw_scene();
  };

  this.image.src = img_url;

}

CanvasElement.prototype.rotate = function (degrees)
{
  this.rot_deg += degrees;
};
CanvasElement.prototype.draw = function ()
{
  context.save();
  var pos = this.position();
  context.translate(pos.x, pos.y);
  context.rotate(this.rot_deg * Math.PI /180);
  if(this.image.complete)
    context.drawImage(this.image, 0 - this.img_size().x/2, 0 - this.img_size().y/2, this.img_size().x, this.img_size().y);

  context.restore();
};
CanvasElement.prototype.img_size = function()
{
  return new Vector2(this.scale * this.width, this.scale * this.height);
}
CanvasElement.prototype.position = function ()
{
  return new Vector2(this.x + this.img_size().x/2, this.y + this.img_size().y /2);
};
CanvasElement.prototype.set_position = function( new_pos)
{
  this.x = new_pos.x - this.img_size().x/2;
  this.y = new_pos.y - this.img_size().y/2;
}
CanvasElement.prototype.set_scale = function ( scale )
{
  this.scale = scale;
}
CanvasElement.prototype.contains = function(point)
{

  return ( point.x > this.x &&
           point.x < this.x + this.img_size().x &&
           point.y > this.y &&
           point.y < this.y + this.img_size().y
   );
};
