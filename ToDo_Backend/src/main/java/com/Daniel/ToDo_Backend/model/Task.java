package com.Daniel.ToDo_Backend.model;

import jakarta.persistence.*;

import java.sql.Time;
import java.util.Date;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Date date;
    private Time time;
    private boolean isDone;

//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
//    @Column(name = "taskOrder")
//    private Integer taskOrder;

//    @PrePersist
//    public void prePersist() {
//        // Generate order value
//        if (order == null) {
//            // Retrieve the maximum existing order and increment by 1
//        }
//    }

//    public Task(Long id, String name, boolean isDone) {
//        this.id = id;
//        this.name = name;
//        this.isDone = isDone;
//
////        EntityManager entityManager = Persistence.createEntityManagerFactory("your-persistence-unit").createEntityManager();
////        Integer maxOrder = (Integer) entityManager.createQuery("SELECT MAX(t.order) FROM Task t").getSingleResult();
////        this.order = maxOrder != null ? maxOrder + 1 : 1;
//    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

//    public Integer getTaskOrder() {
//        return taskOrder;
//    }
//
//    public void setTaskOrder(Integer taskOrder) {
//        this.taskOrder = taskOrder;
//    }
}
