function StickerRotationController ( sticker, canvas_element_ctrl)
{
  this.sticker_element = sticker;
  this.canvas_element = canvas_element_ctrl;
}

StickerRotationController.prototype.contains = function( mouse_position)
{
  return this.canvas_element.contains( mouse_position );
}

StickerRotationController.prototype.update = function( initial_mouse_position, current_mouse_position)
{
  var mouse_diff = current_mouse_position.sub(initial_mouse_position);
  var rotation_sign = (mouse_diff.y > 0)? 1:-1; // positivo o negativo
  var mouse_distance = current_mouse_position.distance(initial_mouse_position);
  this.sticker_element.set_rotation(mouse_distance * rotation_sign);
}
//######################################################################################//
//######################################################################################//
//######################################################################################//


function StickerScalingController ( sticker, canvas_element_ctrl)
{
  this.sticker_element = sticker;
  this.canvas_element = canvas_element_ctrl;
}

StickerScalingController.prototype.contains = function( mouse_position)
{
  return this.canvas_element.contains( mouse_position );
}

StickerScalingController.prototype.update = function( initial_mouse_position, current_mouse_position)
{
  var mouse_diff = current_mouse_position.sub(initial_mouse_position);
  var mouse_distance = current_mouse_position.distance(initial_mouse_position);
  var rotation_sign = (mouse_diff.y > 0)? 1:-1; // positivo o negativo
  var new_scale = Math.max(mouse_distance/100 * rotation_sign +1, 0.2);
  this.sticker_element.set_scale(new_scale);
}
