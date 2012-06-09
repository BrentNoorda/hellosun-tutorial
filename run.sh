# make sure heroku toolbelt is up-to-date (but not every dang time)
let "number=RANDOM%5"
if [ "$number" = "0" ]
then
   heroku update
fi

# install dependencies
npm install -d

# run the server
foreman start
