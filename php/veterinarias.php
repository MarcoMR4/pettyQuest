<?php
require 'conexionadmin.php';

  $nuevacon= new conexionadmin();
  $respuestajson=$nuevacon->buscarvete();
  echo($respuestajson);
?>