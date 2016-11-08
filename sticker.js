function Sticker(position, downscale_factor, img_url)
{
  this.main_image = new CanvasElement(position.x, position.y, downscale_factor, img_url);
  this.rotate_elem = new CanvasElement( position.x - this.main_image.img_size().x/2 , position.y - this.main_image.img_size().y/2, 1, 'new_rotate.png');
  this.resize_elem = new CanvasElement( position.x + this.main_image.img_size().x/2 , position.y + this.main_image.img_size().y/2, 1, 'new_resize.png');
  this.rotate_controller = new StickerRotationController(this, this.rotate_elem);
  this.scale_controller = new StickerScalingController(this, this.resize_elem);
  this.movement_controller = new StickerMovementController(this, this.main_image);

}

Sticker.prototype.draw = function(context, draw_ctrl, downscale_factor)
{
  this.main_image.draw(context, downscale_factor);
  if(draw_ctrl)
  {
    this.rotate_elem.draw(context, 1);
    this.resize_elem.draw(context, 1);

  }
}

Sticker.prototype.contains_controller = function(point)
{
  return this.rotate_controller.contains(point) ||
         this.scale_controller.contains(point) ||
         this.movement_controller.contains(point);
}
Sticker.prototype.get_controller = function(point)
{
  if(this.rotate_controller.contains(point))
    return this.rotate_controller;
  if(this.scale_controller.contains(point))
    return this.scale_controller;
  if(this.movement_controller.contains(point))
    return this.movement_controller;

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
