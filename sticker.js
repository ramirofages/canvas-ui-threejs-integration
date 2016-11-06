function Sticker(position, size, img_url)
{
  this.main_image = new CanvasElement(position.x, position.y, size.x, size.y, 0, img_url);
  this.rotate_elem = new CanvasElement( position.x - size.x/2, position.y - size.y/2, 32,32, 0, 'rotate.png');
  this.resize_elem = new CanvasElement( position.x + size.x/2, position.y + size.y/2, 32,32, 0, 'resize.png');
  this.rotate_controller = new StickerRotationController(this, this.rotate_elem);
  this.scale_controller = new StickerScalingController(this, this.resize_elem);

}

Sticker.prototype.draw = function(draw_ctrl)
{
  this.main_image.draw();
  if(draw_ctrl)
  {
    this.rotate_elem.draw();
    this.resize_elem.draw();

  }
}
Sticker.prototype.contains = function(point)
{
  return this.main_image.contains(point);
}

Sticker.prototype.contains_controller = function(point)
{
  return this.rotate_controller.contains(point) || this.scale_controller.contains(point);
}
Sticker.prototype.get_controller = function(point)
{
  if(this.rotate_controller.contains(point))
    return this.rotate_controller;
  if(this.scale_controller.contains(point))
    return this.scale_controller;

  return null; // te rompo todo
}

Sticker.prototype.position = function()        { return this.main_image.position(); }
Sticker.prototype.rotation = function()        { return this.main_image.rot_deg; }

Sticker.prototype.rotate   = function(degrees)
{
  this.main_image.rotate(degrees);
}

Sticker.prototype.set_rotation   = function(degrees)
{
  this.main_image.rot_deg = degrees;
}

Sticker.prototype.set_position = function(new_pos)
{
  this.main_image.set_position(new_pos);
  this.rotate_elem.set_position(new Vector2(new_pos.x - this.main_image.img_size().x/2, new_pos.y - this.main_image.img_size().y/2));
  this.resize_elem.set_position(new Vector2(new_pos.x + this.main_image.img_size().x/2, new_pos.y + this.main_image.img_size().y/2));
}
Sticker.prototype.set_scale = function(scale)
{
  this.main_image.set_scale(scale);
}
