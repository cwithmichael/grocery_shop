package com.cwithmichael.groceries.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.cwithmichael.groceries.models.Product;

public final class CSVParser {
	private static final Log log = LogFactory.getLog(CSVParser.class);
	private CSVParser() {}
	public static List<Product> getProducts() throws FileNotFoundException {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		File file = new File(classLoader.getResource("products.csv").getFile());
		Reader in = new FileReader(file);
		List<Product> products = new ArrayList<>();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy");
		try {
			Iterable<CSVRecord> records = CSVFormat.RFC4180.withFirstRecordAsHeader().parse(in);
			for (CSVRecord record : records) {
				Product product = new Product();
				product.setPid(record.get(0));
				product.setDescription(record.get(1));
				product.setLastSold(LocalDate.parse(record.get(2), formatter));
				product.setShelfLife(record.get(3));
				product.setDepartment(record.get(4));
				String price = record.get(5).trim();
				product.setPrice(new BigDecimal(price.substring(1, price.length())));
				product.setUnit(record.get(6));
				product.setxFor(Integer.parseInt(record.get(7)));
				String cost = record.get(8).trim();
				product.setCost(new BigDecimal(cost.substring(1, cost.length())));
				
				products.add(product);

			}
		} catch (IOException e) {
			log.error(e);
		}
		return products;
	}

}
