<?php

namespace Drupal\eisai_intranet_shortcuts\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\AppendCommand;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\examples\Utility\DescriptionTemplateTrait;
use Symfony\Component\HttpFoundation\Response;

use Drupal\user\Entity\User;

/**
 * Class EisaiIntranetShortcutsController.
 */
class EisaiIntranetShortcutsController extends ControllerBase {
 

  /**
   * Shortcuts.
   *
   * @return string
   *   Return Hello string.
   */
  
    protected function getModuleName() {
    return 'eisai_intranet_shortcuts';
  }

  /**
   * Callback for link example.
   *
   * Takes different logic paths based on whether Javascript was enabled.
   * If $type == 'ajax', it tells this function that ajax.js has rewritten
   * the URL and thus we are doing an AJAX and can return an array of commands.
   *
   * @param string $nojs
   *   Either 'ajax' or 'nojs. Type is simply the normal URL argument to this
   *   URL.
   *
   * @return string|array
   *   If $type == 'ajax', returns an array of AJAX Commands.
   *   Otherwise, just returns the content, which will end up being a page.
   */
  public function ajaxLinkCallback($title, $path) {
  
      $path_fixed = str_replace("ForwardSlash", "/", $path);
   
      $current_user = \Drupal::currentUser();
      $user = \Drupal\user\Entity\User::load($current_user->id());
   
      $user->get('field_shortcuts')->appendItem([
       "uri" => "internal:/".$path_fixed, "title" => $title
      ]);
       
      $user->save();

      $output = $this->t("Path: ".$path_fixed);

      $response = new AjaxResponse();
      $response->addCommand(new AppendCommand('.does-not-exist', $path_fixed));
      return $response;

      // See ajax_example_advanced.inc for more details on the available
      // commands and how to use them.
      // $page = array('#type' => 'ajax', '#commands' => $commands);
      // ajax_deliver($response);

  }

}
