# Manga Website
##### Link to the website [Live Link](https://manga-sei-15.herokuapp.com/)
# Introduction
##### Our website provides a place for manga readers to read from and for translators to add their translated works.

#### what is manga ?
##### manga are comics or graphic novels originating from Japan. Most manga conform to a style developed in Japan in the late 19th century, and the form has a long prehistory in earlier Japanese art. The term manga is used in Japan to refer to both comics and cartooning. Outside of Japan, the word is typically used to refer to comics originally published in the country.

# Team member:
1. Abdullah Basheer
2. Hind Fahad
3. Sara Alshrife 
# Group-name:
* Bug Hunters

# Technologies Used:
1. NodeJS and Express
2. Regx
3. Bootstrap
4. Mongodb
5. JavaScript/jQuery
6. Mongoose
7. Heroku
8. ejs express-ejs-layouts
9. moment 
10. dotenv 
11. method-override 
12. bcrypt
13. passport 
14. passport-local 
15. express-session
16. connect-flash 
(/images/board.PNG)
# Wireframes :
![Unit_2_project](/public/img/1.jpg)
![Unit_2_project](/public/img/2.jpg)
![Unit_2_project](/public/img/3.jpg)
![Unit_2_project](/public/img/4.jpg)
![Unit_2_project](/public/img/5.png)
# User stories
Main: 
* As a user, I want to access all pages by using the navbar 

* As a user I want to select any manga by clicking on the picture and going to the manga pag.
* As a user, I want to log in / logout of the site

 All manga:
* As a user I want to  search the manga and review the search results and choose a manga to read.
* As a user, I can move between a large collection of manga 

Manga: 

* As a user I want to see Manga details and all chapters, so I can know more about it.

*  As a user I want to know Manga evaluation, so I can decide whether to read it or not.

*  As a user I want to select a specific chapter to read, so I can move to that chapter and read it.

*  As a user I want to add Manga to my favorite list, so I can go back to it at any time.

Chapter:

*  As a user I want to read a chapter, so I can start reading.

* As a user I want to move into the previous or next chapter, so I can move between the chapters.

*  As a user I want to choose a specific chapter to move to it, so I can move to it quickly. 


* Sign:

* As an Admin i want to signup and  login so i can manage the website
	
* As a translator i want to signup and login so i can upload new the chapters
	

* Add:
	
(add,edit, delete )chapter :

* As an admin i want to add, edit and delete chapter so that i can help the translators and 
manage the chapters.

* As a translator i want to add and edit chapter so the user can enjoy the chapter.


*  (add ,edit ,delete) manga :

* As an admin i want to add, edit and delete manga so that i can help the translators and 

manage the mangas.

* As a translator i want to add manga so the user can enjoy new manga


# our plan:
* Start meeting twice in day to think and start coding and help each other to solve problem.

# Unsolved problems:

Noting.

# favorite functions work:
 let hash = bcrypt.hashSync(req.body.password, salt);
  if (req.body.password != null && req.body.password != undefined && req.body.password != ""){
    if (!bcrypt.compareSync(hash,password)) {
    updatedata.password = hash;
  }}

 
##

[developer mozilla](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
[w3schools](https://www.w3schools.com)
[stackoverflow](https://stackoverflow.com)
