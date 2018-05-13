package com.cwithmichael.groceries;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.cwithmichael.groceries.models.Product;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends MongoRepository<Product, String> {

	public Product findByPid(@Param("pid") String pid);

	public List<Product> findByDescription(@Param("description") String description);

	public List<Product> findByLastSold(@Param("dateSold") LocalDate lastSold);

	public List<Product> findByShelfLife(@Param("shelfLife") String shelfLife);

	public List<Product> findByDepartment(@Param("department") String department);

	public List<Product> findByPrice(@Param("price") BigDecimal price);

	public List<Product> findByUnit(@Param("unit") String unit);

	public List<Product> findByXFor(@Param("xFor") Integer xFor);

	public List<Product> findByCost(@Param("cost") BigDecimal cost);

	public List<Product> findByDescriptionLike(@Param("description") String description);
	
	public List<Product> findByDepartmentLike(@Param("department") String description);

}
