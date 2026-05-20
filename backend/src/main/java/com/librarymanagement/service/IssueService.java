package com.librarymanagement.service;

import java.util.List;

import com.librarymanagement.dto.request.IssueBookRequestDTO;
import com.librarymanagement.dto.request.ReturnBookRequestDTO;
import com.librarymanagement.dto.response.IssueBookResponseDTO;

public interface IssueService {

    IssueBookResponseDTO issueBook(IssueBookRequestDTO requestDTO);

    IssueBookResponseDTO returnBook(ReturnBookRequestDTO requestDTO);

    List<IssueBookResponseDTO> getIssuedBooks();
}
