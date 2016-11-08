function Sticker(position, img_url)
{
  this.main_image = new CanvasElement(position.x, position.y, img_url);
  this.rotate_elem = new CanvasElement( position.x , position.y, 'new_rotate.png');
  this.resize_elem = new CanvasElement( position.x , position.y, 'new_resize.png');
  this.rotate_controller = new StickerRotationController(this, this.rotate_elem);
  this.scale_controller = new StickerScalingController(this, this.resize_elem);
  this.movement_controller = new StickerMovementController(this, this.main_image);

}

Sticker.prototype.draw = function(context, draw_ctrl, downscale_factor)
{
  this.main_image.draw(context, downscale_factor);
  if(draw_ctrl)
  {
    this.update_controllers_position(context.canvas, downscale_factor);
    this.rotate_elem.draw(context, 1);
    this.resize_elem.draw(context, 1);

  }
}

Sticker.prototype.contains_controller = function(point, canvas)
{

  return this.rotate_controller.contains(point, canvas, 1) ||
         this.scale_controller.contains(point, canvas, 1) ||
         this.movement_controller.contains(point, canvas, 1);
}
Sticker.prototype.get_controller = function(point, canvas)
{

  if(this.rotate_controller.contains(point, canvas, 1))
    return this.rotate_controller;
  if(this.scale_controller.contains(point, canvas, 1))
    return this.scale_controller;
  if(this.movement_controller.contains(point, canvas, 1))
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
}
Sticker.prototype.update_controllers_position = function (canvas, downscale_factor)
{
  var img_size = this.main_image.img_size(canvas, downscale_factor);
  var img_pos = this.main_image.position();
  this.rotate_elem.set_position(new Vector2(img_pos.x - img_size.x/2, img_pos.y - img_size.y/2));
  this.resize_elem.set_position(new Vector2(img_pos.x + img_size.x/2, img_pos.y + img_size.y/2));
}
Sticker.prototype.set_scale = function(scale)
{
  this.main_image.set_scale(scale);
}
