function StickerRotationController ( sticker, canvas_element_ctrl)
{
  this.sticker_element = sticker;
  this.canvas_element = canvas_element_ctrl;
  this.initial_mouse_pos = new Vector2(0,0);
}
StickerRotationController.prototype.init = function (initial_mouse_pos)
{
  this.initial_mouse_pos = initial_mouse_pos.copy();
}
StickerRotationController.prototype.contains = function( mouse_position)
{
  return this.canvas_element.contains( mouse_position );
}

StickerRotationController.prototype.update = function( current_mouse_position)
{
  var mouse_diff = current_mouse_position.sub(this.initial_mouse_pos);
  var rotation_sign = (mouse_diff.y > 0)? 1:-1; // positivo o negativo
  var mouse_distance = current_mouse_position.distance(this.initial_mouse_pos);
  this.sticker_element.set_rotation(mouse_distance * rotation_sign);
}
//######################################################################################//
//######################################################################################//
//######################################################################################//


function StickerScalingController ( sticker, canvas_element_ctrl)
{
  this.sticker_element = sticker;
  this.canvas_element = canvas_element_ctrl;
  this.initial_mouse_pos = new Vector2(0,0);
}

StickerScalingController.prototype.init = function(initial_mouse_pos)
{
  this.initial_mouse_pos = initial_mouse_pos.copy();
}

StickerScalingController.prototype.contains = function( mouse_position)
{
  return this.canvas_element.contains( mouse_position );
}

StickerScalingController.prototype.update = function( current_mouse_position)
{
  var mouse_diff = current_mouse_position.sub(this.initial_mouse_pos);
  var mouse_distance = current_mouse_position.distance(this.initial_mouse_pos);
  var rotation_sign = (mouse_diff.y > 0)? 1:-1; // positivo o negativo
  var new_scale = Math.max(mouse_distance/100 * rotation_sign +1, 0.2);
  this.sticker_element.set_scale(new_scale);
}

//######################################################################################//
//######################################################################################//
//######################################################################################//


function StickerMovementController ( sticker, canvas_element_ctrl)
{
  this.sticker_element = sticker;
  this.canvas_element = canvas_element_ctrl;
  this.initial_mouse_pos = new Vector2(0,0);
  this.initial_offset = new Vector2(0,0);

}

StickerMovementController.prototype.init = function( initial_mouse_pos)
{
  this.initial_mouse_pos = initial_mouse_pos.copy();
  this.initial_offset = this.sticker_element.position().sub(initial_mouse_pos);
}

StickerMovementController.prototype.contains = function( mouse_position)
{
  return this.canvas_element.contains( mouse_position );
}

StickerMovementController.prototype.update = function( current_mouse_position)
{
  this.sticker_element.set_position(current_mouse_position.add(this.initial_offset));
}
