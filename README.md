# face_recognition
project uses face-api.js to implement Face ID login and child mode implementation

run these following commands in the vs code console:
npm init-y
npm i webpack webpack-cli -D
npm run build

now go live on live server


Description:
It uses face descriptors to identify the person.When we sign up and upload our picture. It creates face descriptors from picture and stores these values along with email and password and user id which we get from firebase auth which is unique id for a user .These values are stored in the Firestore database.Next time when you come to the login page.You will automatically get signed in .The face  matcher matches your face descriptors with the ones stored in Firestore and finds the best match.If your age<14 then u will see child mode page by default else u will see default non child mode page.There is a child mode button provided to manually switch between child mode and non child mode.But this button is only visible in presence of adult and not to visible if just children are present.If an adult is using the app and a child comes then the application continues in mode preferred by adult.If the adult moves out of the frame then application switches to child mode and child mode button is made invisible.If adult comes back into the frame then application gives alert message if you want to continue in child mode .You can choose as per your wish and child mode button becomes visible.The child mode disables genre tags like romance, drama, horror,crime etc.When a movie is searched ,It goes through a check.No word that is in banned word list is allowed in search.The results fetched from api are run through a check where movies belonging to restricted genres are filtered out.Then the filtered movies goes through. A further check ,The title of the movie is searched for banned words if it passes the test then we perform the same check on the overview of the movie.
