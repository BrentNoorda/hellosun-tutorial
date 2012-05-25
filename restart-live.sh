
echo SERVER LOGS [# heroku logs]
heroku logs

echo --------------------------------------------------------------------------------------------------
echo STATE OF SERVER PROCESSES [# heroku ps]
heroku ps

echo --------------------------------------------------------------------------------------------------
echo RESTARTING LIVE SERVER [# heroku restart web.1]
heroku restart web.1

echo --------------------------------------------------------------------------------------------------
echo STATE OF SERVER PROCESSES [# heroku ps]
heroku ps

sleep 5s

echo --------------------------------------------------------------------------------------------------
echo STATE OF SERVER PROCESSES [# heroku ps]
heroku ps

echo