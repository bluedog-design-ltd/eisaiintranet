<?php
 
namespace Drupal\eisai_intranet_shortcuts\Plugin\Block;
 
use Drupal\Core\Block\BlockBase;
 
/**
 * Provides an 'Shortcuts List' block.
 *
 * @Block(
 *  id = "eisai_intranet_shortcutslist_block",
 *  admin_label = @Translation("Shortcuts List block"),
 * )
 */
class ShortcutsListBlock extends BlockBase {
 
  /**
   * {@inheritdoc}
   */
  public function build() {
 
    $build = [];
 
    $build['eisai_intranet_shortcutslist_block'] = [
      '#theme' => 'eisai_intranet_shortcuts',
      '#attached' => ['library' => 'eisai_intranet_shortcuts/eisai_intranet_shortcuts-library'],
    ];
 
    return $build;
  }
 
}