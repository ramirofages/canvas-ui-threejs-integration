function CanvasElement(x, y, downscale_factor, img_url) {
  this.x = x;

  this.y = y;
  this.width = 0.1; //placeholder
  this.height = 0.1; //placeholder
  this.rot_deg = 0;
  this.scale = 1;
  this.image = new Image();

  var instance = this;

  this.image.onload = function() {
    instance.width = this.width;
    instance.height = this.height;
    draw_scene();
  };

  this.image.src = img_url;

}

CanvasElement.prototype.rotate = function (degrees)
{
  this.rot_deg += degrees;
};
CanvasElement.prototype.draw = function (context, downscale_factor)
{
  var size = this.img_size(context.canvas, downscale_factor);
  var canvas_size = new Vector2(context.canvas.width, context.canvas.height);
  var pos = this.position();
  pos = new Vector2(pos.x * canvas_size.x, pos.y * canvas_size.y);


  context.save();
  context.translate(pos.x , pos.y );
  context.rotate(this.rot_deg * Math.PI /180 * canvas_size.y);

  if(this.image.complete)
  {

    context.drawImage(this.image,
                      0 - size.x * canvas_size.x/2 ,
                      0 - size.y * canvas_size.y /2 ,
                      size.x * canvas_size.x,
                      size.y * canvas_size.y);
  }

  context.restore();

};

CanvasElement.prototype.img_size = function(canvas, downscale_factor)
{
  return new Vector2(this.scale * this.width / canvas.width / downscale_factor ,
                     this.scale * this.height / canvas.height / downscale_factor);
}
CanvasElement.prototype.position = function ()
{
  return new Vector2(this.x , this.y );
};
CanvasElement.prototype.set_position = function( new_pos)
{
  this.x = new_pos.x ;
  this.y = new_pos.y ;
}
CanvasElement.prototype.set_scale = function ( scale )
{
  this.scale = scale;
}
CanvasElement.prototype.contains = function(point, canvas, downscale_factor)
{

  var size = this.img_size(canvas, downscale_factor);
  return ( point.x > this.x - size.x/2 &&
           point.x < this.x + size.x/2 &&
           point.y > this.y - size.y/2 &&
           point.y < this.y + size.y/2 );
};
