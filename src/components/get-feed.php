<?php

$feedModified = filemtime("feed.xml");

$dateNow = new DateTime();

date_add($dateNow, date_interval_create_from_date_string('-30 seconds'));

if ($dateNow->getTimestamp() > $feedModified){
	file_put_contents("feed.xml", file_get_contents("feed.xml"));
	file_put_contents("feed.xml", file_get_contents("http://sbfeed.m88api.com/getOpenMatchForGen.ashx?type=FT1X2&spid=10"));
	echo "feed updated";
}
