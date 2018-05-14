package com.cwithmichael.groceries;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cwithmichael.groceries.models.Product;
import com.cwithmichael.groceries.util.CSVParser;

@SpringBootApplication
public class GroceriesApplication implements CommandLineRunner {

	@Autowired
	private ProductRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(GroceriesApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();
		// save products
		List<Product> products = CSVParser.getProducts();
		for(Product product : products) {
			repository.save(product);
		}
		
		// fetch all products
		System.out.println("Products found with findAll():");
		System.out.println("-------------------------------");
		for (Product product : repository.findAll()) {
			System.out.println(product);
		}
		System.out.println();

		// fetch an individual product
		System.out.println("Product found with findById('753542'):");
		System.out.println("--------------------------------");
		System.out.println(repository.findByPid("753542"));

		System.out.println("Products found with findByDepartment('Produce'):");
		System.out.println("--------------------------------");
		for (Product product : repository.findByDepartment("Produce")) {
			System.out.println(product);
		}

	}

}
