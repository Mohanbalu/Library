package com.librarymanagement.dto.request;

import java.io.Serializable;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookRequestDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotBlank(message = "Title is required")
	@Size(max = 200)
	private String title;

	@NotBlank(message = "ISBN is required")
	@Size(max = 20)
	private String isbn;

	@NotNull(message = "Quantity is required")
	@Min(value = 0, message = "Quantity cannot be negative")
	private Integer quantity;

	@Size(max = 2000)
	private String description;

	@Size(max = 100)
	private String shelfLocation;

	@NotNull(message = "Category id is required")
	private Long categoryId;

	@NotNull(message = "Author id is required")
	private Long authorId;
}
