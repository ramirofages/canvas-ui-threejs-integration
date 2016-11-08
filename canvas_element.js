function CanvasElement(x, y, downscale_factor, img_url) {
  this.x = x;

  this.y = y;
  this.width = 0.1; //placeholder
  this.height = 0.1; //placeholder
  this.rot_deg = 0;
  this.scale = 1;
  this.downscale_factor = downscale_factor;
  this.image = new Image();

  var instance = this;

  this.image.onload = function() {
    instance.width = this.width/ canvas.width ;
    instance.height = this.height/ canvas.height ;
    instance.x = instance.x - instance.img_size().x / 2 ;
    instance.y = instance.y - instance.img_size().y / 2 ;

    draw_scene();
  };

  this.image.src = img_url;

}

CanvasElement.prototype.rotate = function (degrees)
{
  this.rot_deg += degrees;
};
CanvasElement.prototype.draw = function (current_context, downscale_factor)
{
  this.downscale_factor = downscale_factor;
  context.save();
  var canvas_size = new Vector2(context.canvas.width, context.canvas.height);

  var pos = this.position();
  pos = new Vector2(pos.x * canvas_size.x, pos.y * canvas_size.y);

  context.translate(pos.x , pos.y );
  context.rotate(this.rot_deg * Math.PI /180 * canvas_size.y);

  if(this.image.complete)
  {

    context.drawImage(this.image,
                      0 - this.img_size().x * canvas_size.x/2 ,
                      0 - this.img_size().y * canvas_size.y /2 ,
                      this.img_size().x * canvas_size.x,
                      this.img_size().y * canvas_size.y);
  }

  context.restore();

};

CanvasElement.prototype.img_size = function()
{
  return new Vector2(this.scale * this.width / this.downscale_factor , this.scale * this.height / this.downscale_factor);
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
