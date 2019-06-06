<?php

namespace Drupal\eisai_intranet_shortcuts\Ajax;

use Drupal\Core\Ajax\CommandInterface;

/*

UNUSED - all in controller

*/

/**
 * Class AddShortcutCommand.
 */
class AddShortcutCommand implements CommandInterface {

  /**
   * Render custom ajax command.
   *
   * @return ajax
   *   Command function.
   */
  public function render() {
    return [
      'command' => 'render',
      'message' => 'My Awesome Message',
    ];
  }

}