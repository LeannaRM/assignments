<? 
$links = array(
	"index.php" => "Leanna's Chocolate Fansite Homepage",
	"external-links.php" => "Find out about chocolate from others!",
	"making-chocolate.php" => "How to make chocolate!",
	"kinds-of-chocolate.php" => "All kinds of chocolate!"
); ?>
<h3>Navigation</h3>
<p class = "internal-links">

<?
foreach ($links as $key => $value) { 
 	if ($key == $filename){ ?>
		<a  ID="current-link" href= <?=$key?> > <?= $value?> </a><br>
	<? } else { ?>
		<a href= <?=$key?> > <?= $value?> </a><br>
	<? } ?>
<? } ?>
