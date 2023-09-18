package com.kanbanboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.kanbanboard.repository")
@ComponentScan(basePackages = {"com.kanbanboard.*"})
public class KanbanboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(KanbanboardApplication.class, args);
	}

}
