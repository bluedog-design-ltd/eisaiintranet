<?php

namespace Drupal\eisai_intranet_forms\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenDialogCommand;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Drupal\Core\Entity\EntityFormBuilderInterface;
use Drupal\user\Entity\User;

class SelectTeamController extends ControllerBase {

  /**
   * @return AjaxResponse
   */
  public function showSelectTeamForm() {
    //$node = Node::load($nid);
    //$view = node_view($node, 'teaser');
    //$html = render($view);

    $user = User::load(\Drupal::currentUser()->id());
    $form = \Drupal::entityTypeManager()
      ->getFormObject('user', 'userteam')
      ->setEntity($user);

    $html = \Drupal::formBuilder()->getForm($form);

    $response = new AjaxResponse();
    $response->addCommand(new OpenModalDialogCommand(t('Select your Team'), $html));
    return $response;
  }

}
