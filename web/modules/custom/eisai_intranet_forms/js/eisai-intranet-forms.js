(function ($, Drupal, drupalSettings) {

  Drupal.behaviors.eisaiIntranetForms = {
    attach: function (context, settings) {
      console.log('team name: ' + drupalSettings.EMEA_TEAM_NAME);
      console.log('team link: ' + drupalSettings.EMEA_TEAM_LINK);

      if(drupalSettings.EMEA_TEAM_NAME && drupalSettings.EMEA_TEAM_LINK){
        var team_name_system = drupalSettings.EMEA_TEAM_NAME.replace(" ", "-");
        console.log(team_name_system);

        $('#user-hub-box').removeClass();
        $('#user-hub-box').addClass("dashboard-box user-hub-box");
        $('#user-hub-box').addClass(team_name_system);
        $('#user-hub-box h2 a').text(drupalSettings.EMEA_TEAM_NAME+" "+Drupal.t("Hub"));
        $('#user-hub-box h2 a').attr("href", drupalSettings.EMEA_TEAM_LINK);
      }

      if (drupalSettings.EMEA_TEAM_NAME === null && drupalSettings.EMEA_TEAM_LINK === null) {
        $('#user-hub-box').removeClass();
        $('#user-hub-box').addClass("dashboard-box user-hub-box");
        $('#user-hub-box h2 a').text(' ');
        $('#user-hub-box h2 a').attr("href", ' ');
      }
    }
  };

})(jQuery, Drupal, drupalSettings);
