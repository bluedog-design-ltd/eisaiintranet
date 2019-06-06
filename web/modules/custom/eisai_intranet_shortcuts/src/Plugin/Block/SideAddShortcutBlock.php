<?php
 
namespace Drupal\eisai_intranet_shortcuts\Plugin\Block;
 
use Drupal\Core\Block\BlockBase;
 
/**
 * Provides an 'Add Shortcut' block.
 *
 * @Block(
 *  id = "eisai_intranet_sideaddshortcut_block",
 *  admin_label = @Translation("Add Shortcuts block"),
 * )
 */
class SideAddShortcutBlock extends BlockBase {
 
  /**
   * {@inheritdoc}
   */
  public function build() {
 
    $build = [];
 
    $build['eisai_intranet_sideaddshortcut_block'] = [
      '#theme' => 'block__eisai_intranet_sideaddshortcut_block',
      '#attached' => ['library' => 'eisai_intranet_shortcuts/eisai_intranet_shortcuts-library'],
      
    ];
    
    $build['#cache']['max-age'] = 0;
 
    return $build;
  }
 
}