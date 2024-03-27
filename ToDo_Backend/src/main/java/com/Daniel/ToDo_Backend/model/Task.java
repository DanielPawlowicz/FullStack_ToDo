package com.Daniel.ToDo_Backend.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private boolean isDone;
    @Column(name = "task_order")
    private Integer order;

//    @PrePersist
//    public void prePersist() {
//        // Generate order value
//        if (order == null) {
//            // Retrieve the maximum existing order and increment by 1
//        }
//    }

    public Task(Long id, String name, boolean isDone, Integer order) {
        this.id = id;
        this.name = name;
        this.isDone = isDone;

        EntityManager entityManager = Persistence.createEntityManagerFactory("your-persistence-unit").createEntityManager();
        Integer maxOrder = (Integer) entityManager.createQuery("SELECT MAX(t.order) FROM Task t").getSingleResult();
        this.order = maxOrder != null ? maxOrder + 1 : 1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }
}
