(function ($, Drupal, drupalSettings) {

  Drupal.behaviors.eisaiIntranetForms = {
    attach: function (context, settings) {

      if(drupalSettings.EMEA_TEAM_NAME && drupalSettings.EMEA_TEAM_LINK){
        var team_name_system = drupalSettings.EMEA_TEAM_NAME.replace(" ", "-");

        $('#user-hub-box').removeClass();
        $('#user-hub-box').addClass("dashboard-box user-hub-box");
        $('#user-hub-box').addClass(team_name_system);
        $('#user-hub-box h2 a').text(drupalSettings.EMEA_TEAM_NAME+" "+Drupal.t("Hub"));
        $('#user-hub-box h2 a').attr("href", drupalSettings.EMEA_TEAM_LINK);
      }
    }
  };

})(jQuery, Drupal, drupalSettings);
