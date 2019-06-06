<?php

namespace Drupal\eisai_intranet_forms\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Entity\EntityFormBuilderInterface;
use Drupal\user\Entity\User;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Entity\EntityStorageInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides an 'Select User Team Form' block.
 *
 * @Block(
 *  id = "select_user_team_form_block",
 *  admin_label = @Translation("Select User Team"),
 *  category = @Translation("Forms")
 * )
 */
class UserTeamFormBlock extends BlockBase {

  /**
   * Relies on .module  hook_entity_type_build!
   */

  public function build() {
    //$user = $this->userStorage->load($this->currentUser->id());
    //return $this->entityFormBuilder->getForm($user);
    /* $user = \Drupal::entityTypeManager()
     ->getStorage('user')
     ->load(1); // loading user 1 for test purpose
     */

    $user = User::load(\Drupal::currentUser()->id());
    $form = \Drupal::entityTypeManager()
      ->getFormObject('user', 'userteam')
      ->setEntity($user);

    return \Drupal::formBuilder()->getForm($form);
  }

}
