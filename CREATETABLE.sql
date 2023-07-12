CREATE TABLE menu1(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    label VARCHAR(50),
    link  VARCHAR(255),
    topic_id int(11),
    FOREIGN KEY(topic_id) 
        REFERENCES topic(TopicId)
        ON DELETE CASCADE

);

CREATE TABLE submenu1(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    label VARCHAR(50),
    link  VARCHAR(255),
    menu_id int(11),
    topic_id int(11),
    FOREIGN KEY(menu_id) 
        REFERENCES menu1(id)
        ON DELETE CASCADE,
    FOREIGN KEY(topic_id ) 
        REFERENCES topic(TopicId)
        ON DELETE CASCADE
);



insert into menu1(label,link,topic_id) values ("MENU1","#",3);

insert into submenu1(label,link,menu_id,topic_id) values ("SUBMENU1","#",9 ,3);
SELECT id AS SUBMENUid,     

SELECT  topic.TopicName AS TOPIC ,menu1.label AS MENULABEL, menu1.link AS MENULINK, submenu1.label AS SUBMENULABEL, submenu1.link AS SUBMENULINK FROM topic,menu1,submenu1 where topic.TopicId=submenu1.topic_id and menu1.id=submenu1.menu_id AND submenu1.label IS NOT NULL AND submenu1.link IS NOT NULL AND menu1.link is NOT NULL and menu1.label is not NULL